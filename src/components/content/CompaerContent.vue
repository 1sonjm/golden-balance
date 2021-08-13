<template>
	<div id="compaerContent">
		<section>컨텐츠A</section>
		<section>컨텐츠B</section>
	</div>
</template>

<script lang="ts">
import {
	defineComponent, computed, ref,
} from 'vue'
import { useLogger } from 'vue-logger-plugin'

export default defineComponent({
	name: 'template',
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
@import "@/scss/_mixin";

#compaerContent{
	display: flex;
	height: 100%;
	section{
		flex: 1 1 auto;
		&:nth-child(1){
			background-color: #fdd;
		}
		&:nth-child(2){
			background-color: #dfd;
		}
	}
}

@include tablet-inherit {
  #compaerContent{
		flex-direction: column;
	}
}
</style>
