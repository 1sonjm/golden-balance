/* eslint-disable import/first */
import FontAwesomeIcon from '@/plugins/fontAwesomeIcon'
import VCalendar from 'v-calendar'
import logger from '@/plugins/logger'

import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import i18n from './i18n'

const app = createApp(App)

app.provide('globalVariable', {
	url: 'localhost:8080',
})

app.use(router)
	.use(store)
	.use(logger)
	.use(i18n)
	.use(VCalendar)

app.component('FontAwesomeIcon', FontAwesomeIcon)

app.mount('#app')
