<template>
	<div id="contentResult">
		<button id="share">
			<font-awesome-icon icon="share-alt"/>
		</button>
		<div
			id="finalSelectedEntry"
			v-if="finishEntry !== null">
			<p>최종 우승</p>
			<p>{{ finishEntry.name }}</p>
			<p>{{ finishEntry.description }}</p>
			최종 선택되서 페이지 이동할경우
			finalSelectedEntry 를 출력과
			빵빠레 사운드 + 종이 꽃가루
		</div>
		<section id="result">
			<div id="chartArea">
				<DoughnutChart :chartData="testData"/>
			</div>
			<div>
				<div>
					<span>컨텐츠 명</span>
					<span>*선택카운트 222</span>
				</div>
				<div>댓글</div>
			</div>
		</section>
		<section>
			추천 항목
		</section>
	</div>
</template>

<script lang="ts">
import {
	defineComponent, computed, ref, Ref, onMounted,
} from 'vue'
import { useLogger } from 'vue-logger-plugin'
import { useRoute } from 'vue-router'
import { DoughnutChart } from 'vue-chart-3'
import { Chart, registerables } from 'chart.js'
import { ContentDetail, Entry } from '@/@types/content'
import { apiClient, API } from '@/plugins/axios'
import {
	findEntryByIndex,
} from '@/composables/contentData'

Chart.register(...registerables)

export default defineComponent({
	name: 'ContentResult',
	components: {
		DoughnutChart,
	},
	props: {
		finishEntryIndex: {
			type: Number,
			default: -1,
		},
	},
	setup(props) {
		const log = useLogger()
		const route = useRoute()

		// 최종 라운드 선택된 entry
		const finishEntry = ref(null) as Ref<Entry | null>
		// 결과보여줄 컨텐츠 api 조회
		const content = ref({}) as Ref<ContentDetail>
		apiClient.get(`${process.env.VUE_APP_API_URL + API.CONTENT_RESULT}/`, {
			params: {
				id: route.query.id,
				finishEntryIndex: props.finishEntryIndex !== -1 ? findEntryByIndex : undefined,
			},
		})
			.then((result) => {
				content.value = result.data
				log.info('결과 컨텐츠', content.value)

				// 최종 라운드 선택된 entry
				if (props.finishEntryIndex !== -1) {
					finishEntry.value = findEntryByIndex(
						content.value.entries,
						props.finishEntryIndex,
					)
				}
			})

		const testData = {
			labels: ['Paris', 'Nîmes', 'Toulon', 'Perpignan', 'Autre'],
			datasets: [
				{
					data: [30, 40, 60, 70, 5],
					backgroundColor: ['#77CEFF', '#0079AF', '#123E6B', '#97B0C4', '#A5C8ED'],
				},
			],
		}
		return {
			log,
			testData,
			finishEntry,
			content,
		}
	},
})
</script>

<style lang="scss">
@import "@/scss/_mixin";

#contentResult{
	position: relative;
	#share{
		position: absolute;
		top: 0;
		right: 0;
	}
	#chartArea{
		max-width: 20em;
	}
}
</style>
