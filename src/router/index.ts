import {
	createRouter,
	createWebHistory,
	RouteRecordRaw,
	RouteLocationNormalized,
} from 'vue-router'

interface Mapping{
	key: string,
	type: StringConstructor | NumberConstructor | BooleanConstructor,
}
function paramsToPropsCaster(mapping: Array<Mapping>) {
	return (route: RouteLocationNormalized) => {
		const nameRouteParam = Object.values(mapping).map((keySet) => {
			if (route.params[keySet.key] === undefined) {
				throw new TypeError(`${keySet.key} not found in route.params`)
			}
			const formatedValue = keySet.type(route.params[keySet.key])
			return [keySet.key, formatedValue]
		})
		const props = Object.fromEntries(nameRouteParam)
		return props
	}
}

const routes: Array<RouteRecordRaw> = [
	{
		component: () => import('@/views/Home.vue'),
		path: '/',
		name: 'Home',
	},
	{
		component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue'),
		path: '/about',
		name: 'About',
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
	},
	{
		component: () => import('@/views/ConetntSelectList.vue'),
		path: '/content/list',
		name: 'ConetntSelectList',
	},
	{
		component: () => import('@/views/ContentViewer.vue'),
		path: '/content/view',
		name: 'ContentViewer',
		props: paramsToPropsCaster([
			{ key: 'contentType', type: Number },
		]),
	},
	{
		component: () => import('@/views/ContentResult.vue'),
		path: '/content/result',
		name: 'ContentResult',
		props: paramsToPropsCaster([
			{ key: 'finishEntryIndex', type: Number },
		]),
	},
]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
})

export default router
