<template>
	<div id="compaerEntry">
		<section
			@click="choiceEntry(entryPair.a.index)">
			<img :src="'aaa'">
			<div>
				<p>{{ entryPair.a.name }}</p>
			</div>
		</section>
		<section
			@click="choiceEntry(entryPair.b.index)">
			<img :src="'aaa'">
			<div>
				<p>{{ entryPair.b.name }}</p>
			</div>
		</section>
	</div>
</template>

<script lang="ts">
import {
	defineComponent, PropType, computed, ref, Ref,
} from 'vue'
import { useLogger } from 'vue-logger-plugin'
import { Entry, EntryPair } from '@/@types/content'

export default defineComponent({
	name: 'CompaerEntry',
	components: {
	},
	props: {
		entryPair: {
			type: Object as PropType<EntryPair>,
			require: true,
		},
	},
	setup(props, { emit }) {
		const log = useLogger()
		log.debug('entryPair', props.entryPair)

		const choiceEntry = (choiceEntryNumber: number) => {
			emit('choice', choiceEntryNumber)
		}

		return {
			log,
			choiceEntry,
		}
	},
})
</script>

<style lang="scss">
@import "@/scss/_mixin";

#compaerEntry{
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
  #compaerEntry{
		flex-direction: column;
	}
}
</style>
