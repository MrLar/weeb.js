const WeebJS = require('../')

const WeebHandler = new WeebJS('super secret token', 'Weeb.js Example/v2.0.0')
// User Agent (Optional)

const url = 'https://cdn.discordapp.com/avatars/132584525296435200/3a0631c5d4df2a5e8795547964bd1027.webp'
// Requires you to have the Waifu Image Gen Scope
WeebHandler.generateInsult(url).then(buffer => {
  console.log(buffer)
})
