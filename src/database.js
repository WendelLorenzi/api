const mongoose = require('mongoose')
const debug = require('debug')

mongoose
  .connect(
    `${process.env.MONGO_URI}?retryWrites=true`,
    { useNewUrlParser: true }
  )
  .catch(err => {
    debug('server:error')(err)
  })
require('./models/user')
require('./models/event')
require('./models/booking')
require('./models/product')
require('./models/order')

const models = {}

Object.entries(mongoose.models).map(model => (models[model[0]] = model[1]))

module.exports = { connection: mongoose.connection, models }
