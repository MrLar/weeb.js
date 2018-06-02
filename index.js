const {version} = require('./package').version
const constants = require('./lib/constants')
const axios = require('axios')
const WeebImages = require('./lib/Images/Images')

/**
 * The Main module of Weeb.js, Including all of its submodules
 */
class WeebJS {
  /**
   * @class WeebJS - The Main module of Weeb.js, Including all of its submodules
   * @param {String} key - The token to use for Requesting all data prefixed with the Token type.
   * @param {String} [agent=Weeb.js/{version}] - The User Agent to attach to all requests (Formatted as NAME/VERSION or NAME/VERSION/ENV)
   */
  constructor (key, agent = 'Weeb.js/' + version) {
    if (typeof key !== 'string') throw new TypeError('Authorization Key is not a string.')
    let type = 'Wolke'
    if (key.startsWith('Bearer')) type = 'Bearer'
    const toSlice = key.startsWith('Bearer') || key.startsWith('Wolke') ? type.length : 0
    if (typeof agent !== 'string') throw new TypeError('User-Agent is not a string.')

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
    this.axios = axios.create({
      baseURL: constants.BASE_URL,
      headers: {'Authorization': this.key, 'User-Agent': this.agent}
    })
    /**
     * Image Sub Module
     * @type {WeebImages}
     */
    this.images = this.key ? new WeebImages(this.key, this.agent, this.axios) : WeebImages
    /**
     * Alternative for {@link WeebJS#images}
     * @type {WeebImages}
     */
    this.korra = this.images
    /**
     * Alternative for {@link WeebJS#images}
     * @type {WeebImages}
     */
    this.toph = this.images
  }
}

module.exports = WeebJS

module.exports.images = WeebImages
module.exports.korra = WeebImages
module.exports.toph = WeebImages
