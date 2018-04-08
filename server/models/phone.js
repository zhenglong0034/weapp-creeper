const mysql = require('../tools/connect')
var moment = require('moment')
const {creeper} = require('../creeper/index')

async function getPhoneList(name, method) {
  let obj = {}
  if(name || method === 'POST') {
    return new Promise(resolve => {
      if(!name) {
        return resolve([])
      }
      return mysql('phoneInfo').where('name', 'like', `%${name}%`).then(res => {
        res.forEach((element) => {
          element.up_time = moment(element.up_time).format('YYYY-MM-DD HH:mm:ss')
        });
        obj = res
        resolve(obj)
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
