const Base = require('../Base')
const constants = require('../constants')
const axios = require('axios')
const {version} = require('../../package')
/**
 * Submodule of Weeb.js responsible for all Image related stuff (Korra & Toph)
 */
class WeebImages extends Base {
  /**
   * @class WeebImages - Submodule of Weeb.js responsible for all Image related stuff (Korra & Toph)
   * @param {String} key - The token to use for Requesting all data prefixed with the Token type.
   * @param {String} [agent=Weeb.js/{version}] - The User Agent to attach to all requests (Formatted as NAME/VERSION or NAME/VERSION/ENV)
   * @param {Axios} [baseAxios=null] - The Axios instance of the main module if not used separately
   */
  constructor (key, agent = 'Weeb.js/' + version, baseAxios = null) {
    super()
    if (typeof key !== 'string') throw new this.Error('Authorization Key is not a string.')
    let type = 'Wolke'
    if (key.startsWith('Bearer')) type = 'Bearer'
    const toSlice = key.startsWith('Bearer') || key.startsWith('Wolke') ? type.length : 0
    if (typeof agent !== 'string') throw new this.Error('User-Agent is not a string.')
    /**
     * User Agent that is being attached to all requests
     * @type {string}
     */
    this.agent = agent
    /**
     * Authorization Key used for all requests
     * @type {string}
     */
    this.key = type + ' ' + key.slice(toSlice).trim()

    /**
     * Axios Client to make all request to Weeb.js
     * @type {axios}
     */
    this.axios = baseAxios || axios.create({
      baseURL: constants.BASE_URL,
      headers: {'Authorization': this.key, 'User-Agent': this.agent}
    })
  }

  /**
   * @typedef {Object} WeebTagsResponse
   * @property {Number} status - The returned status code for the request made
   * @property {string[]} tags - Array of all available tags
   */
  /**
   * Get a list of all available Tags
   * @param {Object} [options={}] - Options for this request
   * @param {Boolean} [options.nsfw=false] - Whether to include NSFW tags or not, can be true, false or only
   * @param {Boolean} [options.hidden=false] - Whether to include hidden tags or not
   * @return {Promise<WeebTagsResponse>}
   * @throws {WeebJSError}
   */
  getTags (options = {}) {
    // Capture the stacktrace before it gets destroyed by the async operation
    let _stackTrace = {}
    Error.captureStackTrace(_stackTrace)

    return new Promise((resolve, reject) => {
      if (options.hidden && typeof options.hidden !== 'boolean') return reject(new this.Error('Hidden must be a boolean', _stackTrace))
      if (options.nsfw && typeof options.nsfw !== 'boolean' && options.nsfw !== 'only') return reject(new this.Error('NSFW must either be true, false or only', _stackTrace))
      const query = {nsfw: options.nsfw || false, hidden: options.hidden || false}

      return this.requestAPI('tags', query).catch(err => reject(new this.Error(err, _stackTrace))).then(resolve)
    })
  }

  /**
   * @typedef {Object} WeebTypesResponse
   * @property {Number} status - The returned status code for the request made
   * @property {string[]} types - Array of all available types
   * @property {WeebImagePreview[]} [preview] - A preview object for every type
   */

  /**
   * @typedef {Object} WeebImagePreview
   * @property {String} id - The internal ID of this image
   * @property {String} type - The type this image belongs to
   * @property {String} baseType - The base Type this image belongs to
   * @property {String} fileType - The file extension of this image
   * @property {String} url - The publicly reachable URL for this image
   */
  /**
   * Get a list of all available Types
   * @param {Object} [options={}] - Options for this request
   * @param {Boolean} [options.nsfw=false] - Whether to include NSFW types or not, can be true, false or only
   * @param {Boolean} [options.hidden=false] - Whether to include hidden types or not
   * @param {Boolean} [options.preview=false] - Whether to include a preview for each type or not
   * @return {Promise<WeebTypesResponse>}
   * @throws {WeebJSError}
   */
  getTypes (options = {}) {
    // Capture the stacktrace before it gets destroyed by the async operation
    let _stackTrace = {}
    Error.captureStackTrace(_stackTrace)

    return new Promise((resolve, reject) => {
      if (options.hidden && typeof options.hidden !== 'boolean') return reject(this.Error('Hidden must be a boolean', _stackTrace))
      if (options.preview && typeof options.preview !== 'boolean') return reject(new this.Error('Preview must be a boolean', _stackTrace))
      if (options.nsfw && typeof options.nsfw !== 'boolean' && options.nsfw !== 'only') return reject(new this.Error('NSFW must either be true, false or only', _stackTrace))

      const query = {nsfw: options.nsfw || false, hidden: options.hidden || false}
      // Preview just needs to be present to work even setting it to false would return previews
      if (options.preview) query['preview'] = true
      return this.requestAPI('types', query).catch(err => reject(new this.Error(err, _stackTrace))).then(resolve)
    })
  }

