const Discord = require('discord.js')

const config = require('../../config')
const { generateRandomText, generateByLabel, getGeneratorByLabel } = require('../generator')

const prefix = config.discord.prefix
const CMD = {
  help: `${prefix}help`,
  random: `${prefix}rnd`,
  image: `${prefix}img`
}

module.exports = async msg => {
  if (msg.author.bot) return

  const cmd = msg.content
  if (!cmd.startsWith(prefix)) return

  if (cmd === CMD.random) {
    msg.channel.send(await generateRandomText())
    return
  }
  if (cmd === CMD.image) {
    msg.channel.send(new Discord.RichEmbed().setImage('https://roleando-random-image.now.sh/' + '?' + Math.random()))
    return
  }

  const data = getGeneratorByLabel(cmd)

  if (!data) return

  const reply = await generateByLabel(data)
  msg.channel.send(reply)
}
