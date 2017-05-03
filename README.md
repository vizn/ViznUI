# ViznUI v1.0.0

## Installation

Using npm:

```
$ npm install --save viznui
```

## Use as you would anything else:

```
import {Dialog, Toast} from './'

const SN = new Dialog()
const Toa = new Toast()

SN.snconfirm('标题', '取消', function(){
  SN.snalert('已取消')
}, '确认', function(){
  SN.snalert('已确认')
})

SN.snisok('标题', function(){
  SN.snalert('已确认')
})

SN.snalert()

Toa.loadPage('正在加载')

Toa.loadUrl(window.loaction.href,'正在加载')
```
