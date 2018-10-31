const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');

const analyzer = new BundleAnalyzerPlugin({
  analyzerMode: 'server',
  analyzerPort: 8888,
  openAnalyzer: true,
});

module.exports = {
  webpack(config) {
    if (process.env.analyze) {
      config.plugins.push(analyzer);
    }

    return config;
  },
};
