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

export default defineComponent({
	name: 'ConetntSelectList',
	components: { ContentList },
	props: {
		countlimit: Number,
		order: String,
	},
	setup(props) {
		const contentList = ref([
			{
				id: '1111',
				name: 'aa',
				description: 'asdfasdf qwe rqwe dfzdf q werq wejpro q2j3opjr 2oi jo rhsdifhp wqhp rohqwepohsdop fihawpoehqwopei hfqpof2 h3o2 h23 2',
				showResult: true,
			},
			{ id: '1112', name: 'bb', showResult: true },
			{ id: '1112', name: 'bb', showResult: true },
			{ id: '1112', name: 'bb', showResult: true },
			{ id: '1112', name: 'bb', showResult: false },
			{ id: '1112', name: 'bb', showResult: false },
			{ id: '1113', name: 'Cc', showResult: false },
			{ id: '1113', name: 'Cc', showResult: true },
			{ id: '1113', name: 'Cc', showResult: true },
			{ id: '1113', name: 'Cc', showResult: true },
		]) as Ref<Content[]>
		return { contentList }
	},
})
</script>

<style lang="scss" scoped>
#ConetntSelectList{
	width:100%;
}
</style>
