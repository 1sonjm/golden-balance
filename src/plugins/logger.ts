// https://www.npmjs.com/package/vue-logger-plugin
import { createLogger } from 'vue-logger-plugin'

const logger = createLogger({
	enabled: true,
	level: 'debug',
	beforeHooks: [
	],
	afterHooks: [
	],
})

export default logger
