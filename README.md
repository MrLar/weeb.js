[![Weeb.js on NPM](https://img.shields.io/npm/v/weeb.js.svg)](https://www.npmjs.com/package/weeb.js) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

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

```js
const WeebJS = require('weeb.js');

const WeebHandler = new WeebJS('token', true, options /* See below */)

// Request a random Bite gif
WeebHandler.images.getRandom({type: 'bite', nsfw: false, filetype: 'gif'}).then(object => {
  console.log(object)
}).catch(err => console.error(`Something went wrong :<, ${err}`))

// Generate a Discord Status Mockup
WeebHandler.imageGeneration.generateDiscordMock('https://cdn.discordapp.com/avatars/132584525296435200/a_8a64055b16fc9415954203b0f542dbde.gif', 'online').then(buffer => {
  console.log(buffer)
}).catch(err => console.error(`Something went wrong :<, ${err}`))
```

# Weeb.js Options
| Option | Type |Optional? | Default | Description |
| :------------- | :-----|:-------------| :-----| :-------- |
| axios | Object | yes |{} | [Options for the Axios instance](https://github.com/axios/axios#request-config) |
| requestsPerMinute  | Number  | yes | 500 | Amount of maximum requests per minute |
| burst | Boolean | yes |  false | Whenever to handle requests in burst mode |
| userAgent | String | yes |  Weeb.js/{version} | User-Agent Header to attach to every request formatted as NAME/VERSION or NAME/VERSION/ENV |
| images | Object | yes |  {} | Seperate request options to use only for the WeebImages sub module. Can be any of the above. (You can also use WeebOptions.toph) |
| imageGeneration | Object | yes |  {} | Seperate request options to use only for the WeebImageGeneration sub module.  Can be any of the above. (You can also use WeebOptions.toph) |

# Using Sub Modules Seperately

Works with all modules (images, imageGeneration)
```js
// Non deconstructing
const WeebJSImages = require('weeb.js').images;
const WeebImageHandler = new WeebJSImages('token', true, options /* See above */)

// Desconstructing
const {images} = require('weeb.js');
const WeebImageHandler = new images('token', true, options /* See above*/)

// Note you don't have to specify <WeebOptions>.images for this if it's not present the global onses are used.

// Request a random Bite gif
WeebHandler.images.getRandom({type: 'bite', nsfw: false, filetype: 'gif'}).then(object => {
  console.log(object)
}).catch(err => console.error(`Something went wrong :<, ${err}`))
```

# Using your own Axios instance

Works with both the main module and seperate sub-modules
```js
const WeebJS = require('weeb.js');
const axios = require('axios');

const axiosInstance = axios.create({ /* Axios config */ })

const WeebHandler = new WeebJS('token', true, options /* See above */, axiosInstance)
```
### For all usages please visit the Wrapper documentation up above
