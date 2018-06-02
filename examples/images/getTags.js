const WeebJS = require('../../index')

const WeebHandler = new WeebJS('super secret token', 'Weeb.js Example/v2.0.0')
// User Agent (Optional)
WeebHandler.images.getTags().then(array => {
  console.log(array)
}).catch(err => console.error(`Something went wrong :<, ${err}`))
