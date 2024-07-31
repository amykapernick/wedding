import eslintImport from 'eslint-plugin-import';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import prettierConfig from 'eslint-plugin-prettier/recommended';
import prettierDefaults from './prettier.config.cjs';

export default [
	prettierConfig,
	{
		files: [`*.js`, `*.jsx`, `*.ts`, `*.tsx`],
		ignores: [`node_modules`, `dist`, '.next'],
		plugins: {
			'import': eslintImport,
			'jsx-a11y': jsxA11y,
		},
		rules: {
			'prettier/prettier': [
				'error',
				{
					...prettierDefaults,
				},
				{
					usePrettierrc: true,
				},
			],
			'linebreak-style': 0,
			'no-tabs': 0,
			'camelcase': 0,
			'indent': [
				`error`,
				`tab`,
				{
					SwitchCase: 1,
					VariableDeclarator: 1,
				},
			],
			'arrow-spacing': [`error`, { before: true, after: true }],
			'comma-dangle': [
				`error`,
				{
					objects: `only-multiline`,
					arrays: `only-multiline`,
					imports: `never`,
					exports: `never`,
					functions: `never`,
				},
			],
			'no-var': `error`,
			'no-unused-vars': 1,
			'one-var': ['error', 'never'],
			'quotes': [`error`, `backtick`],
			'no-param-reassign': 0,
			'class-methods-use-this': 0,
			'import/order': [
				'error',
				{
					groups: [
						'builtin',
						'external',
						'internal',
						'parent',
						'sibling',
						'index',
						'object',
						'type',
					],
				},
			],
		},
	},
];
