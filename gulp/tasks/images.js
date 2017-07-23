const $ = require('gulp-load-plugins')()
const browserSync = require('browser-sync')
const config = require('../util/loadConfig').images
const gulp = require('gulp')
/**
* Optimize image files
*/
gulp.task('images', () => {
  browserSync.notify(config.notification)

  return gulp.src(config.source)
    .pipe($.imagemin([
      $.imagemin.gifsicle({ interlaced: true }),
      $.imagemin.jpegtran({ progressive: true }),
      $.imagemin.optipng({ optimizationLevel: 5 }),
      $.imagemin.svgo({ plugins: [{ removeViewBox: true }]})
    ], {
      verbose: true
    }))
    .pipe(gulp.dest(config.destination))
    .pipe($.size({ title: 'images' }))
})
