const phoneModel = require('../models/phone')

const get = async function(ctx) {
  const list = await phoneModel.getPhoneList()
  ctx.state.data = list
}
const query = async function(ctx) {
  console.log(ctx.request)
  const list = await phoneModel.getPhoneList(ctx.request.body.key, ctx.request.method)
  ctx.state.data = list
}

module.exports = {
  get,
  query
}
