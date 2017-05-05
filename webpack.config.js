var webpack = require( 'webpack' );

module.exports = {
	entry: './src/index.jsx',
	// output: {
	// 	App: [
	// 		'webpack-dev-server/client?http://localhost:4001',
	// 		'webpack/hot/only-dev-server',
	// 		'./index.jsx'
	// 	]
	// },
	output: {
		filename: 'bundle.js'
	},
	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				loaders: [ 'babel-loader' ]
			},
			{
				test: /\.json$/,
				loader: 'json-loader'
			},
			{
				test: /\.sass$/,
				exclude: /node_modules/,
				loaders: [ 'style', 'css', 'sass' ]
			}
		]
	},
	plugins: [
		new webpack.NoErrorsPlugin(),
		new webpack.ProvidePlugin( {
			'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
		})
	],
	resolve: {
		modulesDirectories: [ '', 'lib', 'node_modules' ],
		extensions: [ '', '.js', '.jsx' ]
	},
  devtool: 'sourcemap'
};
