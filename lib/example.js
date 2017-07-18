import './style/popbox.css';
import {Dialog, Toast} from './'



Dialog.snconfirm('标题', '取消', function(){
  Dialog.snalert('已取消')
}, '确认', function(){
  Dialog.snalert('已确认')
})



// SN.snisok('标题', function(){
//   SN.snalert('已确认')
// })
//
// Dialog.snalert()
//
// Toa.loadPage('正在加载')
//
// Toa.loadPage(0) //取消加载
//
// Toa.loadUrl(window.loaction.href,'正在加载')
