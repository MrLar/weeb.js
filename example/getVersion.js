const weeb = require("../");

const sh = new weeb("super secret token");

sh.getVersion().then(v => {
    console.log(v)
});
