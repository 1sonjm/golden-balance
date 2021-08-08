<template>
	<div id="ConetntSelectList">
		<div>
			<input type="text" name="" id="">
			<button>검색</button>
		</div>
		<ContentList :contentList="contentList"/>
	</div>
</template>

<script lang="ts">
import ContentList from '@/components/content/ContentList.vue'

import {
	defineComponent, computed, ref, Ref,
} from 'vue'
import { Content } from '@/@types/content'
import { useLogger } from 'vue-logger-plugin'

export default defineComponent({
	name: 'ConetntSelectList',
	components: { ContentList },
	props: {
		countlimit: Number,
		order: String,
	},
	setup() {
		const log = useLogger()
		// 개발 변수 설정하기
		// https://cli.vuejs.org/guide/mode-and-env.html#environment-variables
		// https://joshua1988.github.io/vue-camp/deploy/env-setup.html#vue-cli-3-x-%EB%B2%84%EC%A0%84%EC%9D%98-%ED%99%98%EA%B2%BD-%EB%B3%80%EC%88%98-%ED%8C%8C%EC%9D%BC-%EC%A0%91%EA%B7%BC
		const contentList = ref([]) as Ref<Content[]>
		fetch(VUE_APP_API_URL + '/api/contentList')
			.then((response) => response.json())
			.then((result) => {
				contentList.value = result.data
				log.info(contentList.value)
			})

		return {
			log,
			contentList,
		}
	},
})
</script>

<style lang="scss" scoped>
#ConetntSelectList{
	width:100%;
}
</style>
