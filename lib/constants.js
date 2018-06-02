/**
 * Base URL for all API requests
 * @default
 * @constant
 * @type {string}
 */
const BASE_URL = 'https://api.weeb.sh'

/**
 * All available Endpoints to be used
 * @default
 * @type {Object}
 */
const ENDPOINTS = {
  tags: '/images/tags',
  types: '/images/types',
  random: '/images/random',
  generate: '/auto-image/generate',
  discord_status: '/auto-image/discord-status',
  license: '/auto-image/license',
  waifu_insult: '/auto-image/waifu-insult',
  love_ship: '/auto-image/love-ship'
}
/**
 * All available file types to be used in {@link WeebHandler#getRandom}
 * @default
 * @type {string[]}
 */
const FILE_TYPES = [
  'jpeg',
  'jpg',
  'png',
  'gif'
]
/**
 * All available discord status types to be used in {@link WeebHandler#generateDiscordMock}
 * @default
 * @type {string[]}
 */
const DISCORD_STATUSES = [
  'online',
  'idle',
  'dnd',
  'offline',
  'streaming'
]
module.exports = {BASE_URL, ENDPOINTS, FILE_TYPES, DISCORD_STATUSES}
