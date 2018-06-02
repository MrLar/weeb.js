const WeebJS = require('../../index')

const WeebHandler = new WeebJS('super secret token', 'Weeb.js Example/v2.0.0')
// User Agent (Optional)

WeebHandler.images.getRandom({type: 'bite', nsfw: false, filetype: 'gif'}).then(object => {
  console.log(object)
  // Example Object
  /*
     {
        "id": "BJZfMrXwb",
        "type": "awoo",
        "baseType": "awoo",
        "nsfw": false,
        "fileType": "gif",
        "mimeType": "image/gif",
        "tags": [],
        "url": "https://cdn.weeb.sh/images/BJZfMrXwb.gif",
        "hidden": false,
        "account": "HyxjFGfPb"
    }
    */
}).catch(err => console.error(`Something went wrong :<, ${err}`))
