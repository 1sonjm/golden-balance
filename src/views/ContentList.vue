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
import SimpleContentForm from '@/components/content/SimpleContentForm.vue'

import {
	defineComponent, computed, ref,
} from 'vue'

export default defineComponent({
	name: 'ContentEditor',
	components: { SimpleContentForm },
	props: {
		id: { type: Number, required: true },
	},
	setup(props) {
		console.log(props)
		const contentList = ref([
			{ contentID: '1111', name: 'aa' },
			{ contentID: '1112', name: 'bb' },
			{ contentID: '1113', name: 'Cc' },
		])
		return { contentList }
	},
})
</script>

<style lang="scss" scoped>
div{
	width:300px;
}
</style>
