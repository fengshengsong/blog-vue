var gulp = require('gulp');
var gutil = require('gulp-util');
var webpack = require("webpack");
var del = require('del');
var GulpWebpack = require('gulp-webpack');
var WebpackDevServer = require('webpack-dev-server');

const PATH = {
    src: {
        root: './src/',
        html: './src/',
        js: './src/js/',
        style: './src/style/',
        image: './src/image/' 
    },
    dev: {
        root: './dev/',
        html: './dev/',
        js: './dev/js/',
        style: './dev/style/',
        image: './dev/image/' 
    },
    build: {
        root: './build/',
        html: './build/',
        js: './build/js/',
        style: './build/style/',
        image: './build/image/'
    }
};

var webpackBaseConfig = require("./config/webpack.base.conf");
var webpackDevConfig = require("./config/webpack.dev.conf");
var webpackProdConfig = require("./config/webpack.prod.conf");

function webpackDevServer(){
    var webpackServerConfig = Object.create(webpackDevConfig);
    webpackServerConfig.entry.main.unshift('webpack-dev-server/client?http://localhost:8080',
        'webpack/hot/dev-server');
    var compiler = webpack(webpackServerConfig);
    new WebpackDevServer(compiler,{
        contentBase: './src',
        colors: true,
        historyApiFallback: true,
        inline: true,
        hot: true,
        lazy:false,
    }).listen(8080, 'localhost', function (err) {
        if (err) throw new gutil.PluginError('webpack-dev-server', err)
        gutil.log('[webpack-dev-server]', 'http://localhost:8080/')
    });
}
gulp.task(webpackDevServer);

function webpackDev(callback){
    webpack(webpackDevConfig,function(err, stats){
        callback();
    });
}
gulp.task(webpackDev);

function webpackCleanDev(){
    return del([PATH.dev.root+'*']);
}
gulp.task(webpackCleanDev);

function webpackBuild(callback){
    webpack(webpackProdConfig,function(err, stats){
        callback();
    });
}
gulp.task(webpackBuild);

function webpackCleanBuild(){
    return del([PATH.build.root+'*']);
}
gulp.task(webpackCleanBuild);

gulp.task('webpack:dev',gulp.series(webpackCleanDev,webpackDev,function(callback){
    callback();
}));

gulp.task('webpack:dev-server',gulp.series(webpackCleanDev,webpackDevServer,function(callback){
    callback();
}));

gulp.task('webpack:build',gulp.series(webpackCleanBuild,webpackBuild,function(callback){
    callback();
}));