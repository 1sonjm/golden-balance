<template>
	<BaseDialog
		:modal="false"
		:isTransparent="true"
		@close="closing">
			<div id="miniMapDialog">
			asdf adfasd qe 123 412 4easdf adfasd qe 123 412 4ere r123 123r2 re r123 123r2
			asdf adfasd qe 123 412 4ere r123 123r2 asdf adfasd qe 123 412 4ere r123 123r2
			<canvas></canvas>
		</div>
	</BaseDialog>
</template>

<script lang="ts">
import BaseDialog from '@/components/dialog/BaseDialog.vue'

import {
	defineComponent, computed, ref,
} from 'vue'
import { useLogger } from 'vue-logger-plugin'

export default defineComponent({
	name: 'MiniMapDialog',
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
