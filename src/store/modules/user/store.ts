import { Module } from 'vuex'
import { state, User } from './state'
import { mutations } from './mutations'
import { actions } from './actions'
import { getters } from './getters'

const module: Module<User, any> = {
	state,
	mutations,
	actions,
	getters,
}

export default module
