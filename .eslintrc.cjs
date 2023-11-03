module.exports = {
	root: true,
	env: { browser: true, es2020: true },
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:react-hooks/recommended',
		'plugin:prettier/recommended',
		'plugin:security/recommended'
	],
	ignorePatterns: ['dist', '.eslintrc.cjs', '**/*.gen.ts'],
	parser: '@typescript-eslint/parser',
	plugins: ['react-refresh', 'prettier'],
	rules: {
		'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
		'prettier/prettier': 'error',
		'security/detect-object-injection': 'off',
		'@typescript-eslint/ban-ts-comment': ['error', { 'ts-ignore': 'allow-with-description' }]
	}
};
