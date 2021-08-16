<template>
	<div id="compaerEntry">
		<section
			@click="choiceEntry(entryPair.a.index)">
			<ReferencesData :references="entryPair.a.references"/>
			<div>
				<p>{{ entryPair.a.name }}</p>
			</div>
		</section>
		<section
			@click="choiceEntry(entryPair.b.index)">
			<ReferencesData :references="entryPair.b.references"/>
			<div>
				<p>{{ entryPair.b.name }}</p>
			</div>
		</section>
	</div>
</template>

<script lang="ts">
import ReferencesData from '@/components/content/ReferencesData.vue'

import {
	defineComponent, PropType, computed, ref, Ref,
} from 'vue'
import { useLogger } from 'vue-logger-plugin'
import { Entry, EntryPair } from '@/@types/content'

export default defineComponent({
	name: 'CompaerEntry',
	components: {
		ReferencesData,
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
	position: relative;
	section{
		flex: 1 1 auto;
		width: 50%;
		&:nth-child(1){
			background-color: #fdd;
		}
		&:nth-child(2){
			background-color: #dfd;
		}
	}
}

@include desktop {
  #compaerEntry{
		flex-direction: column;
		section{
			width: 100%;
		}
	}
}
</style>
