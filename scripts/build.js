const path = require('path')
const spawn = require('cross-spawn')
const webpack = require('webpack')

// Normal create-react-app build
spawn.sync('./node_modules/react-scripts/bin/react-scripts.js', ['build'], {
  stdio: 'inherit'
})

// Bundle the mana daemon to use on extension
const config = {
  entry: './src/registerManaConversion.js',
  output: {
    filename: 'register-mana-conversion.js',
    path: path.resolve(process.cwd(), 'build')
  }
}

webpack(config).run((err, stats) => {
  if (err) {
    new Error('[webpack:build] Error:', err)
  }
  console.log(
    '[webpack:build]',
    stats.toString({
      chunks: false, // Makes the build much quieter
      colors: true
    })
  )
})
