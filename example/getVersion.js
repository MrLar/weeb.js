const weeb = require("../");

const sh = new weeb("super secret token", "Weeb.js Example/v1.5.0");
//User Agent (Optional)

sh.getVersion().then(v => {
    console.log(v) //Version for weeb.sh/images
});

sh.getVersion(true).then(v => {
    console.log(v) //Version for weeb.sh/auto-image
});
