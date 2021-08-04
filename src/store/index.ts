import { createStore } from 'vuex'
import common from '@/store/modules/common/store'
import user from '@/store/modules/user/store'

export type Common = {
	isLoading: boolean,
}
const store = createStore({
	modules: {
		common,
		user,
	},
})

export default store

/* 모듈 접근
state: () => ({ ... }), // 모듈 상태는 이미 중첩되어 있고, 네임스페이스 옵션의 영향을 받지 않음
getters: {
	isAdmin () { ... } // -> getters['account/isAdmin']
},
actions: {
	login () { ... } // -> dispatch('account/login')
},
mutations: {
	login () { ... } // -> commit('account/login')
},
*/
