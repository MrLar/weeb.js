const WeebJS = require('../')

const WeebHandler = new WeebJS('super secret token', 'Weeb.js Example/v2.0.0')
// User Agent (Optional)
WeebHandler.getTypes().then(array => {
  console.log(array)
})
