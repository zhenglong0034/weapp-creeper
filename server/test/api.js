const cheerio = require('cheerio')
const https = require('https')
const operate = require('../tools/operate.js')
const superagent = require('superagent')
require('superagent-charset')(superagent)

https://list.tmall.com/search_product.htm?spm=a220m.1000858.1000723.1.43d157669WQf4b&&from=rs_1_key-top-s&q=%D0%A1%C3%D7mix+2 // 编码
function searchGoods() {
  const url = 'http://rate.tmall.com/list_detail_rate.htm?itemId=41464129793&sellerId=1652490016&currentPage=1'
  return new Promise(resolve => {
    superagent('GET',url)//这里的URL也可以是绝对路径
    .set('cookie', 't=bf33a50e0d1e610e9195d548016bca42; _tb_token_=74a3c88301b89; cookie2=1998f0c824; ')
    .charset('gbk')
    .end(function(req,res){
        // console.log(res.text)
        let $ = cheerio.load(res.text, {decodeEntities: false})
        console.log(JSON.parse(res.text.split('"rateDetail":')[1]))
    })
  })
}
searchGoods()
