<a href="https://nodei.co/npm/weeb.js/"><img src="https://nodei.co/npm/weeb.js.png?downloads=true&stars=true" alt="NPM info" /></a>

# Documentation
[Official](https://docs.weeb.sh/)<br>
[Wrapper](https://mrlar.github.io/weeb.js/)

# Installation

Install Weeb.js via yarn or npm
```
yarn add weeb.js
npm i weeb.js
```
# Getting Started

Very Basic usage example:

```js
const WeebJS = require('weeb.js');

// Initializing the Client (replace <token> with your actual token)

// When using a Wolke token  with your token (Please note that almost all new tokens are wolke tokens)
const WeebHandler = new WeebJS('Wolke <token>');
// or 
const WeebHandler = new WeebJS('<token>');

// When Using a bearer token
const WeebHandler = new WeebJS('Bearer <token>')

// Specifying a User-Agent (Formatted as NAME/VERSION or NAME/VERSION/ENV)
const WeebHandler = new WeebJS(token /* See above */ , 'Weeb.js Example/V2.0.0')

// Request a random bite gif
WeebHandler.getRandom({type: 'bite', fileType: 'gif'}).then(imageObj => console.log(imageObj))
```

### For all usages please visit the Wrapper documentation up above
