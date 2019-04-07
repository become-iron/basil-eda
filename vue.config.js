const CopyPlugin = require('copy-webpack-plugin')

module.exports = {
  configureWebpack: {
    plugins: [
      new CopyPlugin([
        { from: 'node_modules/mxgraph/javascript/src', to: 'assets/mxgraph' }
      ])
    ]
  }
}
