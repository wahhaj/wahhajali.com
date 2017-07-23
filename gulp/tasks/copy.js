const $ = require('gulp-load-plugins')()
const browserSync = require('browser-sync')
const config = require('../util/loadConfig').copy
const gulp = require('gulp')

gulp.task('copy', () => {
  browserSync.notify(config.notification)

  return gulp.src(config.source, { dot: true })
    .pipe(gulp.dest(config.destination))
    .pipe($.size({ title: 'copy' }))
})
