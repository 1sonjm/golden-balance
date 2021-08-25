<template>
	<div
		id="loadingScreen"
		v-if="isLoading"
		:class="{ on : isLoading }">
		<div class="anchor">
			<p class="spinner"></p>
			<p class="message">{{ loadingMessage }}</p>
		</div>
	</div>
</template>

<script lang="ts">
import {
	defineComponent, PropType, computed, ref, Ref,
} from 'vue'
import { useLogger } from 'vue-logger-plugin'
import store from '@/store'

export default defineComponent({
	name: 'LoadingScreen',
	components: {
	},
	props: {
		count: {
			type: Number,
			require: true,
		},
	},
	setup(props) {
		const log = useLogger()

		const isLoading = computed(() => store.state.common.loading.isOn)
		const loadingMessage = computed(() => store.state.common.loading.message)

		return {
			log,
			isLoading,
			loadingMessage,
		}
	},
})
</script>

<style lang="scss">
@import "@/scss/_mixin";

#loadingScreen{
	display: block;
	position: fixed;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.3);
	left: 0;
	top: $size-header-height - 1.1em;
	z-index: 1;
	&.on{
		// fade 효과 추가
	}
	.anchor{
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		.message{
			color: $color-point-base;
			font-size: 1.8em;
			font-weight: bolder;
			background-color: rgba(0, 0, 0, 0.3);
			padding: 0.2em 0.8em;
			border-radius: 1em;
		}
	}
}
</style>
