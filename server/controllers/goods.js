const phoneModel = require('../models/phone.js')

module.exports = async (ctx) => {
  const list = await phoneModel.getPhoneList(ctx.request.body.key, ctx.request.method)
  // ctx.status = 200
  ctx.state.data = list
}
