var gulp = require("gulp");
var rename = require("gulp-rename");
var uglify = require('gulp-uglify');
var gzip = require('gulp-gzip')
var gutil = require('gulp-util');
var umd = require("gulp-umd");
var watch = require("gulp-watch");
var banner = require("gulp-banner");

var pkg = require('./package.json')
gulp.task('default',['build']);
gulp.task('watch',function(){
    gulp.watch('src/**/*',['build'])
})

var comment = '/*\n' +
    ' * <%= pkg.name %> <%= pkg.version %>\n' +
    ' * <%= pkg.description %>' +
    '\n * <%= pkg.homepage %>' +
    '\n * Copyright 2015, <%= pkg.author %>' +
    '\n * Released under the <%= pkg.license %> license.\n' +
    '*/\n';

gulp.task('build', function () {

    // 压缩成 validator.min.js
    gulp.src('src/*.js')
        .pipe(umd({
            exports: function(file) {
                return 'Validator';
            },
            namespace: function(file) {
                return 'Validator';
            }
        }))
        .pipe(uglify({
            mangle: true,
            output:{
                comments:false
            }
        }).on('error',gutil.log))
        .pipe(banner(comment, {
            pkg: pkg
        }))
        .pipe(rename({suffix:".min"})) 
        .pipe(gulp.dest('./dist'));

    // 生成 validator.js
    gulp.src('src/*.js')
        .on('error',gutil.log)
        .pipe(umd({
            exports: function(file) {
                return 'Validator';
            },
            namespace: function(file) {
                return 'Validator';
            }
        }))
        .pipe(banner(comment, {
            pkg: pkg
        }))
        .pipe(gulp.dest('./dist/'));

});