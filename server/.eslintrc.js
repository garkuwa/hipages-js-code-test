module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: 'tsconfig.json',
        sourceType: 'module',
    },
    plugins: ['@typescript-eslint/eslint-plugin', 'unicorn'],
    extends: ['plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended'],
    root: true,
    env: {
        node: true,
        jest: true,
    },
    ignorePatterns: ['.eslintrc.js'],
    rules: {
        'max-len': [
            'error',
            {
                code: 100,
                ignoreComments: true,
                ignoreStrings: true,
            },
        ],
        'eol-last': ['error', 'always'],
        'no-nested-ternary': ['off'],
        quotes: ['error', 'single', { avoidEscape: true, allowTemplateLiterals: true }],
        'no-unused-expressions': 'off',
        '@typescript-eslint/no-unused-expressions': ['error', { allowShortCircuit: true }],
        'max-classes-per-file': 'off',
        'class-methods-use-this': 'off',
        "no-unused-vars": "off",
        "@typescript-eslint/no-unused-vars": ["error"],
        'unicorn/filename-case': [
            'error',
            {
                case: 'camelCase',
            },
        ],
    },
};
