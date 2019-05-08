const app = require('./src/app')
const debug = require('debug')('server:info')

const PORT = process.env.PORT || 8000

app.listen(PORT, () => debug(`listening on port ${PORT}`))
