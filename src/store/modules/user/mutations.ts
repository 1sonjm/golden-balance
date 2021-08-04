import { MutationTree } from 'vuex'
import { User } from './state'

export enum MutationType {
	CreateUserInfo = 'CreateUserInfo',
	UpdateUserInfo = 'UpdateUserInfo',
	DeleteUserInfo = 'DeleteUserInfo',
}

export type Mutations = {
	[MutationType.CreateUserInfo](state: User, id: string): void
	[MutationType.UpdateUserInfo](state: User, id: string): void
	[MutationType.DeleteUserInfo](state: User, id: string): void
}

export const mutations: MutationTree<User> & Mutations = {
	[MutationType.CreateUserInfo](state, changeId) {
		state.id = changeId
	},
	[MutationType.UpdateUserInfo](state) {
		state.id = `${state.id}*`
	},
	[MutationType.DeleteUserInfo](state) {
		state.id = ''
	},
}
