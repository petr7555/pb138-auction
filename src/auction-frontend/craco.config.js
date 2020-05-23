const CracoLessPlugin = require('craco-less');

module.exports = {
    plugins: [
        {
            plugin: CracoLessPlugin,
            options: {
                lessLoaderOptions: {
                    modifyVars: {
                        '@primary-color': '#E53935',
                        '@body-background': '#2b2b2b',
                        '@border-color-base': '#ffffff',
                        '@font-size-base': '16px'
                    },
                    javascriptEnabled: true,
                },
            },
        },
    ],
};
