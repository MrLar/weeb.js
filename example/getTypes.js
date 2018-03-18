const weeb = require("../");

const sh = new weeb("super secret token", "Weeb.js Example/v1.5.0");
                                            //User Agent (Optional)
sh.getTypes().then(array => {
    console.log(array)
});
