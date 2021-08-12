<template>
	<div class="contentList">
		<ul>
			<li
				v-for="content in contentList"
				:key="content.contentID">
				<SimpleContentForm
					:content="content"/>
			</li>
		</ul>
	</div>
</template>

<script lang="ts">
import SimpleContentForm from '@/components/content/SimpleContentForm.vue'

import {
	defineComponent, computed, ref,
} from 'vue'
import { useLogger } from 'vue-logger-plugin'

export default defineComponent({
	name: 'ContentList',
	components: { SimpleContentForm },
	props: {
		contentList: Array,
	},
	setup(props) {
		const log = useLogger()
		log.info('컨텐츠 리스트', props.contentList)
		return { log }
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
			cursor: pointer;
			display: inline-block;
			width: 33.3%;
		}
	}
}
</style>
