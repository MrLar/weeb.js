const Error = require('./Error')
const constants = require('./constants')
/**
 * Main Handler for Weeb.sh
 */
class Base {
  /**
   * @class Base - Main handler for all Weeb.sh request
   */
  constructor () {
    /**
     * Error constructor
     * @type {WeebJSError}
     */
    this.Error = Error
  }

  /**
   * Send a request to Weeb.sh
   * @param {String} endpoint - The endpoint to make the request to
   * @param {Object} query - Query string params or Post options if method is post
   * @param {Boolean} [isPost=false] - Whether this is a post or a get
   * @return {Promise<Buffer|Object>}
   */
  requestAPI (endpoint, query = {}, isPost = false) {
    return new Promise(async (resolve, reject) => {
      try {
        let res
        if (isPost) {
          res = await this.axios.post(constants.ENDPOINTS[endpoint], query, {
            headers: {'Content-Type': 'application/json'},
            responseType: 'arraybuffer'
          })
        } else {
          res = await this.axios.get(constants.ENDPOINTS[endpoint], {params: query, responseType: ['discord_status', 'generate'].includes(endpoint) ? 'arraybuffer' : null})
        }
        let {data, status} = res
        if (status < 200 || status > 300) reject(Buffer.isBuffer(data) ? data.toString() : data)
        else resolve(data)
      } catch (err) {
        reject(err)
      }
    })
  }
}

module.exports = Base
