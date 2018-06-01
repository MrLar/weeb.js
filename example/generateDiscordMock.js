const WeebJS = require('../')

const WeebHandler = new WeebJS('super secret token', 'Weeb.js Example/v2.0.0')
// User Agent (Optional)
// Requires you to have the Simple Image Gen Scope
// Status (first argument) can be "online", "dnd", "idle", "offline" or "streaming"

WeebHandler.generateDiscordMock('https://cdn.discordapp.com/avatars/132584525296435200/a_8a64055b16fc9415954203b0f542dbde.gif', 'online').then(buffer => {
  console.log(buffer)
})
