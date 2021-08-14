<template>
	<div
		id="footer"
		:class="isDarkMode ? 'lightMode' : 'darkMode'">
		<p>설명1</p>
		<p>설명2</p>
		<p>설명3</p>
		<p>설명4</p>
	</div>
</template>

<script lang="ts">
import {
	defineComponent, computed,
} from 'vue'
import { useLogger } from 'vue-logger-plugin'
import store from '@/store'

export default defineComponent({
	name: 'Footer',
	components: {
	},
	props: {
	},
	setup() {
		const log = useLogger()
		const isDarkMode = computed(() => store.state.common.isDarkMode)

		return {
			log,
			isDarkMode,
		}
	},
})
</script>

<style lang="scss">
@import "@/scss/_mixin";

#footer{
	@include brightness-toggle;
}
</style>
