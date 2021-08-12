<template>
	<div id="titleArea">
<!-- 등록/수정일때 타이틀 입력상자로
언어, 몇강인지, 토너먼트+조별 있는지, 와일드카드 설정 은 팝업으로 -->
		<div>제목</div>
		<div>진행상태</div>
		<div>공유</div>
		<div>언어</div>
	</div>
</template>

<script lang="ts">
import {
	defineComponent, computed, ref,
} from 'vue'
import { useLogger } from 'vue-logger-plugin'

export default defineComponent({
	name: 'TitleArea',
	components: {
	},
	props: {
	},
	setup(props) {
		const log = useLogger()

		return {
			log,
		}
	},
})
</script>

<style lang="scss">
</style>
