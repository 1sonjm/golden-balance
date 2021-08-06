import { ActionContext, ActionTree } from 'vuex'
import { Mutations, MutationType } from './mutations'
import { User } from '@/@types/user'

export enum ActionTypes {
	UpdateUserInfo = 'UpdateUserInfo',
}

type ActionAugments = Omit<ActionContext<User, User>, 'commit'> & {
	commit<K extends keyof Mutations>(
		key: K,
		payload: Parameters<Mutations[K]>[1]
	): ReturnType<Mutations[K]>
}

export type Actions = {
	[ActionTypes.UpdateUserInfo](context: ActionAugments): void
}

export const actions: ActionTree<User, User> & Actions = {
	async [ActionTypes.UpdateUserInfo]({ commit }) {
		commit(MutationType.CreateUserInfo, 'testID1')
		commit(MutationType.UpdateUserInfo, 'testID2')
		commit(MutationType.DeleteUserInfo, 'testID3')
	},
}
