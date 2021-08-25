import { MutationTree } from 'vuex'
import { Common } from './state'

export enum MutationType {
	ToggleLoading = 'ToggleLoading',
	showLoadingWithMessage = 'showLoadingWithMessage',
	ToggleDarkMode = 'ToggleDarkMode',
}

export type Mutations = {
	[MutationType.ToggleLoading](state: Common, isOn: boolean | undefined): void
	[MutationType.showLoadingWithMessage](state: Common, message: string | undefined): void
	[MutationType.ToggleDarkMode](state: Common, isOn: boolean | undefined): void
}

export const mutations: MutationTree<Common> & Mutations = {
	[MutationType.ToggleLoading](state, isOn) {
		state.loading.isOn = isOn || !state.loading.isOn
	},
	[MutationType.showLoadingWithMessage](state, message) {
		state.loading.isOn = true
		state.loading.message = message
	},
	[MutationType.ToggleDarkMode](state, isOn) {
		state.isDarkMode = isOn || !state.isDarkMode
	},
}
