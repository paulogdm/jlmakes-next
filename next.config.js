module.exports = phase => {
  if (process.env.NOW_REGION) {
    return {'target': 'serverless'};
  }

  const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');
  const analyzer = {
    analyzerMode: 'server',
    analyzerPort: 8888,
    openAnalyzer: true,
  };

  return {
    webpack: config => {
      if (process.env.analyze) {
        config.plugins.push(new BundleAnalyzerPlugin(analyzer));
      }
      return config;
    }
  };
};