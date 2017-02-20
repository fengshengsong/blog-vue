var path = require('path');
var conf = require('./conf');
var projectRoot = path.resolve(__dirname, '../');
var glob = require('glob');

var config = {
	entry: {
		main: [
			projectRoot+'/src/main.js',
		],
	},
	output: {
		path: conf.dev.root,
		publicPath: '/',
		filename: '[name].base.js'
	},
	resolve: {
		extensions: ['', '.js', '.vue','.scss','css'],
		fallback: [path.join(__dirname, '../node_modules')],
		alias: {
			'vue$': 'vue/dist/vue.common.js',
			'components': path.resolve(__dirname, '../src/components')
		}
	},
	resolveLoader: {
	  	fallback: [path.join(__dirname, '../node_modules')]
	},
	module: {
		preLoaders: [
			// {
			// 	test: /\.vue$/,
			// 	loader: 'eslint',
			// 	include: projectRoot,
			// 	exclude: /node_modules/
			// },
			// {
			// 	test: /\.js$/,
			// 	loader: 'eslint',
			// 	include: projectRoot,
			// 	exclude: /node_modules/
			// }
		],
		loaders: [
            { 
            	test: /\.html$/, 
            	loader: 'html'
            },		
			{
				test: /\.vue$/,
				loader: 'vue'
			},
			{ 
                test: /\.js$/, 
                loader: 'babel', 
                exclude: /node_modules/, 
                query: {
                    presets: ['es2015']
                }
            },
			{
				test: /\.json$/,
				loader: 'json'
			},
			{
				test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
				loader: 'url',
				query: {
				    limit: 10000
				}
			},
			{
				test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
				loader: 'url',
				query: {
					limit: 10000
				}
			}
		]
  	},
	vue: {
		postcss: [
			require('autoprefixer')({
				browsers: ['last 3 versions']
			})
		]
	}
};

// var files = glob.sync('./src/*.js');
// var newEntries = files.reduce(function(memo,file) {
//     var name = /.\/src\/js\/(.*)\.js/.exec(file)[1];
//     memo[name] = entry(name);
//     return memo
// },{});

// config.entry = Object.assign({},config.entry,newEntries);

// function entry(name){
//     return './src/js/'+name+'.js'
// }

module.exports = config;