require('babel-register')({
    plugins: ['dynamic-import-node', 'css-modules-transform', ['transform-inline-environment-variables', {
            include: [
                'NODE_ENV'
            ]
        }]
    ]
});