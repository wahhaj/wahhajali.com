const $ = require('gulp-load-plugins')()
const browserSync = require('browser-sync')
const config = require('../util/loadConfig').html
const gulp = require('gulp')
const isProduction = require('../util/isProduction')

/**
* Minify HTML files
*/
gulp.task('html', () => {
  browserSync.notify(config.notification)

  return gulp.src(config.source)
    // Minify any HTML
    .pipe($.if(isProduction, $.htmlmin({
      removeComments: true,
      collapseWhitespace: true,
      collapseBooleanAttributes: true,
      removeAttributeQuotes: true,
      removeRedundantAttributes: true,
      removeEmptyAttributes: true,
      removeScriptTypeAttributes: true,
      removeStyleLinkTypeAttributes: true,
      removeOptionalTags: true
    })))
    // Output files
    .pipe($.size({ title: 'html', showFiles: true }))
    .pipe(gulp.dest(config.destination))
})
