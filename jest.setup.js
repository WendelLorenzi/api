if (process.env.NODE_ENV === 'test') {
  require('dotenv').config({ path: `${process.cwd()}/.env.local.test` })
}

const { connection } = require('./src/database')
const app = require('./src/app')
const pubsub = require('./src/pubsub')
const mqtt = require('./src/mqtt')
const User = require('./src/models/user')

beforeAll(() => app.listen())

beforeEach(() => User.create({ email: 'test@test.com', password: 'test' }))

afterEach(() => connection.db.dropDatabase())

afterAll(async () => {
  await pubsub.close()
  await app.close()
  await mqtt.end()
  return connection.close()
})
