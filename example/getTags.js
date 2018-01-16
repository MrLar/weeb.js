const weeb = require("../")

const sh = new weeb("super secret token", "somefunkyname/someweirdversion")
                                            //User Agent (Optional)
sh.getTags().then(array => {
    console.log(array)
});