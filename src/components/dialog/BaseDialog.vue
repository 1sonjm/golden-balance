<template>
	<div class="baseDialog">
		<section class="overlay"
			@click="closingNotModal"
			:class="{ closing: isClosing }"></section>
		<section
			class="bodyWrap"
			:class="{ closing: isClosing }">
			<div
				class="body"
				:class="{ transparent: isTransparent }">
				<button
					class="close"
					:class="{ transparent: isTransparent }"
					@click="closing"><font-awesome-icon icon="times"/></button>
				<div v-if="headerText">{{ headerText }}</div>
				<div>
					<slot>Empty Dialog Content</slot>
				</div>
			</div>
		</section>
	</div>
</template>

<script lang="ts">
import {
	defineComponent, computed, ref, Ref,
} from 'vue'
import { useLogger } from 'vue-logger-plugin'
import { delay } from '@/composables/contentData'

export default defineComponent({
	name: 'BaseDialog',
	components: {
	},
	props: {
		modal: {
			type: Boolean,
			require: true,
		},
		headerText: {
			type: String,
			require: true,
		},
		isTransparent: {
			type: Boolean,
			default: false,
		},
	},
	emits: ['close'],
	setup(props, { emit }) {
		const log = useLogger()

		const isClosing = ref(false) as Ref<boolean>
		const closing = async () => {
			isClosing.value = true
			await delay(500)
			emit('close')
		}
		const closingNotModal = async () => {
			if (!props.modal) {
				isClosing.value = true
				await delay(500)
				emit('close')
			}
		}

		return {
			log,
			isClosing,
			closing,
			closingNotModal,
		}
	},
})
</script>

<style lang="scss">
@import "@/scss/_mixin";

.baseDialog{
	position: fixed;
	height: 100%;
	width: 100%;
	top: 0;
	left: 0;
	z-index: 1;
	.overlay{
		position: absolute;
		height: 100%;
		width: 100%;
		background: rgba(0,0,0,0.5);
		animation: fade 0.5s;
		@include animation-fade-in(0.5);
		&.closing{
			@include animation-fade-out(0.5);
		}
	}
	.bodyWrap{
		position: relative;
		top: 3em;
		margin: auto;
		max-width: 30em;
		@include animation-fade-in(0.5);
		&.closing{
			@include animation-fade-out(0.5);
		}
		.body{
			position: relative;
			margin: 0 1em;
			padding: 0.5em;
			border-radius: 0.5em;
			min-height: 10vh;
			&.transparent{
				color: $color-base-light !important;
				background-color: rgba(0,0,0,0.65) !important;
			}
			.close{
				position: absolute;
				right: 0;
				top: 0;
				border: none;
				background: none;
				height: 1.8em;
				width: 1.8em;
				padding: 0;
				&.transparent{
					color: $color-base-light !important;
				}
			}
		}
	}
}

#appWrap{
	&.lightMode{
		.body{
			color: $color-reverse-light;
			background-color: $color-base-light;
			.close{
				color: $color-reverse-light;
			}
		}
	}
	&.darkMode{
		.body{
			color: $color-reverse-dark;
			background-color: $color-base-dark;
			.close{
				color: $color-reverse-dark;
			}
			&.transparent{
				color: $color-base-light;
				background-color: $color-base-light;
				.close{
					color: $color-reverse-light;
				}
			}
		}
	}
}

@include tablet {
	#baseDialog{
		font-size: 1em;
	}
}
@include mobile {
	#baseDialog{
		font-size: 1em;
	}
}
</style>
