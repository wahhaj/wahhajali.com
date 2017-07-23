const config = require('../util/loadConfig').serviceworker
const gulp = require('gulp')
const isProduction = require('../util/isProduction')
const swPrecache = require('sw-precache')

// Copy over the scripts that are used in importScripts as part of the generate-service-worker task.
gulp.task('copy-sw-scripts', () => {
  if (isProduction) {
    return gulp.src([
      'node_modules/sw-toolbox/sw-toolbox.js',
      'app/scripts/sw/runtime-caching.js'
    ])
      .pipe(gulp.dest('dist/scripts/sw'))
  }
})
// See http://www.html5rocks.com/en/tutorials/service-worker/introduction/ for
// an in-depth explanation of what service workers are and why you should care.
// Generate a service worker file that will provide offline functionality for
// local resources. This should only be done for the 'dist' directory, to allow
// live reload to work as expected when serving from the 'app' directory.
gulp.task('generate-service-worker', ['copy-sw-scripts'], () => {
  if (isProduction) {
    const rootDir = 'dist'
    const filepath = `${rootDir}/service-worker.js`

    return swPrecache.write(filepath, {
      // Used to avoid cache conflicts when serving on localhost.
      cacheId: config.cacheId,
      // sw-toolbox.js needs to be listed first. It sets up methods used in runtime-caching.js.
      importScripts: [
        'scripts/sw/sw-toolbox.js',
        'scripts/sw/runtime-caching.js'
      ],
      staticFileGlobs: config.staticFiles,
      // Translates a static file path to the relative URL that it's served from.
      // This is '/' rather than path.sep because the paths returned from
      // glob always use '/'.
      stripPrefix: rootDir + '/'
    })
  }
})
