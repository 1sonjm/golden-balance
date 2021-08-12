<template>
	<div id="home">
		<img alt="Vue logo" src="../assets/logo.png">
		<HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>
		<KakaoMap/>
	</div>
</template>

<script lang="ts">
import HelloWorld from '@/components/HelloWorld.vue'

import {
	defineComponent, ref,
} from 'vue'
import { useLogger } from 'vue-logger-plugin'
import dayjs from 'dayjs'

export default defineComponent({
	name: 'Home',
	components: {
		HelloWorld,
	},
	props: {
	},
	setup(props) {
		const log = useLogger()
		const now = ref(dayjs())

		return {
			log,
			now,
		}
	},
})
</script>

<style lang="scss">
</style>
