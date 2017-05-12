#!/usr/bin/env node

var gulp = require('gulp');
var resize = require('gulp-image-resize');
var parallel = require('concurrent-transform');
var debug = require('gulp-debug');
var rename = require('gulp-rename');
var CORES = require('os').cpus().length;
var path = require('path');
var photoLocation = path.resolve(process.argv[process.argv.length - 1]);
console.log('Working on: ' + photoLocation);

gulp.task('previews', function() {
  return gulp.src([photoLocation + '/*.jpg', photoLocation + '/*.jpeg', photoLocation + '/*.png'])
    .pipe(parallel(resize({width:1500, quality: 0.5}), CORES))
    .pipe(gulp.dest(photoLocation + '/previews'))
    .pipe(debug({title: 'Created'}));
});

gulp.task('thumbnails', ['previews'], function() {
  return gulp.src([photoLocation + '/previews/*.jpg', photoLocation + '/*.jpeg', photoLocation + '/*.png'])
    .pipe(parallel(resize({width:200}), CORES))
    .pipe(gulp.dest(photoLocation + '/thumbs'))
    .pipe(debug({title: 'Created'}));
});

gulp.task('prep', ['previews', 'thumbnails']);

module.exports = function() {
	gulp.start('prep');
}
