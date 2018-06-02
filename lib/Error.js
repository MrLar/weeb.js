/**
 * Only the message and stack property are guaranteed, as all the other properties can appear only if the error originated from the request
 *
 * @extends Error
 * @property {string} message - Message that describes this error
 * @property {string} stack - The stacktrace of the error the error originated from
 * @property {number} [code] - The HTTP code of the error (only if the error came from the request)
 * @property {string|object} [data] - Data that was send alongside the request that threw this error
 * @property {any} [originalRequest] - The request that was send
 * @property {any} [config] - The config of the sent request
 */
class WeebJSError extends Error {
  constructor (err, _stack) {
    super(err)
    if (err.response && err.response.status) {
      this.code = err.code === 'ECONNABORTED' ? 408 : err.response.status
      this.message = err.code === 'ECONNABORTED' ? 'timeout' : `${err.response.status} ${err.response.statusText}`
      this.data = err.code === 'ECONNABORTED' ? 'Request timed out' : err.response.data
      this.originalRequest = err.request
      this.config = err.config
    }
    // Error.captureStackTrace has it's own Name and Message property that would win when assigning the stack
    _stack.message = this.message
    _stack.name = 'WeebJSError'
    this.stack = _stack.stack
  }
}

module.exports = WeebJSError
