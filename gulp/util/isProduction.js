const argv = require('yargs').argv

// Check for --production flag
const isProduction = !!argv.production

module.exports = isProduction
