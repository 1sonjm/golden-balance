import { Module } from 'vuex'
import { state } from './state'
import { mutations } from './mutations'
import { actions } from './actions'
import { getters } from './getters'
import { User } from '@/@types/user'

const module: Module<User, any> = {
	state,
	mutations,
	actions,
	getters,
}

export default module
