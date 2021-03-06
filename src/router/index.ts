import {
	createRouter,
	createWebHistory,
	RouteRecordRaw,
	RouteLocationNormalized,
} from 'vue-router'

interface Mapping{
	key: string,
	type: StringConstructor | NumberConstructor | BooleanConstructor,
	default?: string | number | boolean,
}
function paramsToPropsCaster(query: Array<Mapping>, params: Array<Mapping>) {
	return (route: RouteLocationNormalized) => {
		const nameRouteQuery = Object.values(query).map((keySet) => {
			if (route.params[keySet.key] === undefined) {
				if (keySet.default !== undefined) {
					return [keySet.key, keySet.type(keySet.default)]
				}
			}

			return [keySet.key, keySet.type(route.params[keySet.key])]
		})

		const nameRouteParam = Object.values(params).map((keySet) => {
			if (route.params[keySet.key] === undefined) {
				if (keySet.default === undefined) {
					throw new TypeError(`"${keySet.key}" not have default value of route.params`)
				} else {
					return [keySet.key, keySet.type(keySet.default)]
				}
			}

			return [keySet.key, keySet.type(route.params[keySet.key])]
		})

		const props = Object.fromEntries(Object.assign(nameRouteParam, nameRouteQuery))
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
		props: paramsToPropsCaster(
			[
				{ key: 'id', type: Number },
				{ key: 'contentType', type: Number },
			],
			[],
		),
	},
	{
		component: () => import('@/views/ContentResult.vue'),
		path: '/content/result',
		name: 'ContentResult',
		props: paramsToPropsCaster(
			[],
			[
				{ key: 'finishEntryIndex', type: Number, default: -1 },
			],
		),
	},
]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
})

export default router
