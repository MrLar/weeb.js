const {version} = require('./package')
const constants = require('./lib/constants')
const axios = require('axios')
const WeebImages = require('./lib/Images/Images')
const WeebImageGeneration = require('./lib/ImageGeneration/ImageGeneration')
const WeebJSError = require('./lib/Error')

/**
 * @typedef {Object} WeebJSOptions
 * @property {Object} [axios={}] - Options for the Axios instance {@link https://github.com/axios/axios#request-config}
 * @property {number} [requestsPerMinute=500] - Amount of maximum requests per minute
 * @property {Boolean} [burst=false] - Whenever to handle requests in burst mode
 * @property {String} [userAgent=Weeb.js/{version}] - User-Agent Header to attach to every request formatted as NAME/VERSION or NAME/VERSION/ENV
 * @property {RequestHandlerOptions} [images={}] - Seperate request options to use only for the WeebImages sub module. (You can also use WeebOptions.toph)
 * @property {RequestHandlerOptions} [imageGeneration={}] - Seperate request options to use only for the WeebImageGeneration sub module. (You can also use WeebOptions.korra)
 */

/**
 * @typedef {Object} RequestHandlerOptions
 * @property {Object} [axios={}] - Options for the Axios instance {@link https://github.com/axios/axios#request-config}
 * @property {number} [requestsPerMinute=500] - Amount of maximum requests per minute
 * @property {Boolean} [burst=false] - Whenever to handle requests in burst mode
 * @property {String} [userAgent=Weeb.js/{version}] - User-Agent Header to attach to every request formatted as NAME/VERSION or NAME/VERSION/ENV
 */
/**
 * The Main module of Weeb.js, Including all of its submodules
 */
class WeebJS {
  /**
   * @class WeebJS - The Main module of Weeb.js, Including all of its submodules
   * @param {String} key - The token to use for Requesting all data prefixed with the Token type.
   * @param {Boolean} wolken - Whenever or not the token is a wolke token (please note almost all new tokens are wolke tokens)
   * @param {WeebJSOptions} [options=null] - Options for all requests
   * @param {Axios} [customAxios=null] - A custom axios instance
   */
  constructor (key, wolken, options = {}, customAxios = null) {
    if (typeof key !== 'string') throw new WeebJSError('Authorization Key is not a string.')
    if (options.userAgent && typeof options.userAgent !== 'string') throw new WeebJSError('options.userAgent is not a string.')

    if (customAxios) {
      if (!customAxios.request) throw new WeebJSError('customAxios needs to be a valid instance of Axios')
      customAxios.defaults.headers.common['Authorization'] = key
      customAxios.defaults.headers.common['User-Agent'] = options.userAgent || 'Weeb.js/' + version
    }
    /**
     * Axios Client to make all request to Weeb.js
     * @type {axios}
     */
    this.axios = customAxios || axios.create(Object.assign({
      baseURL: constants.BASE_URL,
      headers: {'Authorization': key, 'User-Agent': options.userAgent || 'Weeb.js/' + version}
    }, options && options.axios ? options.axios : {}))
    /**
     * Image Sub Module
     * @type {WeebImages}
     */
    this.images = new WeebImages(key, wolken, options, this.axios)
    /**
     * Alternative for {@link WeebJS#images}
     * @type {WeebImages}
     */
    this.toph = this.images

    /**
     * Image Generation Sub Module
     * @type {WeebImageGeneration}
     */
    this.imageGeneration = new WeebImageGeneration(key, wolken, options, this.axios)
    /**
     * Alternative for {@link WeebJS#imageGeneration}
     * @type {WeebImageGeneration}
     */
    this.korra = this.images
  }
}

// Main module
module.exports = WeebJS

// Class exposure and separate usage
module.exports.images = WeebImages
module.exports.toph = WeebImages
module.exports.imageGeneration = WeebImageGeneration
module.exports.korra = WeebImageGeneration
module.exports.WeebJSError = WeebJSError
