const gulp = require('gulp')
const pagespeed = require('psi')

gulp.task('pagespeed', (done) =>
  // Update the below URL to the public URL of your site
  pagespeed.output('wahhajali.com', {
    strategy: 'mobile'
    // By default we use the PageSpeed Insights free (no API key) tier.
    // Use a Google Developer API key if you have one: http://goo.gl/RkN0vE
    // key: 'YOUR_API_KEY'
  }, done)
)
