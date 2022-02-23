const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              '@primary-color': '#4F23EF',
              '@border-radius-base': '7px',
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
