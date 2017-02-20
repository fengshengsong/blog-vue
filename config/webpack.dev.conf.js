var conf = require('./conf');
var path = require('path');
var projectRoot = path.resolve(__dirname, '../');
var webpack = require('webpack');
var webpackDevServer = require('webpack-dev-server');
var merge = require('webpack-merge');
var baseWebpackConfig = require('./webpack.base.conf');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CleanWebpack = require('clean-webpack-plugin');

var devWebpackConfig = {
	output:{
		path: conf.dev.root,
        publicPath:'/',
        filename: '[name].dev.js',
	},
	devtool: '#eval-source-map',
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
        new CleanWebpack(['dev/*'],{
            root: projectRoot,
            verbose: true,
            dry: false,
            exclude:[]
        }),
		new HtmlWebpackPlugin({
			template: projectRoot+"/src/index.html",
		}),
        // new webpack.HotModuleReplacementPlugin(),
		new ExtractTextPlugin('[name].dev.css'),
		new webpack.BannerPlugin('This file is created by fengshengsong.')
	],
    devServer: {
        contentBase: projectRoot+"/src",
        colors: true,
        historyApiFallback: true,
        inline: true,
        hot: true,
        lazy:false,
    }
};

module.exports = merge(baseWebpackConfig,devWebpackConfig);
