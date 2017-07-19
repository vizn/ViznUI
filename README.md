# ViznUI v1.2.6

## Installation

Using npm:

```
$ npm install --save viznui
```

## Use as you would anything else:

```
import {Dialog, Toast} from 'viznui'


Dialog.snconfirm('标题', '取消', function(){
  Dialog.snalert('已取消')
}, '确认', function(){
  Dialog.snalert('已确认')
})

Dialog.snisok('标题', function(){
  Dialog.snalert('已确认')
})

Dialog.snalert()

Toast.loadPage('正在加载')

Toast.loadPage(0) //取消加载

Toast.loadUrl(window.loaction.href,'正在加载')
```
