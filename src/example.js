

import {Dialog, Toast} from './'

const SN = new Dialog()
const Toa = new Toast()

// SN.snisok('标题', function(){
//   SN.snalert('已确认')
// })
SN.snconfirm('标题', '', function(){
  SN.snalert()
}, '', function(){
  Toa.loadPage('正在加载')
})
// setTimeout(function(){
//   Toa.loadPage(0)
// }, 3000)
//
// element.innerHTML = '<div class="' + styles.className + '">';
