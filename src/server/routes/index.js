const adminOnly = require('./admin_only')
const errors = require('./errors')
const stats = require('./stats')
const tweet = require('./tweet')

module.exports = app => {
  app.use('/_stats/', stats)
  app.use('/api/internal/', adminOnly)
  app.post('/api/internal/tweet/', tweet)

  // error handler
  app.use(errors)
}
