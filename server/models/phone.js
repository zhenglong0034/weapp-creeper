const mysql = require('../tools/connect')
var moment = require('moment')
const { creeper } = require('../creeper/index')
const { searchGoods } = require('../creeper/search')

async function getPhoneList(key, method) {
  let obj = {}
  if(key || method === 'POST') {
    const search = searchGoods(encodeURIComponent(key))
    return new Promise(resolve => {
      search.then((res) => {
        if(!key) {
          return resolve([])
        }
        // console.log('+++++++++++++++++++',res)
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
  }
  const creepering = creeper()
  return new Promise(resolve => {
    creepering.then((result) => {
      console.log('+++++++++++++++++============', result)
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
