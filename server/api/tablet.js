const { v4: uuid } = require('uuid')

module.exports = {
  create(req, res) {
    res.send(`create new uniq id: ${uuid()}`)
  },
}