var gulp = require("gulp");
var rename = require("gulp-rename");
var uglify = require('gulp-uglify');
var gzip = require('gulp-gzip')
var gutil = require('gulp-util');
var umd = require("gulp-umd");
var watch = require("gulp-watch");


gulp.task('default',['build']);
gulp.task('watch',function(){
    gulp.watch('src/**/*',['build'])
})


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
        .pipe(gulp.dest('./dist/'));

});