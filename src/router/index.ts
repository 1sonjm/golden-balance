import {
	createRouter,
	createWebHistory,
	RouteRecordRaw,
	RouteLocationNormalized,
} from 'vue-router'
import Home from '../views/Home.vue'

const routes: Array<RouteRecordRaw> = [
	{
		path: '/',
		name: 'Home',
		component: Home,
	},
	{
		path: '/about',
		name: 'About',
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
	},
	{
		path: '/content/list',
		name: 'ConetntSelectList',
		component: () => import('../views/ConetntSelectList.vue'),
	},
	{
		path: '/content/view',
		name: 'ContentViewer',
		component: () => import('../views/ContentViewer.vue'),
	},
	{
		path: '/content/result',
		name: 'ContentResult',
		component: () => import('../views/ContentResult.vue'),
	},
]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
})

export default router
