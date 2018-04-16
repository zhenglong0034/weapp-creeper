// 爬虫otcbtc 的场外交易
const https = require('https')
const cheerio = require('cheerio')
const operate = require('../tools/operate')


function searchCoin(key) {
  let url = `https://otcbtc.com/sell_offers?currency=${key}&fiat_currency=cny&payment_type=all`
  return new Promise(resolve => {
    https.get(url, function(res) {
      let chunks = []
      res.on('data', function(chunk) {
        chunks.push(chunk)
      })
      res.on('end', function() {
        let $ = cheerio.load(Buffer.concat(chunks), { decodeEntities: false})
        let coins = []
        $('.container .show-solution .long-solution-list .list-content').each((idx, element) => {
          let imgs = []
          $(element).find('.payment-type .payment-icon').each((img, icon) => {
            imgs.push('https://otcbtc.com' + $(icon).find('img').attr('src'))
          })
          coins.push({
            name: $(element).find('.user-name > a').text(),
            trust: $(element).find('.second-line').text().replace(/[^0-9.%]/g, ''),
            payment: imgs.join(','),
            coin: key,
            mount: $(element).find('.minimum-amount').text().replace(/[^0-9,.\-]/g, ''),
            price: $(element).find('.price').text().replace(/[^0-9,.]/g, ''),
          })
          // console.log(coins)
          operate.saveCoin(coins[coins.length - 1], idx).then(res => {
            resolve(res)
          })
        })
      })
    })
  })
}
// searchCoin('btm')
module.exports = {
  searchCoin
}
