var gulp = require('gulp');
var resize = require('gulp-image-resize');
var parallel = require('concurrent-transform');
var debug = require('gulp-debug');
var rename = require('gulp-rename');
var CORES = require('os').cpus().length;
var path = require('path');

function register(paths) {
		var absolutePath = path.resolve(paths);
		console.log('Working on: ' + absolutePath);
    gulp.task('previews', function() {
        return gulp.src([absolutePath + '/*.jpg', absolutePath + '/*.jpeg', absolutePath + '/*.png'])
            .pipe(parallel(resize({
                width: 1500,
                quality: 0.5
            }), CORES))
            .pipe(gulp.dest(absolutePath + '/previews'))
            .pipe(debug({
                title: 'Created'
            }));
    });

    gulp.task('thumbnails', ['previews'], function() {
        return gulp.src([absolutePath + '/previews/*.jpg', absolutePath + '/*.jpeg', absolutePath + '/*.png'])
            .pipe(parallel(resize({
                width: 200
            }), CORES))
            .pipe(gulp.dest(absolutePath + '/thumbs'))
            .pipe(debug({
                title: 'Created'
            }));
    });

		gulp.task('prep', ['previews', 'thumbnails']);
		gulp.start('prep');
}


module.exports = register;
