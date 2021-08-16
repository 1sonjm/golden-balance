<template>
	<div
		id="miniMap"
		postion="absolute-top-center">
		<img
			src="@/assets/icon/svg/finance.svg"
			:hover="11"/>
	</div>
</template>

<script lang="ts">
import {
	defineComponent, computed, ref,
} from 'vue'
import { useLogger } from 'vue-logger-plugin'

export default defineComponent({
	name: 'template',
	components: {
	},
	props: {
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

#miniMap{
	background: rgba(0,0,0,0.5);
	img{
		height: 10vh;
	}
}

</style>
