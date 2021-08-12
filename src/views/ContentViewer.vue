<template>
	<div id="contentViewer">
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
import { apiClient, API } from '@/plugins/axios'
import { Content } from '@/@types/content'
import { useLogger } from 'vue-logger-plugin'

export default defineComponent({
	name: 'ContentViewer',
	components: {
		TitleArea,
		MiniMap,
		CompaerContent,
	},
	props: {
		id: { type: Number, required: true },
	},
	setup(props) {
		const log = useLogger()

		apiClient.get(process.env.VUE_APP_API_URL + API.CONTENT_DETAIL)
			.then((result) => {
				log.info(result)
			})
		return {
			log,
		}
	},
})
</script>

<style lang="scss" scoped>
</style>
