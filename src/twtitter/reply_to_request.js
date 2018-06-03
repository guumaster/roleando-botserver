const { isReplyRequest, replyToTweet } = require('./client')
const { getGeneratorByLabel, generateByLabel } = require('../generator')

module.exports = async (tweet) => {
  console.log('Tweet received', tweet.text)

  if (!isReplyRequest(tweet)) {
    return
  }

  const data = getGeneratorByLabel(tweet.text)

  if (!data) {
    console.log(`Unknown label on tweet: \n ${tweet.text}`)
    return
  }

  console.log(`Tweeting about ${data.key}`)

  const reply = await generateByLabel(data, `@${tweet.user.screen_name}`)

  replyToTweet({ originalTweet: tweet, reply })
  console.log('Done')
}
