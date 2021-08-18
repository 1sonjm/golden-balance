<template>
	<div class="baseDialog">
		<section class="overlay"
			@click="closingNotModal"
			:class="{ closing: isClosing }"></section>
		<section
			class="body"
			:class="{ closing: isClosing }">
			<button
				class="close"
				@click="closing"><font-awesome-icon icon="times-circle"/></button>
			<div v-if="headerText">{{ headerText }}</div>
			<div>
				<slot>Empty Dialog Content</slot>
			</div>
		</section>
	</div>
</template>

<script lang="ts">
import {
	defineComponent, PropType, computed, ref, Ref,
} from 'vue'
import { useLogger } from 'vue-logger-plugin'
import { delay } from '@/composables/contentData'

export default defineComponent({
	name: 'BaseDialog',
	components: {
	},
	props: {
		modal: {
			type: Object as PropType<boolean>,
			require: true,
		},
		headerText: {
			type: Object as PropType<string>,
			require: true,
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
	.body{
		position: relative;
		background: #ddd;
		margin: auto;
		width: 50%;
		max-width: 30em;
		border-radius: 0.5em;
		@include animation-fade-in(0.5);
		&.closing{
			@include animation-fade-out(0.5);
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
