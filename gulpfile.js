var gulp = require("gulp");
var rename = require("gulp-rename");
var umd = require("gulp-umd");
var watch = require("gulp-watch");


gulp.task('default',['script']);
gulp.task('watch',function(){
    gulp.watch('src/**/*',['script'])
})


gulp.task('script', function () {
    gulp.src('src/*.js')
        .pipe(umd({
            exports: function(file) {
                return 'Validator';
            },
            namespace: function(file) {
                return 'Validator';
            }
        }))
        .pipe(rename({suffix:".min"})) 
        .pipe(gulp.dest('./dist'));
});