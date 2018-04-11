const cheerio = require('cheerio')
const https = require('https')
const operate = require('../tools/operate.js')
const superagent = require('superagent')
require('superagent-charset')(superagent)

https://list.tmall.com/search_product.htm?spm=a220m.1000858.1000723.1.43d157669WQf4b&&from=rs_1_key-top-s&q=%D0%A1%C3%D7mix+2 // 编码
function searchGoods(key) {
  const url = `https://list.tmall.com/search_product.htm?q=${key}&type=p&vmarket=&spm=875.7931836%2FB.a2227oh.d100&from=mallfp..pc_1_searchbutton`
  return new Promise(resolve => {
    superagent('GET',url)//这里的URL也可以是绝对路径
    .set('cookie', 'l=AlFRidXgC4yfTgPZMuVlZjI74VfrvsUw; _med=dw:1440&dh:900&pw:2880&ph:1800&ist:0; cna=X87gEPKiNyMCAT2CALOxKOPQ; sm4=330100; uss=; enc=CG1SOj7tfZDGFcGNmQOWhINNgGwO9e8zbSJxEWS8%2FbzvxjhPF6J0yvYhaJdxrNgXU%2BUFAbVtgz63IFtaoOMwHQ%3D%3D; hng=CN%7Czh-CN%7CCNY%7C156; uc1=cookie14=UoTePM6Y2MxSsg%3D%3D; t=110b54f109e133bb1cab266db86d783b; uc3=nk2=rV36G38wq5TnaBGi&id2=UoYWNLsvWp25hg%3D%3D&vt3=F8dBz4PKUWH6%2F2bmlDU%3D&lg2=U%2BGCWk%2F75gdr5Q%3D%3D; tracknick=%5Cu6587%5Cu5316%5Cu6D41%5Cu6C130034; lgc=%5Cu6587%5Cu5316%5Cu6D41%5Cu6C130034; _tb_token_=e0f53e79ae87b; cookie2=20557b5beab95a7fae5fae630b2a1d87; tt=tmall-main; res=scroll%3A1065*7159-client%3A1065*712-offset%3A1065*7159-screen%3A1080*1920; cq=ccp%3D1; pnm_cku822=098%23E1hvovvUvbpvUpCkvvvvvjiPPFMUljt8PsMZ6jrCPmPh6jlPP2LpAjlhP2s9sjD8RuwCvvpvvUmmRphvCvvvvvvPvpvhMMGvvvyCvhQWaeWvClsh1jc6RqwiLO2v%2BE7rejwuYExr1CkKfvDr1WCl53DApbmxfwowd56eafmxfXk4jomxfwLwdiaABYkQD70OeB69AnLZeb8ruphvmvvv92jiGVZxkphvC99vvOH0pqyCvm9vvvCcS62sUQvvv31vpv9FvvvmjhCvjvUvvvUwphvwipvvv31vpvAyvphvC9vhvvCvpv%3D%3D; isg=BGNjUjQuPYEpj_Im8f93hjRe8qHN8HnHzXQasZXArUIx1IP2HSiH6kEEyqRa9E-S')
    .charset('gbk')
    .end(function(req,res){
        // console.log(res.text)
        let $ = cheerio.load(res.text, {decodeEntities: false})
        let goods = []
        $('#content #J_ItemList .product').each(function(idx, element) {
          let src = $(element).find('.productImg-wrap a img').attr('src') ? $(element).find('.productImg-wrap a img').attr('src') : $(element).find('.productImg-wrap a img').data('ks-lazyload')
          goods.push({
            platform: '天猫',
            name: $(element).find('.productShop a').text().trim(),
            price: $(element).find('.productPrice em').attr('title'),
            desc: $(element).find('.productTitle a').attr('title'),
            picture: 'https:' + src,
            type: key,
            route: 'http:' + $(element).find('.productImg-wrap a').attr('href'),
          })
          operate.saveInfo(goods[goods.length - 1], 'searchInfo').then(res => {
            resolve(res)
          })
        })
    })
  })
}
module.exports = {
  searchGoods
}
// searchGoods(encodeURIComponent('坚果Pro2'))
// const options = {
//   hostname: 'search.jd.com',
//   port: 443,
//   path: '/Search?keyword=笔记本&enc=utf-8',
//   method: 'GET',
//   headers: {
//     "Connection": "keep-alive",
//     "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
//     "Accept-Encoding": "gzip, deflate, br",
//     "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8",
//     "Cache-Control": "max-age=0",
//     "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36"
//   }
// }

// https.request(options, function(res) {
//   console.log("response: ", res.statusCode)
//   let chunks = []
//   res.on('data', function(chunk){
//     chunks.push()
//   })
//   res.on('end', function() {
//     console.log(chunks)
//   })
// })
