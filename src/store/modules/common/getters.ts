import { GetterTree } from 'vuex'
import { Common } from './state'

export type Getters = {
	userInfo(state: Common): Common
}

export const getters: GetterTree<Common, Common> & Getters = {
	userInfo(state) {
		return state
	},
}
