const { OK } = require('http-status')
const { loadGenerator, generateForConversation } = require('../../generator')

// TODO: move to config
const IDS = {
  aventura: 'H1JTSHyN',
  terror: 'BJ3dsM2V',
  oraculo: 'Hk_5n7Obb'
}
const getGeneratorByIntent = data => {
  const name = data.queryResult.intent.displayName
  const tipo = data.queryResult.parameters.tipo

  return IDS[tipo] || IDS[name]
}

module.exports = async (req, res, next) => {
  console.log(req.body)
  const id = getGeneratorByIntent(req.body)
  if (!id) {
    res.status(OK).send({ fulfillmentText: 'No se que quieres' })
    return
  }
  try {
    const data = { id }
    const fulfillmentText = await generateForConversation(data)
    console.log('RESPONDING TO REQUEST', req.body.queryResult.queryText, fulfillmentText)

    res.status(OK).send({ fulfillmentText })
  } catch (err) {
    return next(err)
  }
}
