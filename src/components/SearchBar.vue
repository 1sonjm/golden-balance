<template>
	<div>
		<input type="text" :value="addText">
		<button @click="searchData">search</button>
	</div>
</template>

<script lang="ts">
import {
	defineComponent, computed, ref,
} from 'vue'
import dayjs from 'dayjs'
import forrmatDate from '@/composables/forrmatDate'
import CommonService from '@/service/CommonService'

export default defineComponent({
	name: 'EditModal',
	props: {
		id: { type: Number, required: true },
	},
	setup(props) {
		console.log(props)
		const test = ref('aaaa')
		const now = ref(dayjs())
		const searchData = async () => {
			await CommonService.ping()
		}

		const addText = computed(() => {
			const result = `${test.value} ${forrmatDate(now.value)}`
			return result
		})
		return { searchData, addText }
	},
})
</script>

<style lang="scss" scoped>
div{
	width:300px;
}
</style>
