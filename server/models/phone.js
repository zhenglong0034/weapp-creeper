const mysql = require('../tools/connect')
var moment = require('moment')
const { creeper } = require('../creeper/index')
const { searchGoods } = require('../creeper/search')

async function getPhoneList(key, method) {
  let obj = {}
  if(key || method === 'POST') {
    return new Promise(resolve => {
      if(!key) {
        return resolve([])
      }
      const search = searchGoods(encodeURIComponent(key))
      const p = new Promise(resolve => {
        search.then(() => {
          return mysql('searchInfo').select().where({
            type: key
          }).then(res => {
            res.forEach((element) => {
              element.up_time = moment(element.up_time).format('YYYY-MM-DD HH:mm:ss')
            });
            resolve(res)
          })
        })
      })
      p.then(res => {
        resolve(res)
      })
    })
  }
  const creepering = creeper()
  return new Promise(resolve => {
    creepering.then((result) => {
      return mysql('phoneInfo').select().then(res => {
        res.forEach((element) => {
          element.up_time = moment(element.up_time).format('YYYY-MM-DD HH:mm:ss')
          if (!obj[element.type]) {
            obj[element.type] = []
          }
          obj[element.type].push(element)
        });
        resolve(obj)
      })
    })

  })
}

module.exports = {
  getPhoneList
}
