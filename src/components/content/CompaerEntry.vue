<template>
	<div id="compaerEntry">
		<section
			@click="choiceEntry(entryPair.a.index)">
			<ReferencesData :references="entryPair.a.references"/>
			<div class="description">
				<p class="title">{{ entryPair.a.name }}</p>
				<p v-if="entryPair.a.description">
					{{ entryPair.a.description }}
				</p>
			</div>
		</section>
		<section
			@click="choiceEntry(entryPair.b.index)">
			<ReferencesData :references="entryPair.b.references"/>
			<div class="description">
				<p class="title">{{ entryPair.b.name }}</p>
				<p v-if="entryPair.b.description">
					{{ entryPair.b.description }}
				</p>
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
		position: relative;
		cursor: pointer;
		.description{
			position: absolute;
			bottom: 5%;
			left: 50%;
			transform: translateX(-50%);
			background-color: rgba(0,0,0,0.5);
			color: rgb(255,255,255);
		}
		&:nth-child(1){
			background-color: rgba(0,0,0,0.3);
		}
		&:nth-child(2){
			background-color: rgba(0,0,0,0.6);
		}
	}
}

@include desktop {
  #compaerEntry{
		flex-direction: column;
		section{
			width: 100%;
			height: 50%;
			.description{
				padding: 0.5em;
				border-radius: 0.5em;
				.title{
					font-size: 1.3em;
					font-weight: bold;
				}
			}
			&:nth-child(1){
				.description{
					bottom: unset;
					top: 5%;
				}
			}
		}
	}
}
</style>
