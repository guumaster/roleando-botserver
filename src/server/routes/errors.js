const { INTERNAL_SERVER_ERROR } = require('http-status')

module.exports = (err, req, res, next) => {
  console.error(err)
  const code = err.code || INTERNAL_SERVER_ERROR
  res.status(code).send({
    code,
    message: err.message || 'Something broke'
  })
}
