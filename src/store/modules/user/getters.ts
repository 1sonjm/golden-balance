import { GetterTree } from 'vuex'
import { User } from './state'

export type Getters = {
	getInfo(state: User): User
}

export const getters: GetterTree<User, User> & Getters = {
	getInfo(state) {
		return state
	},
}
