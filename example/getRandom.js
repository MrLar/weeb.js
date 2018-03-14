const weeb = require("../");

const sh = new weeb("super secret token", "Weeb.js Example/v1.4.0");
                                            //User Agent (Optional)

sh.getRandom({type: "bite", nsfw: false, filetype: "gif"}).then(array => {
    console.log(array[0]); //The url to the image
    console.log(array[1]); //The ID of the image
    console.log(array[2]); //The File type of the image
});
