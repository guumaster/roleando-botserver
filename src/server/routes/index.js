const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const adminOnly = require('./admin_only')
const errors = require('./errors')
const stats = require('./stats')
const tweet = require('./tweet')
const dialogflow = require('./dialogflow')
const capture = require('./capture')
const puppeteer = require('puppeteer')

module.exports = async app => {
  const browser = await puppeteer.launch({
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox'
    ]
  })

  app.use(bodyParser.json())
  app.get('/_stats', stats)
  app.use('/_internal', adminOnly)
  app.post('/_internal/tweet', tweet)
  app.post('/_internal/dialogflow', dialogflow)
  app.get('/storycubes/capture', capture(browser))

  app.use('/storycubes', express.static(path.join(__dirname, '../../static/storycubes')))

  // error handler
  app.use(errors)
}
