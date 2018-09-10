const path = require('path')
const marked = require("marked")
const HtmlWebpackPlugin = require('html-webpack-plugin')
const renderer = new marked.Renderer()
module.exports = (env, arguments) => {
  return {
    mode: 'development',
    context: path.resolve(path.dirname(__dirname), 'doc'),
    entry: {
      main: './main/index.js'
    },
    output: {
      path: path.resolve(path.dirname(__dirname), 'docDist'),
      filename: '[name].[hash].js'
    },
    module: {
      rules: [{
        test: /\.md$/,
        use: [{
          loader: 'html-loader'
        }, {
          loader: 'markdown-loader',
          options: {
            pedantic: true,
            renderer
          }
        }]
      }]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: '../doc/main/index.html',
        filename: 'main.html',
        chunks: 'main',
        inject: true
      })
    ]
  }
}
