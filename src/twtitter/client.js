const figures = require('figures')
const Client = require('twit')

const config = require('../../config')

const T = new Client(config.twitter)

const tweet = ({ status, inReplyTo, dryRun }) => new Promise((resolve, reject) => {
  if (dryRun) {
    console.log(`This would tweet: \n\t${status}`)
    return
  }

  console.log('Tweeting...')
  T.post('statuses/update', { status, in_reply_to_status_id: inReplyTo }, (err, data) => {
    if (err) {
      console.error('Error twitting:', err)
      return reject(err)
    }

    console.log(`Published tweet ${data.id_str}. done!`)
    console.log(data.text)
    return resolve()
  })
})

const replyToTweet = ({ originalTweet, reply, dryRun }) => {
  console.log(`Replying to ${originalTweet.id_str}`)
  return tweet({
    status: `@${originalTweet.user.screen_name}\n${reply}`,
    inReplyTo: originalTweet.id_str,
    dryRun
  })
}

const deleteTweet = (id) => new Promise((resolve, reject) => {

  T.post('statuses/destroy/:id', { id }, (err, data, response) => {
    if (err) {
      return reject(err)
    }
    return resolve(data)
  })
})

const isReplyRequest = (tweet) => {
  return tweet.user.screen_name !== config.twitter.screen_name
    && (tweet.in_reply_to_screen_name === config.botScreenName
      || tweet.text.match(`@${config.twitter.screen_name}`))
}

const startReplier = fns => {
  const stream = T.stream('user')

  if (!Array.isArray(fns)) {
    fns = [fns]
  }

  console.log(`${figures.star} listening to tweet events`)

  stream.on('tweet', (tweet) => {
    fns.map(fn => fn(tweet))
  })
}

module.exports = {
  tweet,
  deleteTweet,
  isReplyRequest,
  replyToTweet,
  startReplier
}
