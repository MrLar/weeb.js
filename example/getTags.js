let weeb = require("../")

const sh = new weeb("super secret token")

sh.getTags().then(array => {
    console.log(array)
});