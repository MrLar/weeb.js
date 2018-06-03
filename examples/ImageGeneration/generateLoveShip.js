const WeebJS = require('../../index')

const WeebHandler = new WeebJS('super secret token', true, 'Weeb.js Example/v2.0.0')
                                                     // User Agent (Optional)

const targetOne = 'https://cdn.discordapp.com/avatars/185476724627210241/615ee9f0e97aab7fa0725165531df3a7.webp?size=256'
const targetTwo = 'https://cdn.discordapp.com/avatars/388799526103941121/b5acd5dd89aa8ff7c3600f2b7edaff57.webp?size=256'
// Requires you to have the Waifu Image Gen Scope
WeebHandler.imageGeneration.generateLoveShip(targetOne, targetTwo).then(buffer => {
  console.log(buffer)
}).catch(err => console.error(`Something went wrong :<, ${err}`))
