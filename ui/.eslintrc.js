module.exports = {
    extends: ['airbnb-typescript', 'prettier'],
    parserOptions: {
        project: './tsconfig.json',
    },
    plugins: ['unicorn'],
    rules: {
        '@typescript-eslint/no-explicit-any': 'warn',
        'max-len': [
            'error',
            {
                code: 100,
                ignoreComments: true,
                ignoreStrings: true,
            },
        ],
        'unicorn/filename-case': [
            'error',
            {
                case: 'camelCase',
            },
        ],
        'eol-last': ['error', 'always'],
        'react/require-default-props': ['off'],
        'react/jsx-props-no-spreading': [
            'error',
            {
                custom: 'ignore',
            },
        ],
        quotes: ['error', 'single', { avoidEscape: true, allowTemplateLiterals: true }],
        'no-unused-expressions': 'off',
        '@typescript-eslint/no-unused-expressions': ['error', { allowShortCircuit: true }],
        'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
        'react/jsx-uses-react': 'off',
        'react/react-in-jsx-scope': 'off',
    },
};
