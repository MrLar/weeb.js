const weeb = require("../")

const sh = new weeb("super secret token", "somefunkyname/someweirdversion")
                                            //User Agent (Optional)
sh.getTypes().then(array => {
    console.log(array)
});