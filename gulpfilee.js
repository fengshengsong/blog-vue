var gulp = require('gulp');
var gutil = require('gulp-util');
var webpack = require("webpack");
var gw = require('gulp-webpack');

var WebpackDevServer = require('webpack-dev-server');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var watch = require('gulp-watch');
var clean = require('gulp-clean');
var connect = require('gulp-connect');
var autoprefixer = require('gulp-autoprefixer');
var cleanCss = require('gulp-clean-css');
var sourcemaps = require('gulp-sourcemaps');
var cache = require('gulp-cache');
var jshint = require('gulp-jshint');
var imagemin = require('gulp-imagemin');
var spritesmith = require('gulp.spritesmith');
var browserSync = require('browser-sync');

var path = {
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

function test(){
    console.log('test');
}
gulp.task(test);

function htmlDist(){
    return gulp.src(path.src.html+'*.html')
            .pipe(gulp.dest(path.dist.html))
}
gulp.task(htmlDist);

function htmlBin(){
    return gulp.src(path.src.html+'*.html')
            .pipe(gulp.dest(path.bin.html))
}
gulp.task(htmlBin);

function jsDist(){
    return gulp.src(path.src.js+'*.js')
            .pipe(concat('main.js'))
            .pipe(gulp.dest(path.dist.js));
}
gulp.task(jsDist);

function jsBin(){
    return gulp.src(path.src.js+'*.js')
            .pipe(concat('main.js'))
            .pipe(uglify())
            .pipe(rename({suffix: '.min'}))
            .pipe(gulp.dest(path.bin.js));
}
gulp.task(jsBin);

function sassDist(){
    return gulp.src(path.src.style+'*.scss')
            .pipe(sass())
            .pipe(autoprefixer({
                browsers:['last 3 version','> 1%', 'not ie <= 8']
            }))
            .pipe(gulp.dest(path.dist.style));
}
gulp.task(sassDist);

function sassBin(){
    return gulp.src(path.src.style+'*.scss')
            .pipe(sass())
            .pipe(autoprefixer({
                browsers:['last 3 version','> 1%', 'not ie <= 8']
            }))
            .pipe(cleanCss())
            .pipe(rename({suffix: '.min'}))
            .pipe(gulp.dest(path.bin.style));
}
gulp.task(sassBin);

function imageDist(){
    return gulp.src(path.src.image+'*')
            .pipe(imagemin())
            .pipe(gulp.dest(path.dist.image));
}
gulp.task(imageDist);

function imageBin(){
    return gulp.src(path.src.image+'*')
            .pipe(imagemin())
            .pipe(gulp.dest(path.bin.image));
}
gulp.task(imageBin);

function cleanDist(){
    return gulp.src(path.dist.root+'*')
            .pipe(clean());
}
gulp.task(cleanDist);

function cleanBin(){
    return gulp.src(path.bin.root+'*')
            .pipe(clean());
}
gulp.task(cleanBin);

gulp.task('all',gulp.series(gulp.parallel(cleanBin,cleanDist),
    gulp.parallel(jsDist,jsBin,sassBin,sassDist,imageDist,imageBin))); 
gulp.task('dist',gulp.series(cleanDist,gulp.parallel(jsDist,sassDist,imageDist)));
gulp.task('bin',gulp.series(cleanBin,gulp.parallel(jsBin,sassBin,imageBin)));



function htmlWatch(){
    return gulp.src(path.dist.html+'*.html')
            .pipe(connect.reload());
}
gulp.task(htmlWatch);
function styleWatch(){
    return gulp.src(path.dist.style+'*.css')
            .pipe(connect.reload());
}
gulp.task(styleWatch);
function jsWatch(){
    return gulp.src(path.dist.js+'*.js')
            .pipe(connect.reload());
}
gulp.task(jsWatch);


gulp.task('server',gulp.series(function createServer(done){
    connect.server({
        root: 'dev',
        livereload: true
    });
    var jsWatcher = gulp.watch(path.src.js+'*.js',gulp.series(gulp.parallel(jsDist,jsBin),jsWatch));
    var styleWatcher = gulp.watch(path.src.style+'*.scss',gulp.series(gulp.parallel(sassDist,sassBin),styleWatch));
    var htmlWatcher = gulp.watch(path.src.html+'*.html',gulp.series(gulp.parallel(htmlDist,htmlBin),htmlWatch));
    var imgWatcher = gulp.watch(path.src.image+'*',gulp.parallel(imageDist,imageBin));
    done();

}));

function spriteDist(){
    return gulp.src(path.src.image+'*')
            .pipe(spritesmith({
                imgName:'sprite.dist.png',
                cssName:'sprite.dist.css'
            }))
            .pipe(gulp.dest(path.dist.image));
}
gulp.task(spriteDist);

function spriteBin(){
    return gulp.src(path.src.image+'*')
            .pipe(spritesmith({
                imgName:'sprite.bin.png',
                cssName:'sprite.bin.css'
            }))
            .pipe(gulp.dest(path.bin.image));
}
gulp.task(spriteBin);

// 等同于browser-sync start --server --files "**"
function browsersync(){
    browserSync({
        files: "**",
        server: {
            baseDir: "./"
        }
    });
}
gulp.task(browsersync);


// gulp & webpack


function webpackDev(){
    return gulp.src('./src/js/index.js')
                .pipe(shell([
                    'webpack --config webpack.config.js'    
                ]));
    
}
gulp.task(webpackDev);

function wp() {

};
gulp.task(wp);

var webpackBaseConfig = require("./config/webpack.base.conf");
var webpackDevConfig = require("./config/webpack.dev.conf");
var webpackConfig = require("./webpack.config");

gulp.task('webb',function(cb){
    webpack(webpackDevConfig,function(err, stats){
        cb();
        // console.log(webpackDevConfig)
    });
});

gulp.task('webpack:dev-server',function(){
    var webpackServerConfig = Object.create(webpackDevConfig)
    webpackServerConfig.entry.main.unshift('webpack-dev-server/client?http://localhost:8080','webpack/hot/dev-server');
    var compiler = webpack(webpackServerConfig)
    new WebpackDevServer(compiler,{
        contentBase: './src',
        historyApiFallback: false,
        lazy: false,
        hot: true,
        inline: true,
        colors: true,
    }).listen(8080, 'localhost', function (err) {
        if (err) throw new gutil.PluginError('webpack-dev-server', err)
        gutil.log('[webpack-dev-server]', 'http://localhost:8080/')
    });
})