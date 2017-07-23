const browserSync = require('browser-sync')
const config = require('../util/loadConfig').browsersync
const gulp = require('gulp')

gulp.task('browser-sync', () =>
  browserSync.init({
    notify: config.notify,
    open: config.open,
    port: config.port,
    server: {
      baseDir: config.server.basedir
    },
    xip: config.xip
  })
)
