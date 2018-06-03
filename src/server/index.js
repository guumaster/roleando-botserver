const express = require('express')

const figures = require('figures')
const config = require('../../config')
const addRoutes = require('./routes/index')
const app = express()

addRoutes(app)

module.exports = {
  start () {
    return new Promise(resolve => {
      app.listen(config.server.port, () => {
        console.log(`${figures.star} server started on ${config.server.port}`)
        return resolve()
      })
    })
  }
}
