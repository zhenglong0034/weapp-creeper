const https = require('https')
const fs = require('fs')
const cheerio = require('cheerio')
const request = require('request')
const mysql = require('mysql')
const iconv = require('iconv-lite')
const operate = require('../tools/operate')

// const url = 'https://channel.jd.com/mensshoes.html'
const url = 'https://shouji.tmall.com/?spm=875.7931836/B.category2016015.1.1d4c4265P1i6UB&acm=lb-zebra-148799-667863.1003.4.708026&scm=1003.4.lb-zebra-148799-667863.OTHER_14561662186585_708026#J_floor4'

function creeper () {
  return new Promise(resolve => {
    https.get(url, function(sres) {
      console.log(url)
      var chunks = [];
      sres.on('data', function(chunk) {
        chunks.push(chunk);
      });
      // chunks里面存储着网页的 html 内容，将它zhuan ma传给 cheerio.load 之后
      // 就可以得到一个实现了 jQuery 接口的变量，将它命名为 `$`
      // 剩下就都是 jQuery 的内容了
      sres.on('end', function() {
        var titles = [];
        //由于咱们发现此网页的编码格式为gb2312，所以需要对其进行转码，否则乱码
        //依据：“<meta http-equiv="Content-Type" content="text/html; charset=gb2312">”
        var html = iconv.decode(chunks, 'utf-8');
        // console.log('===============', chunks)
        // console.log('++++++++++++++++', Buffer.concat(chunks))
        var $ = cheerio.load(html, {decodeEntities: false,ignoreWhitespace: true});
        // console.log($('#J_4954155005 .other textarea'))
        // console.log(html)
        // console.log(operate.selectInfo())
        $('.mui-zebra-module').each(function (idx, element) {
          var type = $(element).find('.focus-bd a').text() ? $(element).find('.focus-bd a').text() : $(element).find('.floor-focus p').text()
          console.log(type)
          $($($(element).find('textarea')).val()).find('li .mod-g').each((id, child) => {
            let src = $(child).find('a img').data('lazyload-src') ? $(child).find('a img').data('lazyload-src') : $(child).find('a img').data('ks-lazyload')
            let nextRoute = $(child).find('a').attr('href')
            titles.push({
              platform: '天猫',
              name: $(child).find('.mod-g-tit').text(),
              price: $(child).find('.mod-g-nprice').text().replace(/[^0-9]/g, ''),
              desc: $(child).find('.mod-g-desc').text(),
              picture: 'https:' + src + '_200x200Q90.jpg',
              type: type,
              route: 'http:' + nextRoute,
            })
            // console.log('-------====', titles[titles.length - 1])
            operate.saveInfo(titles[titles.length - 1], 'phoneInfo').then((res) => {
              resolve({res, leng: titles.length})
            })
          })
          // var $element = $(element);
        })
        // console.log('-------====', titles);
      });
    });
  })
}

module.exports = {
  creeper
}
