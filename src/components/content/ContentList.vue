<template>
	<div class="contentList">
		<ul>
			<li
				v-for="content in contentList"
				:key="content.contentID">
				<SimpleContentForm :name="content.name" :content="content"/>
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
	name: 'ContentList',
	components: { SimpleContentForm },
	props: {
		contentList: Array,
	},
	setup(props) {
		return { }
	},
})
</script>

<style lang="scss">
.contentList{
	width:100%;
	position: relative;
	ul{
		width: 100%;
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		align-items: left;
		justify-content: left;
		flex-direction: row;
		flex-wrap: wrap;
		flex-flow: row wrap;
		align-content: flex-end;
		li{
			display: inline-block;
			display: box;
			width: 33.3%;
		}
	}
}
</style>
