const bodyParser = require('body-parser')
const adminOnly = require('./admin_only')
const errors = require('./errors')
const stats = require('./stats')
const tweet = require('./tweet')
const dialogflow = require('./dialogflow')

module.exports = async app => {

  app.use(bodyParser.json())
  app.get('/_stats', stats)
  app.use('/_internal', adminOnly)
  app.post('/_internal/tweet', tweet)
  app.post('/_internal/dialogflow', dialogflow)

  // error handler
  app.use(errors)
}
