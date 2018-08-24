const server = require('./server')
const discord = require('./discord')


const runAll = async () => {
  return Promise.all([
    server.start(),
    discord.start()
  ])
}

runAll()
