require('dotenv').config()

module.exports = {
  server: {
    port: process.env.PORT || 3000,
    adminToken: process.env.ADMIN_TOKEN || Math.random()
  },
  apiBaseUrl: 'https://api.rolodromo.com',
  maxRetries: 100,
  tweetLength: 280,
  discord: {
    token: process.env.DISCORD_BOT_TOKEN,
    prefix: '!'
  },
  twitter: {
    consumer_key: process.env.BOT_CONSUMER_KEY,
    consumer_secret: process.env.BOT_CONSUMER_SECRET,
    access_token: process.env.BOT_ACCESS_TOKEN,
    access_token_secret: process.env.BOT_ACCESS_TOKEN_SECRET,
    screen_name: 'roleandobot',
    dryRun: !!(process.env.DRY_RUN) || false
  },
  generators: [
    {
      id: 'BytfSUVS',
      key: 'profecias',
      labels: ['profecia', 'profecias']
    },
    {
      id: 'Hy_JYs8yZ',
      key: 'graffitis',
      labels: ['graffiti', 'graffitis', 'pintada']
    },
    {
      id: 'SJfca2q4',
      key: 'dungeons',
      labels: ['dungeon']
    },
    {
      id: 'ryhpUxVH',
      key: 'presagios',
      labels: ['presagios', 'presagio']
    },
    {
      id: 'rJZnFG74',
      key: 'destinos',
      labels: ['destino', 'destino mistico']
    },
    {
      id: 'Hk8Z2R9S',
      key: 'simbolos',
      labels: ['simbolo', 'simbolo extraño']
    },
    {
      id: 'rkdh21CR',
      key: 'garitos',
      labels: ['garito', 'posada', 'taverna']
    },
    {
      id: 'ryCnVMOb-',
      key: 'tramas',
      labels: ['trama', 'plot']
    },
    {
      id: 'Hk_5n7Obb',
      key: 'oraculo',
      labels: ['oraculo']
    },
    {
      id: 'Hk2B_7fE',
      key: 'sombrio',
      labels: ['sitio', 'sitio sombrio']
    },
    {
      id: 'H1JTSHyN',
      key: 'aventura',
      labels: ['aventura', 'semilla']
    },
    {
      id: 'Skap_rX4',
      key: 'libro',
      labels: ['libro', 'biblioteca']
    },
    {
      id: 'BJ3dsM2V',
      key: 'terror',
      labels: ['terror']
    },
    {
      id: 'ryQk55nV',
      key: 'tesoros',
      labels: ['cazador', 'tesoros']
    },
    {
      id: 'BkRHUH96x',
      key: 'naves',
      labels: ['naves', 'nave', 'nombre nave']
    },
    {
      id: 'r1wBUHu-Z',
      key: 'secretos',
      labels: ['secreto', 'rumores']
    }
  ]
}
