var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync');
var spritesmith = require('gulp.spritesmith');
var mincss = require('gulp-minify-css');
var minhtml = require('gulp-minify-html');

gulp.task('html', function() {
  return gulp.src('./html/*.html')
    .pipe(minhtml())
    .pipe(gulp.dest('./'))
    .pipe(browserSync.reload());
});

gulp.task('sass', function() {
  return gulp.src('./scss/styles.scss')
    .pipe(sourcemaps.init())
      .pipe(sass())
      .pipe(sourcemaps.write('./map'))
    .pipe(mincss())
    .pipe(gulp.dest('./css'))
    .pipe(browserSync.reload({ stream:true }));
});

gulp.task('serve', function() {
  browserSync({
    server: {
      baseDir: '.'
    }
  });
	gulp.watch('./scss/*.scss', ['sass']);
  gulp.watch('./img/icons/*.png', ['sprite']);
	gulp.watch('./html/*.html', ['html']);
});

//gulp.task('default', ['serve'], function () {});
