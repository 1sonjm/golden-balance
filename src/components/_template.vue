<template>
	<div id="template">
	</div>
</template>

<script lang="ts">
import {
	defineComponent, PropType, computed, ref,
} from 'vue'
import { useLogger } from 'vue-logger-plugin'

export default defineComponent({
	name: 'template',
	components: {
	},
	props: {
		count: {
			type: Object as PropType<number>,
			require: true,
		},
	},
	setup(props) {
		const log = useLogger()

		return {
			log,
		}
	},
})
</script>

<style lang="scss">
@import "@/scss/_mixin";

@include tablet {
  #template{
		font-size: 1em;
	}
}
@include mobile {
  #template{
		font-size: 1em;
	}
}
</style>