  /**
   * @typedef {Object} WeebImageReponse
   * @property {Number} status - The returned status code for the request made
   * @property {String} id - The internal ID of this image
   * @property {String} type - The type this image belongs to
   * @property {String} baseType - The bas Type this image belongs to
   * @property {Boolean} nsfw - Whether or not this image is not suitable for work
   * @property {String} fileType - The file extension of this image
   * @property {String} mimeType - The mime typing ob this image
   * @property {string[]} tags - Array of tags that this image has
   * @property {String} url - The publicly reachable URL for this image
   * @property {Boolean} hidden - Whether or not this image is hidden
   * @property {String} account - Account ID of the user that uploaded this image
   */
  /**
   * Retrieve a random image using either a type or tags
   * @param {Object} [options={}] - Options for this request
   * @param options
   * @param {Boolean} [options.nsfw=false] - Whether to include NSFW images or not, can be true, false or only
   * @param {Boolean} [options.hidden=false] - Whether to include hidden images or not
   * @param {String} [options.type=null] - The type category the image should belong to
   * @param {Array} [options.tags=[]] - Tags the image should have
   * @param {String} [options.filetype=null] - The file type the image returned can have (png, jpg, jpeg, gif), null means all.
   * @return {Promise<WeebImageReponse>}
   * @throws {WeebJSError}
   */
  getRandom (options = {}) {
    // Capture the stacktrace before it gets destroyed by the async operation
    let _stackTrace = {}
    Error.captureStackTrace(_stackTrace)

    return new Promise((resolve, reject) => {
      if (!options.type && !options.tags) return reject(new this.Error('Either tags or type are required.', _stackTrace))
      if (options.tags && !(options.tags instanceof Array)) return reject(new this.Error('Tags is not an array', _stackTrace))
      if (options.nsfw && typeof options.nsfw !== 'boolean' && options.nsfw !== 'only') return reject(new this.Error('NSFW must either be true, false or only', _stackTrace))
      if (options.hidden && typeof options.hidden !== 'boolean') return reject(new this.Error('Hidden must be a boolean', _stackTrace))
      if (options.filetype && typeof options.filetype !== 'string') return reject(new this.Error('Filetype must be a string', _stackTrace))
      if (options.filetype && !constants.FILE_TYPES.includes(options.filetype.toLowerCase())) return reject(new this.Error('Filetype must be either jpeg, jpg, png or gif', _stackTrace))

      const query = {
        hidden: options.hidden || false,
        nsfw: options.nsfw || false,
        filetype: options.filetype || null,
        tags: options.tags || null,
        type: options.type || null
      }
      this.requestAPI('random', query).catch(err => reject(new this.Error(err, _stackTrace))).then(resolve)
    })
  }

  /**
   * Generate a Discord Status mock up using a given Image
   * @param {String} [statusIcon=online] - The status to mock, can be online, dnd, offline, streaming and idle
   * @param {String} url - The Image to perform the Mock on
   * @return {Promise<Buffer>}
   * @throws {WeebJSError}
   */
  generateDiscordMock (url, statusIcon = null) {
    // Capture the stacktrace before it gets destroyed by the async operation
    let _stackTrace = {}
    Error.captureStackTrace(_stackTrace)

    return new Promise((resolve, reject) => {
      if (statusIcon && !constants.DISCORD_STATUSES.includes(statusIcon.toLowerCase())) return reject(new this.Error('Status can only be online, dnd, idle, offline or streaming.'), _stackTrace)
      if (!url.match(/^https?:\/\/.+\.(?:jpg|png|jpeg|gif|webp)$/g)) return reject(new this.Error('You need to prove a valid direct image URL.'), _stackTrace)

      const query = {status: statusIcon || 'online', avatar: url || ''}
      return this.requestAPI('discord_status', query).catch(err => reject(new this.Error(err, _stackTrace))).then(resolve)
    })
  }

