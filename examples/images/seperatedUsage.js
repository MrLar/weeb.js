//Example 1

const WeebJS = require('../../index')

const WeebImageHandler = new WeebJS.images('super secret token', 'Weeb.js Example/v2.0.0')
                                                                 // User Agent (Optional)
WeebImageHandler.getTypes().then(array => {
  console.log(array)
}).catch(err => console.error(`Something went wrong :<, ${err}`))


//Example 2

const {images} = require('../../index')

const WeebImageHandler2 = new images('super secret token', 'Weeb.js Example/v2.0.0')
                                                           // User Agent (Optional)
WeebImageHandler2.getTypes().then(array => {
  console.log(array)
}).catch(err => console.error(err))
