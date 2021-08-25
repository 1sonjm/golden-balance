<template>
	<BaseDialog
		:modal="false"
		:isTransparent="true"
		:headerText="'선택 기록'"
		@close="closing">
		<div id="historyDialog">
			<div
				v-for="(entryName, index) in histroy"
				:key="entryName">
				{{ index }}: {{ entryName }}
			</div>
		</div>
	</BaseDialog>
</template>

<script lang="ts">
import BaseDialog from '@/components/dialog/BaseDialog.vue'

import {
	defineComponent, PropType, computed, ref,
} from 'vue'
import { useLogger } from 'vue-logger-plugin'

export default defineComponent({
	name: 'HistoryDialog',
	components: {
		BaseDialog,
	},
	props: {
		count: {
			type: Number,
			require: true,
		},
		contentType: {
			type: Number,
			require: true,
		},
		histroy: {
			type: Object as PropType<Array<string>>,
			require: true,
		},
	},
	emits: ['close'],
	setup(props, { emit }) {
		const log = useLogger()
		const closing = () => {
			emit('close')
		}

		return {
			log,
			closing,
		}
	},
})
</script>

<style lang="scss">
@import "@/scss/_mixin";

#historyDialog{
	max-height: 40vh;
	overflow: auto;
}

@include tablet {
  #historyDialog{
		font-size: 1em;
	}
}
@include mobile {
  #historyDialog{
		font-size: 1em;
	}
}
</style>
