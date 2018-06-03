const Discord = require('discord.js')

const config = require('../../config')
const { generateRandomText, generateByLabel, getLabel } = require('../generator')

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

  const label = getLabel(cmd)

  if (!label) return

  console.log('label', label)
  const reply = await generateByLabel(label)
  msg.channel.send(reply)
}
