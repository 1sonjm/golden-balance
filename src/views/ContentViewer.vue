<template>
	<div id="contentViewer">
		<div id="titleArea">
			<div>{{ content.name }}</div>
			<div>진행상태</div>
			<div>공유</div>
			<div>언어</div>
		</div>
		<div id="compaerWrap">
			<CompaerContent/>
			<div class="miniMapWrap">
				<MiniMap/>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import MiniMap from '@/components/content/MiniMap.vue'
import CompaerContent from '@/components/content/CompaerContent.vue'

import {
	defineComponent, computed, ref, Ref,
} from 'vue'
import { apiClient, API } from '@/plugins/axios'
import { Content } from '@/@types/content'
import { useLogger } from 'vue-logger-plugin'

export default defineComponent({
	name: 'ContentViewer',
	components: {
		MiniMap,
		CompaerContent,
	},
	setup() {
		const log = useLogger()

		const content = ref({}) as Ref<Content>
		apiClient.get(`${process.env.VUE_APP_API_URL + API.CONTENT_DETAIL}/`)
			.then((result) => {
				content.value = result.data
				log.info(content.value)
			})

		return {
			log,
			content,
		}
	},
})
</script>

<style lang="scss" scoped>
#contentViewer{
	position: relative;
	display: flex;
	flex-direction: column;
	height: 100vh;
	#titleArea{
		display: flex;
		div{
			flex: auto;
		}
	}
	#compaerWrap{
		position: relative;
		flex: 1 1 auto;
		.miniMapWrap{
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translateX(-50%) translateY(-50%);
		}
	}
}
</style>
