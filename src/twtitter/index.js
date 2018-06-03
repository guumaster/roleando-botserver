const { startReplier } = require('./client')
const replyToRequests = require('./reply_to_request')

module.exports = {
  start() {
    startReplier([
      replyToRequests
    ])
  }
}
