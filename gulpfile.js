var gulp = require('gulp');
var streamqueue = require("streamqueue");
var clean = require('gulp-clean');
var concat = require('gulp-concat');
var htmlreplace = require('gulp-html-replace');
var minifyCSS = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
var webserver = require('gulp-webserver');

var sourcePaths = {
    html: ['index.html'],
    css: ['assets/css/*.css', 'assets/css/**/*.css'],
    vendor: ['vendor/jquery/*.js', 'vendor/angularjs/angular.js', 'vendor/**/*.js'],
    app: ['app/modules/*.js', 'app/config/*.js', 'app/services/*.js', 'app/**/*.js'],
    partials: ['app/partials/*.html', 'app/partials/**/*.html'],
    assets: ['assets/fonts/*', 'assets/fonts/**/*', 'assets/images/*', 'assets/images/**/*']
};

var buildPaths = {
    dist: 'dist',
    jsFolder: 'js',
    jsFile: 'all.min.js',
    cssFolder: 'assets/css',
    cssFile: 'all.min.css',
    assetsFolder: 'assets'
};

gulp.task('clean', function () {
    return gulp.src(buildPaths.dist)
        .pipe(clean())
});

gulp.task('html', function () {
    return gulp.src(sourcePaths.html)
        .pipe(htmlreplace({
            css: buildPaths.cssFolder + '/' + buildPaths.cssFile,
            js: buildPaths.jsFolder + '/' + buildPaths.jsFile
        }))
        .pipe(gulp.dest(buildPaths.dist))
});

gulp.task('css', function () {
    return gulp.src(sourcePaths.css)
        .pipe(concat(buildPaths.cssFile))
        .pipe(minifyCSS())
        .pipe(gulp.dest(buildPaths.dist + '/' + buildPaths.cssFolder))
});

gulp.task('js', function () {
    return new streamqueue({ objectMode: true }).queue(
        gulp.src(sourcePaths.vendor),
        gulp.src(sourcePaths.app)
            .pipe(jshint())
            .pipe(jshint.reporter('default')) // Log errors
            .pipe(jshint.reporter('fail')) // Fail build
    )
        .done()
        .pipe(concat(buildPaths.jsFile))
        .pipe(uglify())
        .pipe(gulp.dest(buildPaths.dist + '/' + buildPaths.jsFolder));
});

gulp.task('assets', function () {
    return new streamqueue({ objectMode: true }).queue(
        gulp.src(sourcePaths.assets, {base: './'}),
        gulp.src(sourcePaths.partials, {base: './'})
    )
        .done()
        .pipe(gulp.dest(buildPaths.dist));
});

gulp.task('webserver', function () {
    gulp.src(buildPaths.dist)
        .pipe(webserver({
            port: 8080,
            fallback: 'index.html',
            open: true
        }));
});

gulp.task('default', ['html', 'css', 'js', 'assets', 'webserver']);