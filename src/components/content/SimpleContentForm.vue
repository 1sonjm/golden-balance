<template>
	<div class="simpleContentForm">
		<span>컨텐츠 항목</span>
		{{ content.name }}
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
		content: Object,
	},
	setup(props) {
		return { }
	},
})
</script>

<style lang="scss">
.simpleContentForm{
}
</style>
