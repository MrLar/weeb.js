const Base = require('../Base')
const constants = require('../constants')

/**
 * Submodule of Weeb.js responsible for all ImageGeneration related stuff (Korra)
 */
class WeebImageGeneration extends Base {
  /**
   * @class WeebImageGeneration - Submodule of Weeb.js responsible for all ImageGeneration related stuff (Korra)
   * @param {String} key - The token to use for Requesting all data prefixed with the Token type.
   * @param {Boolean} wolken - Whenever or not the token is a wolke token (please note almost all new tokens are wolke tokens)
   * @param {WeebJSOptions} [options=null] - Options for all requests
   * @param {Axios} [customAxios=null] - The axios instance of the main module if not used separately or a custom axios instance
   */
  constructor (key, wolken, options = {}, customAxios = null) {
    if (options.imageGeneration || options.korra) {
      options = Object.assign({...options}, options.imageGeneration || options.korra || {})
    }
    super(key, wolken, options, customAxios)
  }

  /**
   * Generate a Discord Status mock up using a given Image
   * @param {String} [statusIcon=online] - The status to mock, can be online, dnd, offline, streaming and idle
   * @param {String} url - The Image to perform the Mock on
   * @return {Promise<Buffer|WeebError>} A Buffer containing the image if resolved and a WeebError if rejected
   * @example
   * // Requires you to have the Simple Image Gen Scope
   * // Status (second argument) can be "online", "dnd", "idle", "offline" or "streaming"
   * WeebHandler.imageGeneration.generateDiscordMock('https://cdn.discordapp.com/avatars/132584525296435200/a_8a64055b16fc9415954203b0f542dbde.gif', 'online').then(buffer => {
   *  console.log(buffer)
   * }).catch(err => console.error(`Something went wrong :<, ${err}`))
   */
  generateDiscordMock (url, statusIcon = null) {
    // Capture the stacktrace before it gets destroyed by the async operation
    let _stackTrace = {}
    Error.captureStackTrace(_stackTrace)

    return new Promise((resolve, reject) => {
      if (statusIcon && !constants.DISCORD_STATUSES.includes(statusIcon.toLowerCase())) return reject(new this.Error('Status can only be online, dnd, idle, offline or streaming.'), _stackTrace)
      if (!url.match(/^https?:\/\/.+\.(?:jpg|png|jpeg|gif|webp)$/g)) return reject(new this.Error('You need to prove a valid direct image URL.'), _stackTrace)

      const query = {status: statusIcon || 'online', avatar: url || ''}

      const options = {
        params: query,
        axios: {responseType: 'arraybuffer'}
      }

      this.requestHandler.addToQueue(this.formatAPIRequest('discord_status', 'get', options))
        .then(res => {
          if (res.request.res.statusCode !== 200) {
            reject(new this.Error(res, _stackTrace))
          } else {
            resolve(res.data)
          }
        })
        .catch(err => reject(new this.Error(err, _stackTrace)))
    })
  }

