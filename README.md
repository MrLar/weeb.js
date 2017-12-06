A wrapper for https://weeb.sh/

# Offcial Documentation
https://docs.weeb.sh/#

# Get Random Images

```js
let weeb = require("weeb.js")

const sh = new weeb("super secret token")

sh.getRandom({type: "bite", nsfw: false, filetype: "gif"}).then(url => {
    console.log(url)
});
```

# Get all available Types

```js
let weeb = require("weeb.js")

const sh = new weeb("super secret token")

sh.getTypes().then(array => {
    console.log(array)
});
```

# Get all available Tags

```js
let weeb = require("weeb.js")

const sh = new weeb("super secret token")

sh.getTags().then(array => {
    console.log(array)
});
```