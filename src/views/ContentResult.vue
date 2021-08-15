<template>
	<div id="contentResult">
		<div
			id="finalSelectedEntry"
			v-if="finishEntry !== null">
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
				<div>댓글?</div>
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
import { findEntryByIndex } from '@/composables/contentData'

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

		// 결과보여줄 컨텐츠 api 조회
		const content = ref({}) as Ref<ContentDetail>
		apiClient.get(`${process.env.VUE_APP_API_URL + API.CONTENT_DETAIL}/`)
			.then((result) => {
				content.value = result.data
				log.info('결과 컨텐츠', content.value)
			})

		// 최종 라운드 선택된 entry
		const finishEntry = computed(() => {
			if (props.finishEntryIndex !== -1) {
				return findEntryByIndex(
					content.value.entries,
					props.finishEntryIndex,
					// TODO route.params을 props에 넣거나 하여 number로 처리 가능하도록 수정
					// route.params.finishEntryIndex,
				)
			}
			return null
		}) as Ref<Entry | null>

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
		}
	},
})
</script>

<style lang="scss">
@import "@/scss/_mixin";

#result{
	display: flex;
	#chartArea{
		max-width: 20em;
	}
}
</style>
