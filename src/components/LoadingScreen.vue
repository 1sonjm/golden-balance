<template>
	<div
		id="loadingScreen"
		v-if="isLoading"
		:class="{ on : isLoading }">
		<div class="anchor">
			<div class="spinner">
				<div class="rect1"></div>
				<div class="rect2"></div>
				<div class="rect3"></div>
				<div class="rect4"></div>
				<div class="rect5"></div>
			</div>
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
	.spinner {
		margin: 0 auto 20px auto;
		width: 50px;
		height: 40px;
		text-align: center;
		font-size: 10px;
		div {
			background-color: $color-base-light;
			height: 100%;
			width: 6px;
			display: inline-block;
			animation: sk-stretchdelay 1.2s infinite ease-in-out;
			@keyframes sk-stretchdelay {
				0%, 40%, 100% {
					transform: scaleY(0.4);
				}  20% {
					transform: scaleY(1.0);
				}
			}
			&.rect2 { animation-delay: -1.1s; }
			&.rect3 { animation-delay: -1.0s; }
			&.rect4 { animation-delay: -0.9s; }
			&.rect5 { animation-delay: -0.8s; }
		}
	}
	.anchor{
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		.message{
			font-size: 1.8em;
			font-weight: bolder;
			padding: 0.2em 0.8em;
			border-radius: 1em;
		}
	}
}

#appWrap{
	&.lightMode{
		#loadingScreen{
			background-color: rgba($color-reverse-light, 0.5);
			.anchor{
				.message{
					color: $color-reverse-light;
					background-color: $color-base-light;
				}
			}
		}
	}
	&.darkMode{
		#loadingScreen{
			background-color: rgba($color-reverse-dark, 0.2);
			.anchor{
				.message{
					color: $color-reverse-dark;
					background-color: $color-base-dark;
				}
			}
		}
	}
}

@include tablet-inherit {
	#loadingScreen{
		.anchor{
			.message{
				font-size: 1.4em;
			}
		}
	}
}

</style>
