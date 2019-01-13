![Refractor Logo](https://raw.githubusercontent.com/Adybo123/Refractor/master/LogoLarge.png)

[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

*Keep Babel compatibility without sacrificing speed on modern browsers*

## The problem

Tools like Babel ensure that your JavaScript is compatible with older browsers, but serving these scripts to modern browsers is unnecessary, and they're often larger, too.

## How Refractor solves it

Refractor runs on your Express server, and checks the User-Agent header to determine ES6 compatibility. If the browser supports ES6, Refractor can serve alternate script files to the same URL for different browsers.



**For example,**

```javascript
let getAlertText = (name) => `Hello, ${name}!`
window.alert(getAlertText`world`)
```

becomes *444%* larger when transpiled with Babel. There is no need to serve this to the browsers most people are using.

## Setup

```bash
npm i express-refractor
```

Here is the shortest way of configuring Refractor:

```javascript
const app = require('express')()
const Refractor = require('express-refractor')

app.use(Refractor.static('/www'))

app.listen(80, () => console.log('Server up!'))
```

In your site files, for ES6 scripts, name the compatible, Babel version ```scriptname.js``` , and the shorter, ES6 version ```scriptname.es6.js```. Refractor will determine if the browser making the request supports ES6, and serve the appropriate script. If an ES6 version isn't found for some files, Refractor will serve the same script to all browsers.

## Advanced Configuration

```javascript
app.use(Refractor.static({
    path: '/www',
    '404URL': '404.html',

    config: { (See Below) }
}))
```

The config option is a set of custom rules for Refractor. For example, to detect some WebKit browsers, you could use:

```javascript
{
    'webkit': {
        'Chrome': 0,
        'Opera': 0
    }
}
```

The 'webkit' rule matches when the user is on Chrome or Opera version zero or above.  Then, for example, you could create ```index.html``` and ```index.webkit.html```.

You can supply multiple custom rules within the config option. ```path``` is not optional, ```404URL``` and ```config``` are.
