const server = require('./server')
const twitter = require('./twtitter')
const discord = require('./discord')


const runAll = async () => {
  return Promise.all([
    server.start(),
    twitter.start(),
    discord.start()
  ])
}

runAll()
