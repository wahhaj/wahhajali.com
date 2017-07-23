const gulp = require('gulp')
const sequence = require('run-sequence')

gulp.task('serve', (done) =>
  sequence('build', 'browser-sync', 'watch', done)
)
