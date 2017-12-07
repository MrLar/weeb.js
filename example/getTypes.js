const weeb = require("../")

const sh = new weeb("super secret token")

sh.getTypes().then(array => {
    console.log(array)
});