  /**
   * Generate a simple image using Weeb.sh. Requires the generate_simple Scope!
   * @param {String} type - The type of Simple image to generate, can be awooo, eyes and won
   * @param {Object} [options={}] - Options for this request (only used when type is awooo)
   * @param {String} [options.face=fff0d3] - The hex code to use for the Face color
   * @param {String} [options.hair=cc817c] - The hex code to use for the hair color
   * @return {Promise<Buffer>}
   * @throws {WeebJSError}
   */
  generateImage (type, options = {}) {
    // Capture the stacktrace before it gets destroyed by the async operation
    let _stackTrace = {}
    Error.captureStackTrace(_stackTrace)

    return new Promise((resolve, reject) => {
      if (typeof type !== 'string' || (type !== 'awooo' && type !== 'eyes' && type !== 'won')) return reject(new this.Error('Type must be a string and either awooo, eyes or won', _stackTrace))

      if (type === 'awoo' && (options.hair || options.face)) {
        if (options.hair && !options.hair.match(/^[0-9a-f]{6}$/gi)) return reject(new this.Error('Hair must be a valid hex code', _stackTrace))
        if (options.face && !options.face.match(/^[0-9a-f]{6}$/gi)) return reject(new this.Error('Face must be a valid hex code', _stackTrace))
      }
      const query = {type, face: options.face || 'fff0d3', hair: options.hair || 'cc817c'}
      return this.requestAPI('generate', query).catch(err => reject(new this.Error(err, _stackTrace))).then(resolve)
    })
  }

  /**
   * Generate a License using Weeb.sh. Requires the generate_license Scope!
   *  @param {Object} [options={}] - Options for this request
   *  @param {String} options.title - The title of the license
   *  @param {String} options.icon - The main icon for the License (needs to be a valid URL)
   *  @param {Array} [options.badges=[]} - Badges to display below the main Image (all of these need to be valid URLs)
   *  @param {Array} [options.widgets=[]} - Widget text to display right of the main icon
   *  @return {Promise<Buffer>}
   *  @throws {WeebJSError}
   */
  generateLicense (options = {}) {
    // Capture the stacktrace before it gets destroyed by the async operation
    let _stackTrace = {}
    Error.captureStackTrace(_stackTrace)

    return new Promise((resolve, reject) => {
      if (typeof options.avatar !== 'string' || typeof options.title !== 'string') {
        return reject(new this.Error('Both Title and Icon need to be given and must be a string.', _stackTrace))
      }
      if (options.badges && (!(options.badges instanceof Array) || options.badges.length > 3 || options.badges.length < 1)) {
        return reject(new this.Error('Badges must be an array that contains at least 1 and not more than 3 values', _stackTrace))
      }
      if (options.widgets && (!(options.widgets instanceof Array) || options.widgets.length > 3 || options.widgets.length < 1)) {
        return reject(new this.Error('Widgets must be an array that contains at least 1 and not more than 3 values', _stackTrace))
      }

      return this.requestAPI('license', {
        title: options.title,
        avatar: options.avatar,
        widgets: options.widgets || [],
        badges: options.badges || []
      }).catch(err => reject(new this.Error(err, _stackTrace))).then(resolve)
    })
  }

  /**
   * Generate a Waifu insult using a given Image. Requires the generate_waifu_insult Scope!
   * @param {string} URL - The Image to waifu insult
   * @return {Promise<Buffer>}
   * @throws {WeebJSError}
   */
  generateInsult (URL) {
    // Capture the stacktrace before it gets destroyed by the async operation
    let _stackTrace = {}
    Error.captureStackTrace(_stackTrace)

    return new Promise((resolve, reject) => {
      if (typeof URL !== 'string') return reject(new this.Error('The URL must be a string', _stackTrace))

      return this.requestAPI('waifu_insult', {avatar: URL}, true).catch(err => reject(new this.Error(err, _stackTrace))).then(resolve)
    })
  }

  /**
   * Generate a Love Ship using 2 Images. Requires the generate_love_ship Scope!
   * @param {String} targetOne - URL pointing to the first Image
   * @param {String} targetTwo - URL pointing to the second Image
   * @return {Promise<Buffer>}
   * @throws {WeebJSError}
   */
  generateLoveShip (targetOne, targetTwo) {
    // Capture the stacktrace before it gets destroyed by the async operation
    let _stackTrace = {}
    Error.captureStackTrace(_stackTrace)

    return new Promise((resolve, reject) => {
      if (typeof targetOne !== 'string' || typeof targetTwo !== 'string') {
        return reject(new this.Error('Both targetOne and targetTwo need to be given and need to be a string', _stackTrace))
      }

      return this.requestAPI('love_ship', {
        targetOne,
        targetTwo
      }, true).catch(err => reject(new this.Error(err, _stackTrace))).then(resolve)
    })
  }
}

module.exports = WeebImages
