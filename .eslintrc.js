module.exports = {
	root: true,
	env: {
		node: true,
	},
	extends: [
		'plugin:vue/vue3-essential',
		'@vue/airbnb',
		'@vue/typescript/recommended',
	],
	parserOptions: {
		ecmaVersion: 2020,
	},
	rules: {
		'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		'linebreak-style': 0,
		indent: ['error', 'tab'],
		'no-tabs': 0,
		semi: ['error', 'never'],
		'arrow-body-style': ['error', 'as-needed', { requireReturnForObjectLiteral: true }],
		/// /////////////////////////
		// (note you must disable the base rule as it can report incorrect errors)[https://github.com/typescript-eslint/typescript-eslint/issues/2483]
		'@typescript-eslint/no-shadow': ['error'],
		'no-shadow': 'off',
		/// /////////////////////////
	},
	overrides: [
		{
			files: [
				'**/__tests__/*.{j,t}s?(x)',
				'**/tests/unit/**/*.spec.{j,t}s?(x)',
			],
			env: {
				mocha: true,
			},
		},
	],
}
