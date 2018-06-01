const WeebJS = require('../')

const WeebHandler = new WeebJS('super secret token', 'Weeb.js Example/v2.0.0')
// User Agent (Optional)
const options = {
  title: 'test',
  avatar: 'https://cdn.discordapp.com/avatars/132584525296435200/a_8a64055b16fc9415954203b0f542dbde.gif',
  badges: ['https://cdn.discordapp.com/avatars/132584525296435200/a_8a64055b16fc9415954203b0f542dbde.gif'],
  widgets: ['Hi', 'bye', 'kek']
}

// Requires you to have the License Scope
WeebHandler.generateLicense(options).then(buffer => {
  console.log(buffer)
})
