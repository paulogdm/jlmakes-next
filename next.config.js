const { PHASE_PRODUCTION_SERVER } =
  process.env.NODE_ENV === 'development'
    ? {}
    : !process.env.NOW_REGION
    ? require('next/constants')
    : require('next-server/constants');

module.exports = phase => {
  if (phase === PHASE_PRODUCTION_SERVER) {
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