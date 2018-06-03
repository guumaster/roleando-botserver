const adminOnly = require('./admin_only')
const errors = require('./errors')
const stats = require('./stats')
const tweet = require('./tweet')

module.exports = app => {
  app.get('/_stats', stats)
  app.use('/_internal', adminOnly)
  app.post('/_internal/tweet', tweet)

  // error handler
  app.use(errors)
}
