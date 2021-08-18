<template>
	<BaseDialog
		:modal="false"
		@close="closing">
			<div id="miniMapDialog">
			aaaaaaaaaaaaaaaaaaaaaaaaaa
			aaaaaaaaaaaaaaaaaaaaaaaaaa
			<canvas></canvas>
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
	name: 'MiniMapDialog',
	components: {
		BaseDialog,
	},
	props: {
		count: {
			type: Object as PropType<number>,
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

#miniMapDialog{
}

@include tablet {
  #miniMapDialog{
		font-size: 1em;
	}
}
@include mobile {
  #miniMapDialog{
		font-size: 1em;
	}
}
</style>
