<template>
	<div
		class="simpleContentForm"
		@click="moveToContent">
		<div>
			썸네일
		</div>
		<div class="contentInfo">
			<p>{{ content.name }}</p>
			<div class="detail">
				<p></p>
				<p>{{ content.entryCount }}</p>
				<p>{{ content.updateDate }}</p>
			</div>
		</div>
		<div>
			<button>공유</button>
			<button v-if="content.showResult">결과</button>
		</div>
	</div>
</template>

<script lang="ts">

import {
	defineComponent, PropType, computed, ref,
} from 'vue'
import dayjs from 'dayjs'
import { Content } from '@/@types/content'

export default defineComponent({
	name: 'SimpleContentForm',
	components: {},
	props: {
		content: {
			type: Object as PropType<Content>,
			required: true,
		},
	},
	setup(props) {
		const moveToContent = () => {
			console.log(props.content.id)
		}
		return { moveToContent }
	},
})
</script>

<style lang="scss">
.simpleContentForm{
}
</style>
