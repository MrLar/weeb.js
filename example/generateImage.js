const WeebJS = require('../')

const WeebHandler = new WeebJS('super secret token', 'Weeb.js Example/v2.0.0')
// User Agent (Optional)

// Requires you to have the Simple Image Gen Scope
// Type can be won, awooo or eyes (Awooo supports hair and face as options which needs to be a hex code)
WeebHandler.generateImage('won').then(buffer => {
  console.log(buffer)
})
