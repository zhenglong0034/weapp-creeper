const cheerio = require('cheerio')
const iconv = require('iconv-lite')
const operate = require('../tools/operate.js')
const request = require('request')
const https = require('https')
const superagent = require('superagent')

function searchGoods(key) {
  const url = `https://search.jd.com/Search?keyword=${key}&enc=utf-8&wq=${key}&pvid=3e838465f9f64d58b9dd07bd5e61fcc7`
  return new Promise(resolve => {
    superagent('GET',url)//这里的URL也可以是绝对路径
    .end(function(req,res){
        // console.log(res.text)
        /* let $ = cheerio.load(res.text, {decodeEntities: false})
        let goods = []
        $('#content #J_ItemList .product').each(function(idx, element) {
          let src = $(element).find('.productImg-wrap a img').attr('src') ? $(element).find('.productImg-wrap a img').attr('src') : $(element).find('.productImg-wrap a img').data('ks-lazyload')
          goods.push({
            platform: '天猫',
            name: $(element).find('.productShop a').text().trim(),
            price: $(element).find('.productPrice em').attr('title'),
            desc: $(element).find('.productTitle a').attr('title'),
            picture: 'https:' + src,
            type: decodeURIComponent(key),
            route: 'http:' + $(element).find('.productImg-wrap a').attr('href'),
          })
          operate.saveInfo(goods[goods.length - 1], 'searchInfo').then(res => {
            resolve(goods)
          }) */
      // const html = iconv.decode(Buffer.concat(chunks), 'utf-8')
      let $ = cheerio.load(res.text, {decodeEntities: false})
      let goods = []
      // console.log(html)
      $('#J_main #J_goodsList .gl-warp > li').each(function(idx, element) {
        let src = $(element).find('.p-img a img').attr('src')
        goods.push({
          platform: '京东',
          name: $(element).find('.p-shop a').text(),
          price: $(element).find('.p-price i').text(),
          desc: $(element).find('.p-name a').attr('title'),
          picture: 'https:' + src,
          type: decodeURIComponent(key),
          route: 'http:' + $(element).find('.p-img a').attr('href'),
        })
        // console.log(goods)
        operate.saveInfo(goods[goods.length - 1], 'searchInfo').then((res) => {
          resolve()
        })
      })
    })
  })
}
// searchGoods(encodeURIComponent('坚果Pro2'))
// module.exports = {
//   searchGoods
// }
// const options = {
//   hostname: 'list.tmall.com',
//   port: 443,
//   url: 'https://list.tmall.com/search_product.htm?q=mix&type=p&vmarket=&spm=875.7931836%2FB.a2227oh.d100&from=mallfp..pc_1_searchbutton',
//   method: 'GET',
//   headers: {
//     cookie: 'l=AlFRidXgC4yfTgPZMuVlZjI74VfrvsUw; _med=dw:1440&dh:900&pw:2880&ph:1800&ist:0; cna=X87gEPKiNyMCAT2CALOxKOPQ; sm4=330100; uss=; enc=CG1SOj7tfZDGFcGNmQOWhINNgGwO9e8zbSJxEWS8%2FbzvxjhPF6J0yvYhaJdxrNgXU%2BUFAbVtgz63IFtaoOMwHQ%3D%3D; hng=CN%7Czh-CN%7CCNY%7C156; uc1=cookie14=UoTePM6Y2MxSsg%3D%3D; t=110b54f109e133bb1cab266db86d783b; uc3=nk2=rV36G38wq5TnaBGi&id2=UoYWNLsvWp25hg%3D%3D&vt3=F8dBz4PKUWH6%2F2bmlDU%3D&lg2=U%2BGCWk%2F75gdr5Q%3D%3D; tracknick=%5Cu6587%5Cu5316%5Cu6D41%5Cu6C130034; lgc=%5Cu6587%5Cu5316%5Cu6D41%5Cu6C130034; _tb_token_=e0f53e79ae87b; cookie2=20557b5beab95a7fae5fae630b2a1d87; tt=tmall-main; res=scroll%3A1065*7159-client%3A1065*712-offset%3A1065*7159-screen%3A1080*1920; cq=ccp%3D1; pnm_cku822=098%23E1hvovvUvbpvUpCkvvvvvjiPPFMUljt8PsMZ6jrCPmPh6jlPP2LpAjlhP2s9sjD8RuwCvvpvvUmmRphvCvvvvvvPvpvhMMGvvvyCvhQWaeWvClsh1jc6RqwiLO2v%2BE7rejwuYExr1CkKfvDr1WCl53DApbmxfwowd56eafmxfXk4jomxfwLwdiaABYkQD70OeB69AnLZeb8ruphvmvvv92jiGVZxkphvC99vvOH0pqyCvm9vvvCcS62sUQvvv31vpv9FvvvmjhCvjvUvvvUwphvwipvvv31vpvAyvphvC9vhvvCvpv%3D%3D; isg=BGNjUjQuPYEpj_Im8f93hjRe8qHN8HnHzXQasZXArUIx1IP2HSiH6kEEyqRa9E-S'
//   }
// }


// function searchGoods(key) {
//   // const url = `https://list.tmall.com/search_product.htm?q=${key}&type=p&vmarket=&spm=875.7931836%2FB.a2227oh.d100&from=mallfp..pc_1_searchbutton`
//   const url = `https://search.jd.com/Search?keyword=${key}&enc=utf-8&wq=mix&pvid=850fe0c5d8194184a997b3e1ba3cc635`
//   return new Promise(resolve => {
//     let chunks = []
//     https.get('https://otcbtc.com/sell_offers?currency=btm&fiat_currency=cny&payment_type=all', function(res){
//       // console.log(res)
//       res.on('data', function(chunk) {
//         console.log(chunk)
//         chunks.push(chunk)
//       })
//       res.on('end', function() {
//         const html = iconv.decode(Buffer.concat(chunks), 'gbk')
//         let $ = cheerio.load(html, {decodeEntities: false})
//         resolve(html)
//       })
//     })
//   })
// }
// function searchGoods(key) {
//   const url = 'https://search.jd.com/Search?keyword=mix&enc=utf-8&wq=mix&pvid=3e838465f9f64d58b9dd07bd5e61fcc7'
//   // const url = 'https://otcbtc.com/sell_offers?currency=eos&fiat_currency=cny&payment_type=all'
//   return new Promise(resolve => {
//     let chunks = []
//     request(url).on('data', function(response) {
//       chunks.push(response)
//     }).on('end', function() {
//       const html = iconv.decode(Buffer.concat(chunks), 'utf-8')
//       let $ = cheerio.load(html, {decodeEntities: false})
//       let goods = []
//       // console.log(html)
//       $('#J_main').each(function(idx, element) {
//         // console.log($(element).html())
//         let src = $(element).find('.p-img a img').attr('src') ? $(element).find('.productImg-wrap a img').attr('src') : $(element).find('.p-img a img').data('ks-lazyload')
//         goods.push({
//           platform: '京东',
//           name: $(element).find('.p-shop a').text(),
//           price: '￥' + $(element).find('.p-price i').text(),
//           desc: $(element).find('.p-name a').attr('title'),
//           picture: 'https:' + src,
//           type: decodeURIComponent(key),
//           route: 'http:' + $(element).find('.p-img a').attr('href'),
//         })
//         console.log(goods)
//         // operate.saveInfo(goods[goods.length - 1], 'searchInfo').then((res) => {
//         //   resolve(res)
//         // })
//       })
//   })
//   })
// }

// searchGoods(encodeURIComponent('mix'))
module.exports = {
  searchGoods
}
