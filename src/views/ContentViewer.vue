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
	defineComponent, ref, Ref,
} from 'vue'
import { apiClient, API } from '@/plugins/axios'
import { ContentDetail, Entry, EntryPair } from '@/@types/content'
import { useLogger } from 'vue-logger-plugin'

/*
TODO 컨탠츠 생성시 wildcardable이 true 일때,
최대 라운드에 부족한 수만큰 wildcard 로 설정
14 entry일때, 4round 최대인 16(2 ** 4) etnry의
최대 항목에서 남는 2 entry를 2 wildcard로 설정
*/
const getPairedRoundTotal = (entries: Array<Entry>) => {
	const pair = { a: {}, b: {} } as EntryPair
	const pairedRoundTotal = [] as Array<Array<EntryPair>>

	const entriesLength = entries.length
	let maxRound = 1
	while (entriesLength / (2 ** maxRound) > 0.5) {
		pairedRoundTotal.push([] as Array<EntryPair>)
		maxRound += 1
	}

	const shuffledEntries = entries.sort(() => Math.random() - 0.5)
	const maxEntryCount = pairedRoundTotal.length * 2
	for (let index = 0; index < maxEntryCount; index += 1) {
		if (index % 2 === 1) {
			pair.a = shuffledEntries[index]
		} else {
			pair.b = shuffledEntries[index]
		}
		if (pair.a && pair.b) {
			pairedRoundTotal[0].push(pair)
		}
	}

	return pairedRoundTotal
}

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

				console.log('pairedRoundTotal', getPairedRoundTotal(content.value.entries))
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
		const seletedEntry = { a: {}, b: {} } as EntryPair
		let choiceCount = 0
		const choice = (choiceEntryNumber: number) => {
			choiceCount += 1
			log.info(
				'emit-choice',
				'\nindex:', choiceEntryNumber,
				'\nentry:', content.value.entries[choiceEntryNumber],
			)

			if (choiceCount % 2 === 1) {
				seletedEntry.a = content.value.entries[choiceEntryNumber]
			} else {
				seletedEntry.b = content.value.entries[choiceEntryNumber]
			}
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
