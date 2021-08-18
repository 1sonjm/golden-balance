<template>
	<div
		id="miniMap"
		@click="showMap">
		<img
			src="@/assets/icon/svg/finance.svg"/>
	</div>
	<component
		:is="MiniMapDialog"
		@close="closeDialog"></component>
</template>

<script lang="ts">
import {
	defineComponent, computed, ref, Ref,
	defineAsyncComponent,
} from 'vue'
import { useLogger } from 'vue-logger-plugin'

export default defineComponent({
	name: 'MiniMap',
	components: {
	},
	props: {
	},
	setup(props, { emit }) {
		const log = useLogger()

		const isShowMiniMap = ref(false) as Ref<boolean>
		const MiniMapDialog = computed(() => {
			if (isShowMiniMap.value) {
				return defineAsyncComponent(() => import('@/components/dialog/MiniMapDialog.vue'))
			}
			return ''
		})

		const closeDialog = () => {
			isShowMiniMap.value = false
		}

		const showMap = () => {
			log.warn('미니맵 팝업')
			isShowMiniMap.value = true
		}

		return {
			log,
			showMap,
			isShowMiniMap,
			MiniMapDialog,
			closeDialog,
		}
	},
})
</script>

<style lang="scss">
@import "@/scss/_mixin";

#miniMap{
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
