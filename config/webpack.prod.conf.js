var conf = require('./conf');
var path = require('path');
var projectRoot = path.resolve(__dirname, '../');
var webpack = require('webpack');
var merge = require('webpack-merge');
var baseWebpackConfig = require('./webpack.base.conf');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CleanWebpack = require('clean-webpack-plugin');

var prodWebpackConfig = merge(baseWebpackConfig, {
	output:{
		path: conf.build.root,
        filename: '[name]-[hash:8].build.js',
	},
	module: {
		loaders:[
            { 
                test: /\.css$/, 
                loader: ExtractTextPlugin.extract('style','css!postcss')
            },
            { 
                test: /\.scss$/, 
                loader: ExtractTextPlugin.extract('style','css!sass')
            },
        ]
	},
    postcss: [
        require('autoprefixer')({
            browsers: ['last 3 versions', '> 1%']
        })
    ],
    vue: {
        autoprefixer: {
            browsers: ['last 3 versions', '> 1%']
        },
        loaders: {
            sass: ExtractTextPlugin.extract('style','css!autoprefixer!sass'),
            css: ExtractTextPlugin.extract('vue-style','css','sass'),
            js: 'babel'
        }
    },
	plugins: [
		new CleanWebpack(['build/*'],{
			root: projectRoot,
			verbose: true,
			dry: false,
			exclude:[]
		}),
		new webpack.ProvidePlugin({
		    $: "jquery",
		    jQuery: "jquery",
		    _: 'underscore',
		}),
		new webpack.NoErrorsPlugin(),
		//查找相等或近似的模块，避免在最终生成的文件中出现重复的模块
		new webpack.optimize.DedupePlugin(),
        new webpack.HotModuleReplacementPlugin(),
		new ExtractTextPlugin('[name]-[hash:8].build.css'),
		new webpack.BannerPlugin('This file is created by fengshengsong.'),
		new webpack.DefinePlugin({}),
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false
			},
			mangle: {
				except: ['$','jQuery','exports','require']
			}
		}),
		new webpack.optimize.OccurrenceOrderPlugin(),
		new HtmlWebpackPlugin({
			template: projectRoot+"/src/index.html",
			inject: true,
			minify: {
				removeComments: true,
				collapseWhitespace: true,
				removeAttributeQuotes: true
			},
			chunksSortMode: 'dependency'
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'common',
			minChunks: 2,
		}),
	] 
})

module.exports = prodWebpackConfig
