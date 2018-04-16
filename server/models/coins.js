const mysql = require('../tools/connect')
const {searchCoin} = require('../creeper/coin')
const moment = require('moment')

function getCoinsList(key, method) {
  return new Promise(resolve => {
    const searchCoining = searchCoin(key)
    searchCoining.then(() => {
      return mysql('coinsInfo').select()
        .where('name', 'like', `%${key}%`)
        .orWhere('coin', 'like', `%${key}%`).then(res => {
          res.forEach((element) => {
            element.up_time = moment(element.up_time).format('YYYY-MM-DD HH:mm:ss')
            element.payment = element.payment.split(',')
          });
          resolve(res)
      })
    })
  })
}

module.exports = {
  getCoinsList
}
