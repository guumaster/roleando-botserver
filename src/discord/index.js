const Discord = require('discord.js')

const config = require('../../config')
const handleCommands = require('./commands')

const client = new Discord.Client()

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`)
  console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`)
  client.user.setActivity(`Serving ${client.guilds.size} servers`)
})

client.on('guildCreate', guild => {
  console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`)
  client.user.setActivity(`Serving ${client.guilds.size} servers`)
})

client.on('guildDelete', guild => {
  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`)
  client.user.setActivity(`Serving ${client.guilds.size} servers`)
})

client.on('message', handleCommands)

module.exports = {
  start () {
    return client.login(config.discord.token)
  }
}
