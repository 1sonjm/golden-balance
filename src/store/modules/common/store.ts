import { Module } from 'vuex'
import { state, Common } from './state'
import { mutations } from './mutations'
import { actions } from './actions'
import { getters } from './getters'

const module: Module<Common, any> = {
	state,
	mutations,
	actions,
	getters,
}

export default module
