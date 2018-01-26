const Discord = require('discord.js')
const client = new Discord.Client()
const now = require('moment')
const _ = require('lodash')
const pwd = require('process').argv[1].replace(/\/[^/]*$/, '')
fs = require('fs')
var token = fs.readFileSync('token')

var serversToLog = { '345045447745732608': 'ACN' }

client.login('' + token).catch(err => {console.log('login_error'); throw err})
console.log('loading')
client.on('ready', () => console.log('Ready!'))
client.on('message', message => {
  var guildId = (_.get(message, 'guild.id'))
  if (_.keys(serversToLog).includes(guildId)) {
    log(message)
  }
})

function convertToText (message) {
  var text = message.content
  text = sanitize(text)
  text = censor(text)
  // formatting as auxr.epic according to pisg.sourceforge.net/formats
  // should look like '[MM/DD/YYYY @ HH:MM:SS] <5318008101> X XXXX XXX XX XXXXXX'
  return `[${date()}] <${message.author.id}> ${text}\n`
}

function sanitize (text) {
  return text.replace(/[\n\t]/g,' ')
}

function censor (text) {
  const split = /[^\w']/
  return text.split(split).map(x => 'X'.repeat(x.length)).join(' ')
}

function date() {
  // [MM/DD/YYYY @ HH:MM:SS]
  return now().format('MM/DD/YYYY @ HH:mm:ss')
}

function log (message) {
  var filename
  const text = convertToText(message)
  const logFolder = `${pwd}/logs/${now().format('YYYY-MM')}`
  try { fs.mkdirSync(logFolder) } catch(e) {}
  if (message.channel.type == 'text') {
    var channel = message.channel.name
    var guild = serversToLog[message.guild.id]
    fs.appendFileSync(`${logFolder}/${guild}.txt`, text)
    fs.appendFileSync(`${logFolder}/${guild}: #${channel}.txt`, text)
  }
  fs.appendFileSync(`${logFolder}.txt`, text)
}