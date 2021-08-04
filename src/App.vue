/* eslint-disable semi */
<template>
	<TopMenu/>
	<div id="contentView" class="contentWidthLimit">
		<router-view/>
	</div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onBeforeMount } from 'vue'
import http from '@/plugins/axios'
import TopMenu from '@/views/Header.vue'

export default defineComponent({
	components: { TopMenu },
	setup() {
		onBeforeMount(async () => {
			const result = await http.get('//dapi.kakao.com/v2/maps/sdk.js?appkey=c5808bc6799339d530a22b9c04125371')
			console.log('api!!!!!!!!!', result)
		})

		onMounted(() => console.log('mounted app'))
	},
})
</script>

<style lang="scss">
@font-face {
	font-family: 'MapoBackpacking';
	src: url('../public/font/mapo/MapoBackpacking.woff2');
}
@font-face {
	font-family: 'MapoPeacefull';
	src: url('../public/font/mapo/MapoPeacefull.woff2');
}

#app {
	font-family: 'MapoPeacefull', Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
}
html, body{
	height: 100%;
	padding: 0;
	margin: 0;
	text-align: center;
}
#app{
	position: relative;
	margin: auto;
	height: 100%;
	font-size: 14px;
	background: url('~@/assets/icon/background-pattern.png');
	overflow-y: auto;
	#contentView{
		position: relative;
		background: #f1f1f1;
	}
}
.contentWidthLimit{
	max-width: 42rem;
	margin: auto;
}
</style>
