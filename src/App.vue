/* eslint-disable semi */
<template>
	<div
		id="appWrap"
		:class="isDarkMode ? 'darkMode' : 'lightMode'">
		<Header/>
		<div
			id="contentView"
			class="contentWidthLimit">
			<LoadingScreen/>
			<router-view/>
		</div>
		<Footer/>
	</div>
</template>

<script lang="ts">
import Header from '@/views/layout/Header.vue'
import Footer from '@/views/layout/Footer.vue'
import LoadingScreen from '@/components/LoadingScreen.vue'

import {
	defineComponent,
	computed,
} from 'vue'
import store from '@/store'

export default defineComponent({
	components: {
		Header,
		Footer,
		LoadingScreen,
	},
	setup() {
		const isDarkMode = computed(() => store.state.common.isDarkMode)
		// onBeforeMount(async () => {
		// 	console.log('onBeforeMount')
		// })

		// onMounted(() => console.log('mounted app'))
		return {
			isDarkMode,
		}
	},
})
</script>

<style lang="scss">
@import "@/scss/_mixin";

@font-face {
	font-family: 'MapoBackpacking';
	src: url('../public/font/mapo/MapoBackpacking.woff2');
}
@font-face {
	font-family: 'MapoPeacefull';
	src: url('../public/font/mapo/MapoPeacefull.woff2');
}

html, body{
	position: relative;
	height: 100%;
	padding: 0;
	margin: 0;
	text-align: center;
}
ul, li, p{
	position: relative;
	padding: 0;
	margin: 0;
}
#app{
	font-family: 'MapoPeacefull', Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	position: relative;
	margin: auto;
	height: 100%;
	width: 100%;
	font-size: 14px;
	overflow-y: auto;
	#appWrap{
		@include brightness-toggle;
		position: relative;
		width: 100%;
		min-height: 100vh;
		#contentView{
			width: calc(100% - 2em);
			min-height: calc(100vh - #{$size-header-height});
			position: relative;
			flex: auto;
			padding: 0 1em;
		}
	}
}

@include desktop {
	.contentWidthLimit{
		max-width: 720px;
		margin: auto;
	}
}
</style>
