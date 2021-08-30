<template>
	<div
		id="history"
		@click="showMap">
		<img
			src="@/assets/icon/svg/finance.svg"/>
	</div>
	<component
		:is="HistoryDialog"
		:contentType="contentType"
		:histroy="histroy"
		@close="closeDialog"></component>
</template>

<script lang="ts">
import HistroyDialog from '@/components/dialog/HistroyDialog.vue'

import {
	defineComponent, PropType, computed, ref, Ref,
	defineAsyncComponent,
} from 'vue'
import { useLogger } from 'vue-logger-plugin'
import { Entry } from '@/@types/content'

export default defineComponent({
	name: 'History',
	components: {
	},
	props: {
		contentType: {
			type: Number,
			require: true,
		},
		contentList: {
			type: Object as PropType<Array<Entry>>,
			require: true,
		},
		histroy: {
			type: Object as PropType<Array<string>>,
			require: true,
		},
	},
	setup(props, { emit }) {
		const log = useLogger()

		const isShowHistory = ref(false) as Ref<boolean>
		const HistoryDialog = computed(() => {
			if (isShowHistory.value) {
				return HistroyDialog
			}
			return undefined
		})

		// contentList 사용하여 선택 기록을 표시

		const closeDialog = () => {
			isShowHistory.value = false
		}

		const showMap = () => {
			isShowHistory.value = true
		}

		return {
			log,
			showMap,
			isShowHistory,
			HistoryDialog,
			closeDialog,
		}
	},
})
</script>

<style lang="scss">
@import "@/scss/_mixin";

#history{
	position: absolute;
	left: calc(50% - 5vh - 1.2em);
	top: calc(50% - 5vh - 1.2em);
	background: rgba(0,0,0,0.5);
	padding: 1.2em;
	border-radius: 50%;
	img{
		height: 10vh;
	}
}

</style>
