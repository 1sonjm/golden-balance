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
			<div class="historyAnchor">
				<History
					:contentType="contentType"
					:contentList="content.entries"
					:histroy="histroy"/>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import History from '@/components/content/Histroy.vue'
import CompaerEntry from '@/components/content/CompaerEntry.vue'

import {
	computed,
	defineComponent, ref, Ref,
} from 'vue'
import { apiClient, API } from '@/plugins/axios'
import { ContentDetail, Entry, EntryPair } from '@/@types/content'
import { useLogger } from 'vue-logger-plugin'
import { useRouter } from 'vue-router'
import {
	findEntryByIndex,
	getTournamentEntrySet,
	getLastStandEntrySet,
	getSimpleBalanceEntrySet,
	getDetailBalanceEntrySet,
} from '@/composables/contentData'

export default defineComponent({
	name: 'ContentViewer',
	components: {
		CompaerEntry,
		History,
	},
	props: {
		contentType: {
			type: Number,
			default: 1,
		},
	},
	setup(props) {
		const log = useLogger()
		const router = useRouter()

		const isContentReady = ref(false)
		const content = ref({}) as Ref<ContentDetail>
		const pairedRoundTotal = ref([]) as Ref<Array<Array<number>>>
		const needSelectPair = ref({}) as Ref<EntryPair>
		apiClient.get(`${process.env.VUE_APP_API_URL + API.CONTENT_DETAIL}/`)
			.then((result) => {
				content.value = result.data
				isContentReady.value = true

				switch (props.contentType) {
				default:
				case 1:
					pairedRoundTotal.value = getTournamentEntrySet(content.value.entries)
					break
				case 2:
					pairedRoundTotal.value = getLastStandEntrySet(content.value.entries)
					break
				case 3:
					pairedRoundTotal.value = getSimpleBalanceEntrySet(content.value.entries)
					break
				case 4:
					pairedRoundTotal.value = getDetailBalanceEntrySet(content.value.entries)
					break
				}

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
		const histroy = ref([]) as Ref<Array<string>>
		const finishEntry = ref(null) as Ref<Entry | null>
		const maxChoice = computed(() => pairedRoundTotal.value[currntRound.value - 1].length / 2)
		const choice = (choiceEntryIndex: number) => {
			choiceCount += 1
			log.info('emit-choice', findEntryByIndex(content.value.entries, choiceEntryIndex))
			pairedRoundTotal.value[currntRound.value].push(choiceEntryIndex)
			histroy.value.push(content.value.entries[choiceEntryIndex].name)

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
				const finalRound = pairedRoundTotal.value[currntRound.value - 1]
				const finishEntryIndex = finalRound[0] as number
				router.push({
					name: 'ContentResult',
					query: { id: content.value.id },
					params: { finishEntryIndex },
				})
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
			histroy,
		}
	},
})
</script>

<style lang="scss" scoped>
@import "@/scss/_mixin";

#contentViewer{
	position: relative;
	display: flex;
	flex-direction: column;
	height: 100%;
	width: 100%;
	#titleArea{
		height: 2em;
		display: flex;
		div{
			flex: auto;
		}
	}
	#compaerWrap{
		position: relative;
		flex: 1 1 auto;
		height: calc(100% - 2em);
		.historyAnchor{
			position: absolute;
			top: 50%;
			left: 50%;
		}
	}
}
</style>
