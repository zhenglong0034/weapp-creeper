const mysql = require('./connect')
const moment = require('moment')

function saveInfo(info, table) {
  const name = info.name
  const query = table === 'searchInfo' ? {name, type: info.type, platform: info.platform} : {name}
  return mysql(table).where(query).then((res) => {
      if(res[0] && res[0].name) {
        return mysql(table).where(query).update({
          up_time: moment().format('YYYY-MM-DD HH:mm:ss'),
          last_price_time: res[0].up_time,
          price: info.price,
          last_price: res[0].price,
          pic: info.picture,
          desc: info.desc,
          route: info.route,
          type: info.type,
          trend: (Number(info.price) - Number(res[0].price)) >= 0 ? 'up' : 'down',
        })
      } else {
        return mysql(table).insert({
          platform: info.platform,
          up_time: moment().format('YYYY-MM-DD HH:mm:ss'),
          last_price_time: moment().format('YYYY-MM-DD HH:mm:ss'),
          price: info.price,
          last_price: info.price,
          pic: info.picture,
          trend: 'up',
          type: info.type,
          desc: info.desc,
          route: info.route,
          name
        }).return({inserted: true}) // 一定要有 then 或者 return  否则插入失败 用 then 返回的 是插入的位置
    }
  })
}

function selectInfo() {
    return mysql(table).select().then(res => {
        return res
    })
}

function saveCoin(info, idx) {
 console.log('______________', info)
 return mysql('coinsInfo').where({
   coin: info.coin
 }).del().then(() => {
  //  if(res[idx] && res[idx].name) {
  //    return mysql('coinsInfo').where({
  //     coin: info.coin
  //   }).update({
  //     up_time: moment().format('YYYY-MM-DD HH:mm:ss'),
  //     last_price_time: res[idx].up_time,
  //     price: info.price,
  //     payment: info.payment,
  //     mount: info.mount,
  //     name: info.name,
  //     last_price: res[idx].price,
  //   })
  return mysql('coinsInfo').insert({
    name: info.name,
    up_time: moment().format('YYYY-MM-DD HH:mm:ss'),
    last_price_time: moment().format('YYYY-MM-DD HH:mm:ss'),
    price: info.price,
    last_price: info.price,
    mount: info.mount,
    payment: info.payment,
    coin: info.coin,
    trust: info.trust
  }).return({inserted: true})
 })
}
module.exports = {
    saveInfo,
    selectInfo,
    saveCoin
}
