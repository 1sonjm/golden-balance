import { ActionContext, ActionTree } from 'vuex'
import { Mutations, MutationType } from './mutations'
import { Common } from './state'

export enum ActionTypes {
	LoaddingOn = 'LoaddingOn',
	LoaddingOff = 'LoaddingOff',
}

type ActionAugments = Omit<ActionContext<Common, Common>, 'commit'> & {
	commit<K extends keyof Mutations>(
		key: K,
		payload: Parameters<Mutations[K]>[1]
	): ReturnType<Mutations[K]>
}

export type Actions = {
	[ActionTypes.LoaddingOn](context: ActionAugments): void
	[ActionTypes.LoaddingOff](context: ActionAugments): void
}

export const actions: ActionTree<Common, Common> & Actions = {
	async [ActionTypes.LoaddingOn]({ commit }) {
		commit(MutationType.ToggleLoading, true)
	},
	async [ActionTypes.LoaddingOff]({ commit }) {
		commit(MutationType.ToggleLoading, false)
	},
}
