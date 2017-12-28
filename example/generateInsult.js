const weeb = require("../")
const sh = new weeb("super secret token") //Reuqires you to have the Waifu Image Gen Scope

sh.generateInsult("https://cdn.discordapp.com/avatars/132584525296435200/3a0631c5d4df2a5e8795547964bd1027.webp?size=2048").then(buffer => {
    console.log(buffer)
});