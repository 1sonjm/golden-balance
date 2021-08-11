import { Module } from 'vuex'
import { User } from '@/@types/user'

import { state } from './state'
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
