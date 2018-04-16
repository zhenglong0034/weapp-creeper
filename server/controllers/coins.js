const coinsModel = require('../models/coins.js')

module.exports = async function(ctx) {
  const list = await coinsModel.getCoinsList(ctx.request.body.key, ctx.request.method)
  ctx.state.data = list
}
