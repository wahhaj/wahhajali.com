'use strict'

const requireDir = require('require-dir')

try {
  // Require all tasks in gulp/tasks, including subfolders
  requireDir('./gulp/tasks', { recurse: true })
} catch (err) {
  console.error(err)
}
