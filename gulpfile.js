var gulp = require('gulp'),
    less = require('gulp-less'),
    rename = require('gulp-rename'),
    cleanCss = require('gulp-clean-css'),
    browserSync = require('browser-sync').create();


var paths = {
  less : 'src/less/*.less',
  html: 'index.html'
}

// LESS TASK
gulp.task('less', function() {
  return gulp.src('src/less/main.less')
    .pipe(less())
    .pipe(gulp.dest('dest/css'))
    .pipe(cleanCss())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('dest/css'))
    .pipe(browserSync.stream());
});


// HTML TASK
gulp.task('html', function() {
  return gulp.src(paths.html)
    .pipe(browserSync.stream());
});

// WATCH TASK
gulp.task('watch', function() {
  gulp.watch(paths.less, ['less']);
  gulp.watch(paths.html, ['html']);
});


// BROWSER SYNC TASK
gulp.task('browser-sync', function() {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });
});

// DEFAULT TASK
gulp.task('default',['less', 'browser-sync', 'watch']);