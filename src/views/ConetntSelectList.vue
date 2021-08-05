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
	defineComponent, computed, ref,
} from 'vue'

export default defineComponent({
	name: 'ConetntSelectList',
	components: { ContentList },
	props: {
		countlimit: Number,
		order: String,
	},
	setup(props) {
		const contentList = ref([
			{ contentID: '1111', name: 'aa' },
			{ contentID: '1112', name: 'bb' },
			{ contentID: '1112', name: 'bb' },
			{ contentID: '1112', name: 'bb' },
			{ contentID: '1112', name: 'bb' },
			{ contentID: '1112', name: 'bb' },
			{ contentID: '1113', name: 'Cc' },
			{ contentID: '1113', name: 'Cc' },
			{ contentID: '1113', name: 'Cc' },
			{ contentID: '1113', name: 'Cc' },
		])
		return { contentList }
	},
})
</script>

<style lang="scss" scoped>
#ConetntSelectList{
	width:100%;
}
</style>
