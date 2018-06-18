const spawn = require('cross-spawn')
const webpack = require('webpack')
const config = require('react-scripts/config/webpack.config.prod.js')

function runBuildScript() {
  const result = spawn.sync('npm', ['run', 'build'], { stdio: 'inherit' })
  if (result.signal) {
    if (result.signal === 'SIGKILL') {
      console.log(
        'The build failed because the process exited too early. ' +
          'This probably means the system ran out of memory or someone called ' +
          '`kill -9` on the process.'
      )
    } else if (result.signal === 'SIGTERM') {
      console.log(
        'The build failed because the process exited too early. ' +
          'Someone might have called `kill` or `killall`, or the system could ' +
          'be shutting down.'
      )
    }
    process.exit(1)
  }
}

webpack(config).watch({}, (err, stats) => {
  if (err) {
    console.error(err)
  } else {
    runBuildScript()
  }
  console.error(
    stats.toString({
      chunks: false,
      colors: true
    })
  )
})
