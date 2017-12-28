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
# Generate an Image (Requires Simple Image Gen Scope)

```js
const weeb = require("weeb.js")
const sh = new weeb("super secret token") //Reuqires you to have the Simple Image Gen Scope

sh.generateImage("won").then(buffer => { //Type can be won, awooo or eyes (Awooo supports hair and face as options which needs to be a hex code)
    console.log(buffer)
});
```

# Generate a License (Requires License Scope)

```js
const weeb = require("weeb.js")
const sh = new weeb("super secret token") //Reuqires you to have the License Scope
const options = {
    title: "test", 
    avatar: "https://cdn.discordapp.com/avatars/132584525296435200/a9f823c7a39a53f562fe8dcb6edf4607.webp", 
    badges: ["https://cdn.discordapp.com/avatars/267207628965281792/e13af85a8abbd8fd2a5ec76d3ca2fbd6.webp"], 
    widgets: ["Hi", "bye", "kek"]
}
sh.generateLicense(options).then(buffer => {
    console.log(buffer)
});
```

# Generate a Waifu Insult Image (Requires Waifu Image Gen Scope)

```js
const weeb = require("weeb.js")
const sh = new weeb("super secret token") //Reuqires you to have the Waifu Image Gen Scope

sh.generateInsult("https://cdn.discordapp.com/avatars/132584525296435200/3a0631c5d4df2a5e8795547964bd1027.webp?size=2048").then(buffer => {
    console.log(buffer)
});
```
