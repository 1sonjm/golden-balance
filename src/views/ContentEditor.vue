<template>
	<div>
		<TitleArea :editable="true"/>
		<div>
			<MiniMap/>
			<CompaerContent/>
		</div>
	</div>
</template>

<script lang="ts">
import {
	defineComponent, computed, ref,
} from 'vue'
import dayjs from 'dayjs'

export default defineComponent({
	name: 'ContentEditor',
	components: {},
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
div{
	width:300px;
}
</style>
