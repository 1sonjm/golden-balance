<template>
	<div id="contentViewer">
		<div id="titleArea">
			<div>{{ content.name }}</div>
			<div>Round {{ currntRound }}</div>
			<div>공유</div>
			<div>언어</div>
		</div>
		<div
			id="compaerWrap"
			v-if="isContentReady && finishEntry === null">
			<CompaerEntry
				:entryPair="needSelectPair"
				@choice="choice"/>
			<div class="miniMapWrap">
				<MiniMap
					:pairedRoundTotal="pairedRoundTotal"/>
			</div>
		</div>
		<div
			id="finishEntry"
			v-if="finishEntry !== null">
			<!-- 최초 출력시 빵빠레 사운드 + 종이 꽃가루 -->
			최종우승
			{{ finishEntry.name }}
		</div>
	</div>
</template>

<script lang="ts">
import MiniMap from '@/components/content/MiniMap.vue'
import CompaerEntry from '@/components/content/CompaerEntry.vue'

import {
	computed,
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
const getPairedRoundTotal = (entries: Array<Entry>): Array<Array<number>> => {
	const shuffledEntries = entries.slice().sort(() => Math.random() - 0.5)
	const resultIndex = [] as Array<Array<number>>

	const entriesLength = entries.length
	let maxRound = 1
	while (entriesLength / (2 ** maxRound) > 0.5) {
		resultIndex.push([] as Array<number>)
		maxRound += 1
	}

	const maxEntryCount = (resultIndex.length + 1) * 2
	console.log(maxEntryCount)
	for (let index = 0; index < maxEntryCount; index += 1) {
		const entry = shuffledEntries[index] as Entry
		if (entry !== undefined && entry.index !== undefined) {
			resultIndex[0].push(entry.index)
		} else {
			resultIndex[0].push(-1)
		}
	}

	resultIndex.push([] as Array<number>)
	return resultIndex
}

const findEntryByIndex = (entries: Array<Entry>, targetIndex: number): Entry => {
	const result = entries.find((entry: Entry) => entry.index === targetIndex)
	if (result === undefined || result === null) {
		throw new TypeError(`can't find entry(index:${targetIndex}) in entries`)
	}

	return result
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
		const pairedRoundTotal = ref([]) as Ref<Array<Array<number>>>
		const needSelectPair = ref({}) as Ref<EntryPair>
		apiClient.get(`${process.env.VUE_APP_API_URL + API.CONTENT_DETAIL}/`)
			.then((result) => {
				content.value = result.data
				isContentReady.value = true
				pairedRoundTotal.value = getPairedRoundTotal(content.value.entries)

				// 선택할 첫 엔트리 매칭
				const aIndex = pairedRoundTotal.value[0][0] as number
				needSelectPair.value.a = findEntryByIndex(content.value.entries, aIndex)
				const bIndex = pairedRoundTotal.value[0][1] as number
				needSelectPair.value.b = findEntryByIndex(content.value.entries, bIndex)

				log.info('조회된 컨텐츠', content.value)
			})

		const currntRound: Ref<number> = ref(1)

		// 이벤트 - 비교 선택
		let choiceCount = 0
		const finishEntry = ref(null) as Ref<Entry | null>
		const maxChoice = computed(() => pairedRoundTotal.value[currntRound.value - 1].length / 2)
		const choice = (choiceEntryIndex: number) => {
			choiceCount += 1
			log.info('emit-choice', findEntryByIndex(content.value.entries, choiceEntryIndex))
			pairedRoundTotal.value[currntRound.value].push(choiceEntryIndex)

			// 조건 맞을때 다음 라운드로 진행
			if (choiceCount >= maxChoice.value) {
				log.info('next round')
				choiceCount = 0
				currntRound.value += 1
			}

			if (currntRound.value < pairedRoundTotal.value.length) {
				// 다음 비교할 entryPair 전달
				needSelectPair.value = {
					a: findEntryByIndex(
						content.value.entries,
						pairedRoundTotal.value[currntRound.value - 1][choiceCount * 2],
					),
					b: findEntryByIndex(
						content.value.entries,
						pairedRoundTotal.value[currntRound.value - 1][choiceCount * 2 + 1],
					),
				} as EntryPair
			} else {
				// 비교 종료
				log.info('finish')
				const finishEntryIndex = pairedRoundTotal.value[currntRound.value - 1][choiceCount * 2]
				finishEntry.value = findEntryByIndex(content.value.entries, finishEntryIndex)
			}
		}

		return {
			log,
			maxChoice,
			isContentReady,
			finishEntry,
			content,
			currntRound,
			needSelectPair,
			choice,
			pairedRoundTotal,
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
