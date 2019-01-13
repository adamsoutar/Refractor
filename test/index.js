const app = require('express')()
const Refractor = require('../index.js')

app.use(Refractor.static({
  path: '/www',
  '404URL': '404.html',

  config: {
    firefox: {
      Firefox: 0
    },
    chrome: {
      Chrome: 0
    }
  }
}))

// app.use(Refractor.static('/www'))

app.listen(3000, console.log('Refractor test server listening on 3000'))
