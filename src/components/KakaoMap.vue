<template>
	<div id="kakaoMap">
		<div ref="container" style="width:500px;height:400px;"></div>
	</div>
</template>

<script lang="ts">
import {
	defineComponent, ref, onBeforeMount, onMounted,
} from 'vue'

export default defineComponent({
	// https://www.youtube.com/watch?v=47pHZYtciEs API키 보안
	name: 'KakaoMap',
	props: {
		id: { type: Number, required: true },
	},
	setup(props) {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const { kakao } = window as any
		const container = ref<HTMLDivElement>()

		onMounted(() => {
			// if (container.value) {
			// 	container.value.setAttribute('src',
			//  '//dapi.kakao.com/v2/maps/sdk.js?appkey=c5808bc6799339d530a22b9c04125371')
			// 	console.log('element', container.value)
			// }

			const options = {
				center: new kakao.maps.LatLng(33.450701, 126.570667),
				level: 3,
			}
			const map = new kakao.maps.Map(container, options)
		})

		return { container }
	},
})
</script>

<style lang="scss" scoped>
div{
	width:300px;
}
</style>
