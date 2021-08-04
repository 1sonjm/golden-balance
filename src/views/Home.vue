<template>
	<div id="home">
		<img alt="Vue logo" src="../assets/logo.png">
		<HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>
		<KakaoMap/>
	</div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import HelloWorld from '@/components/HelloWorld.vue'

@Options({
	components: {
		HelloWorld,
	},
})
export default class Home extends Vue {}
</script>

<style lang="scss">

</style>
