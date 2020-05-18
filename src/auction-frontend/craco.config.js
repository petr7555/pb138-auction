import CracoLessPlugin from 'craco-less';

module.exports = {
    plugins: [
        {
            plugin: CracoLessPlugin,
            options: {
                lessLoaderOptions: {
                    modifyVars: {'@primary-color': '#E53935'},
                    javascriptEnabled: true,
                },
            },
        },
    ],
};
