const gulp = require('gulp')
const sequence = require('run-sequence')

gulp.task('build', ['clean'], (done) =>
  sequence(
    'styles',
    ['html', 'scripts', 'images', 'copy'],
    'generate-service-worker',
    done
  )
)
