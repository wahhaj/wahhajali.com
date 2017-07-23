const config = require('../util/loadConfig').clean
const del = require('del')
const gulp = require('gulp')

gulp.task('clean', (done) => {
  del(config)
  done()
})
