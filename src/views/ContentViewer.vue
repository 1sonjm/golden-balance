<template>
	<div id="ContentViewer">
		<TitleArea/>
		<div>
			<MiniMap/>
			<CompaerContent/>
		</div>
	</div>
</template>

<script lang="ts">
import TitleArea from '@/components/content/TitleArea.vue'
import MiniMap from '@/components/content/MiniMap.vue'
import CompaerContent from '@/components/content/CompaerContent.vue'

import {
	defineComponent, computed, ref,
} from 'vue'
import dayjs from 'dayjs'

export default defineComponent({
	name: 'ContentEditor',
	components: {
		TitleArea,
		MiniMap,
		CompaerContent,
	},
	props: {
		id: { type: Number, required: true },
	},
	setup(props) {
		console.log(props)
		const now = ref(dayjs())
		return { now }
	},
})
</script>

<style lang="scss" scoped>
#ContentViewer{
	width:300px;
}
</style>
