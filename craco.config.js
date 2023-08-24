const CracoAlias = require('craco-alias');

module.exports = {
    devServer: {
        proxy: {
            '/dev': {
                target: 'http://127.0.0.1:18004/',
                changeOrign: true,
                pathRewrite: {
                    "^/dev": ''
                }
            },
            '/mac': {
                target: 'http://127.0.0.1:14001/',
                changeOrign: true,
                pathRewrite: {
                    "^/mac": ''
                }
            },
            '/house': {
                target: 'http://192.168.0.103:14001/',
                changeOrign: true,
                pathRewrite: {
                    "^/house": ''
                }
            }
        }
    },
    plugins: [
        {
            plugin: CracoAlias,
            options: {
                source: 'tsconfig',
                baseUrl: './src',
                tsConfigPath: './tsconfig.extend.json'
            }
        },
    ]
};