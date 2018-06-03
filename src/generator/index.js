const axios = require('axios')
const rpgen = require('@guumaster/rpgen')
const striptags = require('striptags')

const config = require('../../config')

const API_URL = 'https://roleando.herokuapp.com'
const MAX_RETRIES = config.maxRetries
const GENERATORS = config.generators

const isTwittable = str => str.length <= config.tweetLength

const pick = arr => arr[Math.floor(Math.random() * arr.length)]

const LOADED_GENERATORS = {}

const loadGenerator = id => {
  if ( LOADED_GENERATORS[id]) {
    return  LOADED_GENERATORS[id]
  }
  console.log(`Loading generator: ${id}`)

  return axios
    .get(`${API_URL}/api/generators/table/${id}`)
    .then(res => res.data)
    .then(res => {
      const { tpls, tables } = res.data
      const childrenNames = Object.keys(res.children)
      let children = ''
      if (childrenNames.length) {
        children = childrenNames.reduce((str, key) => {
          const data = res.children[key]
          return `${str}\n\n${data.tables}`
        }, '')
      }
      LOADED_GENERATORS[id] = rpgen.generator.create(`${tpls}\n\n${tables}\n\n${children}`)
      return  LOADED_GENERATORS[id]
    })
}
const generate = ({ generator, stripHeader }) => {
  let cleanText = generator.generate()

  if (stripHeader) cleanText = cleanText.replace(/^.+<hr>/,'')

  cleanText = striptags(cleanText, ['strong', 'span'], '\n').replace(/\n+/g, '\n').replace(/ +/g, ' ')
  cleanText = striptags(cleanText, [], '')
  return cleanText
}

const generateUntilTwittable = ({ generator, extra, stripHeader }) => {
  let cleanText
  let times = 0

  do {
    times++
    cleanText = generate({ generator, stripHeader })
  } while (!isTwittable(`${cleanText}\n${extra}`) && times < MAX_RETRIES)

  if (times === MAX_RETRIES) {
    throw new Error(`Generator made too long texts after ${MAX_RETRIES} retries`)
  }

  if (times > 1) {
    console.log(`Got one after ${times} times`)
  }

  return cleanText
}

const getGeneratorByLabel = (text) => {
  return GENERATORS.reduce((id, gen) => {
    if (id) return id

    if ( gen.labels.some(lb => text.toLowerCase().match(lb))) {
      return gen
    }
  }, '')
}

const generateRandomText = async () => {
  const gen = pick(GENERATORS)
  const generator = await loadGenerator(gen.id)
  return generateUntilTwittable({ generator })
}

const generateByLabel = async (data, extra) => {
  const generator = await loadGenerator(data.id)
  return generateUntilTwittable({ generator, extra })
}

const generateForConversation = async (data) => {
  const generator = await loadGenerator(data.id)
  return generate({ generator, stripHeader: true }).replace(/^\n+/, '').replace(/\n+$/, '')
}

module.exports = {
  getGeneratorByLabel,
  generateByLabel,
  generateRandomText,
  generateForConversation
}
