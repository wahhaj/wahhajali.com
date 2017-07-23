const $ = require('gulp-load-plugins')()
const browserSync = require('browser-sync')
const config = require('../util/loadConfig').scripts
const gulp = require('gulp')
const isProduction = require('../util/isProduction')

gulp.task('lint', () =>
  gulp.src(config.source)
    .pipe($.eslint())
    .pipe($.eslint.format())
    // .pipe($.if(!browserSync.active, $.eslint.failAfterError()))
)

/**
* Concatenate and minify JavaScript files
*/
gulp.task('scripts', ['lint'], () => {
  browserSync.notify(config.notification)

  return gulp.src(config.source)
    .pipe($.sourcemaps.init())
    .pipe($.babel())
    .pipe($.concat(config.filename))
    .pipe($.if(isProduction, $.uglify({ mangle: false })))
    .pipe($.if(!isProduction, $.sourcemaps.write()))
    .pipe(gulp.dest(config.destination))
    .pipe($.size({ title: 'scripts' }))
})
