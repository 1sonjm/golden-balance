import { MutationTree } from 'vuex'
import { Common } from './state'

export enum MutationType {
	ToggleLoading = 'ToggleLoading',
	ToggleDarkMode = 'ToggleDarkMode',
}

export type Mutations = {
	[MutationType.ToggleLoading](state: Common, isOn: boolean | undefined): void
	[MutationType.ToggleDarkMode](state: Common, isOn: boolean | undefined): void
}

export const mutations: MutationTree<Common> & Mutations = {
	[MutationType.ToggleLoading](state, isOn) {
		state.isLoading = isOn || !state.isLoading
	},
	[MutationType.ToggleDarkMode](state, isOn) {
		state.isDarkMode = isOn || !state.isDarkMode
	},
}
