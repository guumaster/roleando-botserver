const { NO_CONTENT } = require('http-status')
const config = require('../../../config/index')
const { tweet } = require('../../twtitter/client')
const { generateRandomText } = require('../../generator/index')

module.exports = async (req, res, next) => {
  try {
    tweet({
      status: await generateRandomText(),
      dryRun: config.twitter.dryRun
    })
    res.sendStatus(NO_CONTENT)
  } catch (err) {
    return next(err)
  }
}
