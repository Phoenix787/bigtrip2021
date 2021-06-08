const path = require('path');
const { webpack } = require('webpack');

module.exports = {
  entry: './src/main.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public'),
  },
  devtool: 'source-map',
	devServer: {
		contentBase: path.resolve(__dirname, 'public'),
		port: 9000,
		watchContentBase: true,
		hot: true,
	},
	
};
