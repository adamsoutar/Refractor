/*
  Refractor
  Don't send *larger* Babel versions of your scripts when you don't need to!
  Detects if the user-agent supports ES6 and sends non-Babel scripts

  Adam Soutar
  MIT License
  https://github.com/Adybo123
*/
const path = require('path')
const fs = require('fs')
const uaParser = require('ua-parser-js')

const configPath = path.join(__dirname, 'config.json')
const config = JSON.parse(fs.readFileSync(configPath))

function determineFile (localPath, userAgent, specificConfig) {
  // Do we have Refractor versions to send?
  const esVersions = Object.keys(specificConfig)
  const agent = uaParser(userAgent)
  for (let eV of esVersions) {
    let base = path.basename(localPath, path.extname(localPath))
    let fP = path.join(path.dirname(localPath), `${base}.${eV}${path.extname(localPath)}`)
    if (fs.existsSync(fP)) {
      // We have a version of this for specific browsers.
      // Have we got the right browser?
      let supported = (
        Object.keys(specificConfig[eV]).includes(agent.browser.name) &&
        agent.browser.major >= specificConfig[eV][agent.browser.name]
      )
      if (!supported) continue
      return fP
    }
  }
  return localPath
}

module.exports.static = (options) => {
  options = (typeof options === 'string') ? {
    path: options
  } : options
  let thisConfig = {
    ...options.config,
    ...config
  }

  return (req, res, next) => {
    let reqUrl = req.originalUrl
    let localPath = path.join(process.cwd(), options.path, reqUrl)
    if (fs.existsSync(localPath)) {
      const fName = determineFile(localPath, req.headers['user-agent'], thisConfig)
      return res.sendFile(fName)
    } else {
      if (options['404URL']) {
        let path404 = path.join(process.cwd(), options.path, options['404URL'])
        return res.status(404).sendFile(path404)
      }
      return res.status(404).send('Path does not exist')
    }
  }
}
