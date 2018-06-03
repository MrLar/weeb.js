class RequestHandler {
  constructor (options = {}) {
    this.requestsPerMinute = options.requestsPerMinute === 0 ? 0 : (options.requestsPerMinute || 500)
    this.interval = options.requestsPerMinute === 0 ? 0 : 60000 / options.requestsPerMinute
    this.burst = options.burst || false
    this.queue = []
    this.requestsDone = 0
    this.resumeQueue = null
    this.sweepInterval = this.burst ? setInterval(this.sweep.bind(this), 60e3) : false
    this.awaitCooldown = null
  }

  addToQueue (request) {
    return new Promise(async (resolve, reject) => {
      this.queue.push({
        request,
        resolve,
        reject,
        waitFor: this.interval
      })
      if (this.queue.length === 0) {
        this.processQueue()
      }
    })
  }

  async processQueue () {
    const [toExecute] = this.queue
    if (!this.burst) {
      toExecute.request()
        .then(res => toExecute.resolve(res))
        .catch(err => toExecute.reject(err))
      setTimeout(() => {
        this.queue.shift()
        if (this.queue.length > 0) {
          this.processQueue()
        }
      }, toExecute.waitFor)
    } else {
      if ((this.requestsDone >= this.requestsPerMinute) && (this.requestsPerMinute !== 0)) {
        this.awaitCooldown = new Promise((resolve) => {
          this.resumeQueue = resolve
        })
        await this.awaitCooldown
      }
      toExecute.request()
        .then(res => toExecute.resolve(res))
        .catch(err => toExecute.reject(err))
      this.requestsDone++
      this.queue.shift()
      if (this.queue.length > 0) {
        this.processQueue()
      }
    }
  }

  sweep () {
    this.requestsDone = 0
    if (this.resumeQueue) {
      this.resumeQueue()
    }
  }
}

module.exports = RequestHandler
