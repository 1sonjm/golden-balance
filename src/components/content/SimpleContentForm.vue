<template>
	<div>
		<ul>
			<li
				v-for="content in contentList"
				:key="content.contentID">
				<SimpleContentForm :content="content"/>
			</li>
		</ul>
	</div>
</template>

<script lang="ts">

import {
	defineComponent, computed, ref,
} from 'vue'
import dayjs from 'dayjs'

export default defineComponent({
	name: 'SimpleContentForm',
	components: {},
	props: {
		// content: {
		// 	contentID: String,
		// 	name: String,
		// },
	},
	setup(props) {
		console.log(props)
		const now = ref(dayjs())
		const contentList = ref([
			{ contentID: '1111', name: 'aa' },
			{ contentID: '1112', name: 'bb' },
			{ contentID: '1113', name: 'Cc' },
		])
		return { now, contentList }
	},
})
</script>

<style lang="scss" scoped>
div{
	width:300px;
}
</style>
