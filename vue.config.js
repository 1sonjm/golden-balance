module.exports = {
	publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',
	pluginOptions: {
		i18n: {
			locale: 'ko',
			fallbackLocale: 'ko',
			localeDir: 'locales',
			enableLegacy: false,
			runtimeOnly: false,
			compositionOnly: false,
			fullInstall: true,
		},
	},
}
