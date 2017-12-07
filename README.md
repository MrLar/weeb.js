<a href="https://nodei.co/npm/weeb.js/"><img src="https://nodei.co/npm/weeb.js.png?downloads=true&stars=true" alt="NPM info" /></a>

A wrapper for https://weeb.sh/

# Official Documentation
https://docs.weeb.sh/#

# Get Random Images

```js
const weeb = require("weeb.js")

const sh = new weeb("super secret token")

sh.getRandom({type: "bite", nsfw: false, filetype: "gif"}).then(url => {
    console.log(url)
});
```

# Get all available Types

```js
const weeb = require("weeb.js")

const sh = new weeb("super secret token")

sh.getTypes().then(array => {
    console.log(array)
});
```

# Get all available Tags

```js
const weeb = require("weeb.js")

const sh = new weeb("super secret token")

sh.getTags().then(array => {
    console.log(array)
});
```
