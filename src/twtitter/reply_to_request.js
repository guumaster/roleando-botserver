const { isReplyRequest, replyToTweet } = require('./client')
const { getLabel, generateByLabel } = require('../generator')

module.exports = async (tweet) => {
  console.log('Tweet received', tweet.text)

  if (!isReplyRequest(tweet)) {
    return
  }

  const label = getLabel(tweet.text)

  if (!label) {
    console.log(`Unknown label on tweet: \n ${tweet.text}`)
    return
  }

  console.log(`Tweeting about ${label}`)

  const reply = await generateByLabel(label, `@${tweet.user.screen_name}`)

  replyToTweet({ originalTweet: tweet, reply })
  console.log('Done')
}
