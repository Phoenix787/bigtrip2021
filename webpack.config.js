const path = require('path');

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, './public'),
    filename: 'bundle.js',
  },
  devtool: 'source-map',
	devServer: {
		contentBase: path.resolve(__dirname, './public'),
		port: 9000,
		watchContentBase: true,
		hot: true,
	},
	module: {
		rules: [
			{ 
				test: /\.css$/i,
				use: ['style-loader', 'css-loader']
			}
		]
	}
	
};
