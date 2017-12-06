let weeb = require("../")

const sh = new weeb("super secret token")

sh.getRandom({type: "bite", nsfw: false, filetype: "gif"}).then(url => {
    console.log(url)
});