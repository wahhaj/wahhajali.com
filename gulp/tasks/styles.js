const $ = require('gulp-load-plugins')()
const browserSync = require('browser-sync')
const config = require('../util/loadConfig').styles
const gulp = require('gulp')
const isProduction = require('../util/isProduction')

/**
* Process and automatically prefix scss stylesheets
*/
gulp.task('styles', () => {
  browserSync.notify(config.notification)

  return gulp.src(config.source)
    .pipe($.sourcemaps.init())
    .pipe($.sass({
      includePaths: config.include
    }).on('error', $.sass.logError))
    .pipe($.autoprefixer(config.compatibility))
    .pipe($.if(isProduction, $.cssnano()))
    .pipe($.if(!isProduction, $.sourcemaps.write()))
    .pipe(gulp.dest(config.destination))
    .pipe($.size({ title: 'styles' }))
    .pipe(browserSync.stream()) // Auto-inject css into BrowserSync
})
