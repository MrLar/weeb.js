const Error = require('./Error')
const constants = require('./constants')
const RequestHandler = require('./RequestHandler')
const axios = require('axios')
const {version} = require('../package')

class Base {
  constructor (key, wolken, options = {}, customAxios) {

    this.requestHandler = new RequestHandler(options)
    /**
     * Error constructor
     * @type {WeebError}
     */
    this.Error = Error

    if (typeof key !== 'string') throw new this.Error('Authorization Key is not a string.')
    if (options.userAgent && typeof options.userAgent !== 'string') throw new this.Error('options.userAgent is not a string.')
    /**
     * User Agent that is being attached to all requests
     * @type {string}
     */
    this.agent = options.userAgent || 'Weeb.js/' + version
    /**
     * Authorization Key used for all requests
     * @type {string}
     */
    this.key = `${wolken ? 'Wolke ' : 'Bearer '} ${key}`

    if (customAxios) {
      if (!customAxios.request) throw new this.Error('customAxios needs to be a valid instance of Axios')
      customAxios.defaults.headers.common['Authorization'] = key
      customAxios.defaults.headers.common['User-Agent'] = options.userAgent || 'Weeb.js/' + version
    }
    /**
     * Axios Client to make all request to Weeb.js
     * @type {axios}
     */
    this.axios = customAxios || axios.create(Object.assign({
      baseURL: constants.BASE_URL,
      headers: {'Authorization': this.key, 'User-Agent': this.agent}
    }, options && options.axios ? options.axios : {}))
  }

  /**
   * Send a request to Weeb.sh
   * @param {String} endpoint - The endpoint to make the request to
   * @param {Boolean} method - The HTTP method for this request
   * @param {Object} options - Request options
   * @param {Object} options.data - Post data for put, post and patch methods
   * @param {Object} options.params - Query string params for the request
   * @return {any}
   */
  formatAPIRequest (endpoint, method, options = {}) {

    return async () => {
      const reqOptions = {
        data: ['post', 'put', 'patch'].includes(method) ? options.data : null,
        params: options.params
      }
      if (options.axios) {
        Object.assign(reqOptions, options.axios)
      }
      return this.axios[method](constants.ENDPOINTS[endpoint], ['post', 'put', 'patch'].includes(method) ? null : reqOptions, ['post', 'put', 'patch'].includes(method) ? reqOptions : null)
    }
  }
}

module.exports = Base
