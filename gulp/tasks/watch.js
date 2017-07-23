const browserSync = require('browser-sync')
const config = require('../util/loadConfig')
const gulp = require('gulp')

/**
* Watch files for changes, recompile/rebuild and reload the browser
*/
gulp.task('watch', function() {
  gulp.watch(config.copy.source, ['copy', browserSync.reload])
  gulp.watch(config.html.source, ['html', browserSync.reload])
  gulp.watch(config.images.source, ['images', browserSync.reload])
  gulp.watch(config.scripts.source, ['scripts', browserSync.reload])
  gulp.watch(config.styles.source, ['styles'])
})
