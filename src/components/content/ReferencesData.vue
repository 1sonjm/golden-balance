<template>
	<div class="referencesData">
		<img
			class="image"
			v-if="references.type === 'image'"
			:src="references.data">

		<div
			class="video"
			v-if="references.type === 'video'">
			영상
		</div>

		<div
			class="location"
			v-if="references.type === 'location'">
			위치
		</div>
	</div>
</template>

<script lang="ts">
import {
	defineComponent, PropType, computed, ref,
} from 'vue'
import { useLogger } from 'vue-logger-plugin'
import { References } from '@/@types/content'

export default defineComponent({
	name: 'ReferencesData',
	components: {
	},
	props: {
		references: {
			type: Object as PropType<References>,
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

.referencesData{
	position: relative;
	height: 100%;
	width: 100%;
	.image{
		object-fit: contain;
		height: 100%;
		width: 100%;
	}
}
</style>
