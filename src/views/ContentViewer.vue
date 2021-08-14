<template>
	<div id="contentViewer">
		<div id="titleArea">
			<div>{{ content.name }}</div>
			<div>진행상태</div>
			<div>공유</div>
			<div>언어</div>
		</div>
		<div
			id="compaerWrap"
			v-if="isContentReady">
			<CompaerEntry
				:entryPair="entryPair"
				@choice="choice"/>
			<div class="miniMapWrap">
				<MiniMap/>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import MiniMap from '@/components/content/MiniMap.vue'
import CompaerEntry from '@/components/content/CompaerEntry.vue'

import {
	defineComponent, computed, ref, Ref,
} from 'vue'
import { apiClient, API } from '@/plugins/axios'
import { Content, ContentDetail, EntryPair } from '@/@types/content'
import { useLogger } from 'vue-logger-plugin'

export default defineComponent({
	name: 'ContentViewer',
	components: {
		CompaerEntry,
		MiniMap,
	},
	setup() {
		const log = useLogger()

		const isContentReady = ref(false)
		const content = ref({}) as Ref<ContentDetail>
		const entryPair = ref({}) as Ref<EntryPair>
		apiClient.get(`${process.env.VUE_APP_API_URL + API.CONTENT_DETAIL}/`)
			.then((result) => {
				content.value = result.data
				isContentReady.value = true

				// TODO 엔트리들을 엔트리페어로, 라운드별 묶음 생성 기능 구현
				const enrtyA = content.value.entries.find((value, index:number) => index === 0)
				const enrtyB = content.value.entries.find((value, index:number) => index === 1)
				if (enrtyA && enrtyB) {
					enrtyA.index = 0
					enrtyB.index = 1
					entryPair.value.a = enrtyA
					entryPair.value.b = enrtyB
				}
				log.info(content.value)
			})

		const result: Ref<Array<Array<number>>> = ref([])
		result.value.push([1, 2, 3, 4])
		result.value.push([2, 4])
		result.value.push([4])

		const currntRound: Ref<number> = ref(1)

		// 이벤트 - entryPair 중 선택
		const choice = (choiceEntryNumber: number) => {
			log.info(
				'emit-choice',
				'\nindex:', choiceEntryNumber,
				'\nentry:', content.value.entries[choiceEntryNumber],
			)

			// TODO 다음 entryPair 전달. 라운드 전부 순회시, 다음 라운드로
		}

		return {
			log,
			isContentReady,
			content,
			currntRound,
			entryPair,
			choice,
		}
	},
})
</script>

<style lang="scss" scoped>
#contentViewer{
	position: relative;
	display: flex;
	flex-direction: column;
	height: 100vh;
	#titleArea{
		display: flex;
		div{
			flex: auto;
		}
	}
	#compaerWrap{
		position: relative;
		flex: 1 1 auto;
		.miniMapWrap{
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translateX(-50%) translateY(-50%);
		}
	}
}
</style>
