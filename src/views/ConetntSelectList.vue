<template>
	<div id="conetntSelectList">
		<div id="listSearch">
			<input type="text" name="" id="">
			<button>검색</button>
		</div>
		<ContentList :contentList="contentList"/>
	</div>
</template>

<script lang="ts">
import ContentList from '@/components/content/ContentList.vue'

import {
	defineComponent, ref, Ref,
} from 'vue'
import { apiClient, API } from '@/plugins/axios'
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

		const contentList = ref([]) as Ref<Content[]>
		apiClient.get(`${process.env.VUE_APP_API_URL + API.CONTENT_LIST}/`)
			.then((result) => {
				contentList.value = result.data.list
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
#conetntSelectList{
	width:100%;
	#listSearch{
		margin-bottom: 1em;
	}
}
</style>