  /**
   * Generate a simple image using Weeb.sh. Requires the generate_simple Scope!
   * @param {String} type - The type of Simple image to generate, can be awooo, eyes and won
   * @param {Object} [options={}] - Options for this request (only used when type is awooo)
   * @param {String} [options.face=fff0d3] - The hex code to use for the Face color
   * @param {String} [options.hair=cc817c] - The hex code to use for the hair color
   * @return {Promise<Buffer|WeebError>} A Buffer containing the image if resolved and a WeebError if rejected
   * @example
   * // Requires you to have the Simple Image Gen Scope
   * // Type can be won, awooo or eyes (Awooo supports hair and face as options which needs to be a hex code)
   * WeebHandler.imageGeneration.generateImage('won').then(buffer => {
   *  console.log(buffer)
   * }).catch(err => console.error(`Something went wrong :<, ${err}`))
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

      const reqOptions = {
        params: query,
        axios: {responseType: 'arraybuffer'}
      }

      this.requestHandler.addToQueue(this.formatAPIRequest('generate', 'get', reqOptions))
        .then(res => {
          if (res.request.res.statusCode !== 200) {
            reject(new this.Error(res, _stackTrace))
          } else {
            resolve(res.data)
          }
        })
        .catch(err => reject(new this.Error(err, _stackTrace)))
    })
  }

  /**
   * Generate a License using Weeb.sh. Requires the generate_license Scope!
   *  @param {Object} [options={}] - Options for this request
   *  @param {String} options.title - The title of the license
   *  @param {String} options.icon - The main icon for the License (needs to be a valid URL)
   *  @param {Array} [options.badges=[]} - Badges to display below the main Image (all of these need to be valid URLs)
   *  @param {Array} [options.widgets=[]} - Widget text to display right of the main icon
   *  @return {Promise<Buffer|WeebError>} A Buffer containing the image if resolved and a WeebError if rejected
   *  @example
   *  const options = {
   *    title: 'test',
   *    avatar: 'https://cdn.discordapp.com/avatars/132584525296435200/a_8a64055b16fc9415954203b0f542dbde.gif',
   *    badges: ['https://cdn.discordapp.com/avatars/132584525296435200/a_8a64055b16fc9415954203b0f542dbde.gif'],
   *    widgets: ['Hi', 'bye', 'kek']
   * }
   * // Requires you to have the License Scope
   * WeebHandler.imageGeneration.generateLicense(options).then(buffer => {
   *  console.log(buffer)
   * }).catch(err => console.error(`Something went wrong :<, ${err}`))
   *  @throws {WeebError}
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

      const reqOptions = {
        data: {
          title: options.title,
          avatar: options.avatar,
          widgets: options.widgets || [],
          badges: options.badges || []
        },
        axios: {responseType: 'arraybuffer'}
      }

      this.requestHandler.addToQueue(this.formatAPIRequest('license', 'post', reqOptions))
        .then(res => {
          if (res.request.res.statusCode !== 200) {
            reject(new this.Error(res, _stackTrace))
          } else {
            resolve(res.data)
          }
        })
        .catch(err => reject(new this.Error(err, _stackTrace)))
    })
  }

  /**
   * Generate a Waifu insult using a given Image. Requires the generate_waifu_insult Scope!
   * @param {string} URL - The Image to waifu insult
   * @return {Promise<Buffer|WeebError>} A Buffer containing the image if resolved and a WeebError if rejected
   * @example
   * const url = 'https://cdn.discordapp.com/avatars/132584525296435200/3a0631c5d4df2a5e8795547964bd1027.webp'
   * // Requires you to have the Waifu Image Gen Scope
   * WeebHandler.imageGeneration.generateInsult(url).then(buffer => {
   *  console.log(buffer)
   * }).catch(err => console.error(`Something went wrong :<, ${err}`))
   */
  generateInsult (URL) {
    // Capture the stacktrace before it gets destroyed by the async operation
    let _stackTrace = {}
    Error.captureStackTrace(_stackTrace)

    return new Promise((resolve, reject) => {
      if (typeof URL !== 'string') return reject(new this.Error('The URL must be a string', _stackTrace))

      const options = {
        data: {avatar: URL},
        axios: {responseType: 'arraybuffer'}
      }
      this.requestHandler.addToQueue(this.formatAPIRequest('waifu_insult', 'post', options))
        .then(res => {
          if (res.request.res.statusCode !== 200) {
            reject(new this.Error(res, _stackTrace))
          } else {
            resolve(res.data)
          }
        })
        .catch(err => reject(new this.Error(err, _stackTrace)))
    })
  }

  /**
   * Generate a Love Ship using 2 Images. Requires the generate_love_ship Scope!
   * @param {String} targetOne - URL pointing to the first Image
   * @param {String} targetTwo - URL pointing to the second Image
   * @return {Promise<Buffer|WeebError>} A Buffer containing the image if resolved and a WeebError if rejected
   * @example
   * const targetOne = 'https://cdn.discordapp.com/avatars/185476724627210241/615ee9f0e97aab7fa0725165531df3a7.webp?size=256'
   * const targetTwo = 'https://cdn.discordapp.com/avatars/388799526103941121/b5acd5dd89aa8ff7c3600f2b7edaff57.webp?size=256'
   * // Requires you to have the Waifu Image Gen Scope
   * WeebHandler.imageGeneration.generateLoveShip(targetOne, targetTwo).then(buffer => {
   *  console.log(buffer)
   *  }).catch(err => console.error(`Something went wrong :<, ${err}`))
   */
  generateLoveShip (targetOne, targetTwo) {
    // Capture the stacktrace before it gets destroyed by the async operation
    let _stackTrace = {}
    Error.captureStackTrace(_stackTrace)

    return new Promise((resolve, reject) => {
      if (typeof targetOne !== 'string' || typeof targetTwo !== 'string') {
        return reject(new this.Error('Both targetOne and targetTwo need to be given and need to be a string', _stackTrace))
      }

      const options = {
        data: {
          targetOne,
          targetTwo
        },
        axios: {responseType: 'arraybuffer'},
      }
      this.requestHandler.addToQueue(this.formatAPIRequest('love_ship', 'post', options))
        .then(res => {
          if (res.request.res.statusCode !== 200) {
            reject(new this.Error(res, _stackTrace))
          } else {
            resolve(res.data)
          }
        })
        .catch(err => reject(new this.Error(err, _stackTrace)))
    })
  }
}

module.exports = WeebImageGeneration