const Base = require('../Base')
const constants = require('../constants')

/**
 * Submodule of Weeb.js responsible for all Image related stuff (Toph)
 */
class WeebImages extends Base {
  /**
   * @class WeebImages - Submodule of Weeb.js responsible for all Image related stuff (Korra & Toph)
   * @param {String} key - The token to use for Requesting all data prefixed with the Token type.
   * @param {Boolean} wolken - Whenever or not the token is a wolke token (please note almost all new tokens are wolke tokens)
   * @param {WeebJSOptions} [options=null] - Options for all requests
   * @param {Axios} [customAxios=null] - The axios instance of the main module if not used separately or a custom axios instance
   */
  constructor (key, wolken, options = {}, customAxios = null) {
    if (options.images || options.toph) {
      options = Object.assign({...options}, options.toph || options.images || {})
    }
    super(key, wolken, options, customAxios)
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
   * @return {Promise<WeebTagsResponse|WeebError>} A WeebTagsResponse if resolved and a WeebError if rejected
   * @example
   * WeebHandler.images.getTags().then(array => {
   *  console.log(array)
   * }).catch(err => console.error(`Something went wrong :<, ${err}`))
   */
  getTags (options = {}) {
    // Capture the stacktrace before it gets destroyed by the async operation
    let _stackTrace = {}
    Error.captureStackTrace(_stackTrace)

    return new Promise((resolve, reject) => {
      if (options.hidden && typeof options.hidden !== 'boolean') return reject(new this.Error('Hidden must be a boolean', _stackTrace))
      if (options.nsfw && typeof options.nsfw !== 'boolean' && options.nsfw !== 'only') return reject(new this.Error('NSFW must either be true, false or only', _stackTrace))
      const query = {nsfw: options.nsfw || false, hidden: options.hidden || false}

      const reqOptions = {
        params: query,
      }

      this.requestHandler.addToQueue(this.formatAPIRequest('tags', 'get', reqOptions))
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
   * @typedef {Object} WeebTypesResponse
   * @property {Number} status - The returned status code for the request made
   * @property {string[]} types - Array of all available types
   * @property {WeebImagePreview[]} preview - A preview object for every type, empty if no previews requested
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
   * @return {Promise<WeebTypesResponse|WeebError>} A WeebTypesResponse if resolved and a WeebError if rejected
   * @example
   * WeebHandler.images.getTypes().then(array => {
   *  console.log(array)
   * }).catch(err => console.error(`Something went wrong :<, ${err}`))
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

      const reqOptions = {
        params: query,
      }

      this.requestHandler.addToQueue(this.formatAPIRequest('types', 'get', reqOptions))
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
   * @param {String} [options.type=null] - The type category the image should belong to. You need to provide either this or tags or both
   * @param {Array} [options.tags=[]] - Tags the image should have. You need to provide either this or type or both
   * @param {String} [options.filetype=null] - The file type the image returned will have (png, jpg, jpeg, gif), Not setting this means it can be a random one
   * @return {Promise<WeebImageReponse|WeebError>} A WeebImageReponse if resolved and a WeebError if rejected
   * @example
   * WeebHandler.images.getRandom({type: 'bite', nsfw: false, filetype: 'gif'}).then(object => {
   *  console.log(object)
   * }).catch(err => console.error(`Something went wrong :<, ${err}`))
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

      const reqOptions = {
        params: query,
      }

      this.requestHandler.addToQueue(this.formatAPIRequest('random', 'get', reqOptions))
        .then(res => {
          console.log(res)
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

module.exports = WeebImages
