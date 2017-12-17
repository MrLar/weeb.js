const weeb = require("../")
const sh = new weeb("super secret token") //Reuqires you to have the Simple Image Gen Scope

sh.generateImage("won").then(buffer => { //Type can be won, awooo or eyes (Awooo supports hair and face as options which needs to be a hex code)
    console.log(buffer)
});