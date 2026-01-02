import withNuxt from './.nuxt/eslint.config.mjs';

export default withNuxt(
    {
        rules: {
            'semi': ['error', 'always'],
            'semi-spacing': ['error', { before: false, after: true }],
            'semi-style': ['error', 'last'],
            'no-extra-semi': 'error',
            'no-unexpected-multiline': 'error',
        }
    }
);
