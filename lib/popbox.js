
function Sntouch(){
  this.rBlur = function() {
      if (this.checkDetect().system == "android") {
          var b = document.createElement("style");
          b.type = "text/css";
          b.id = "rBlur";
          b.innerHTML = "*{-webkit-tap-highlight-color:rgba(0,0,0,0)}";
          document.body.appendChild(b)
      }
  }
  this.checkDetect = function() {
      var h = {
          webkit: /(AppleWebKit)[ \/]([\w.]+)/,
          ipad: /(ipad).+\sos\s([\d+\_]+)/i,
          windows: /(windows\d*)\snt\s([\d+\.]+)/i,
          iphone: /(iphone)\sos\s([\d+\_]+)/i,
          ipod: /(ipod).+\sos\s([\d+\_]+)/i,
          android: /(android)\s([\d+\.]+)/i
      };
      var e = window.navigator.userAgent,
          c = h.webkit.exec(e),
          f = /\((iPhone|iPad|iPod)/i.test(e),
          d = [],
          g = {},
          b = [];
      for (var i in h) {
          b = h[i].exec(e);
          if (b) {
              d = h[i].exec(e)
          }
      }
      g = {
          system: d[1].toLowerCase(),
          version: d[2].replace(/(\_|\.)/ig, ".").toLowerCase(),
          browser: c ? c[1].toLowerCase() : "apple/webkit",
          ios: f
      };
      return g
  }
  this.HTMLRemove = function() {
      var t = document.getElementById("TouchPopbox");
      if (t)
          t.parentNode.removeChild(t);
  }
}
function Popbox(b){
  Sntouch.call(this)
  this.settings = b || {};
  this.html = this.settings.html || "";
  this.contentId = this.settings.contentId || "";
  this.title = this.settings.title || "提示框";
  this.type = this.settings.type || "fullscreen";
  this.cancelText = this.settings.cancelText || '取消';
  this.submitText = this.settings.submitText || '确认';
  this.callback = this.settings.callback ||
      function () {
      };
  this.submitCallback = this.settings.submitCallback ||
      function () {
      };
  this.cancel = this.settings.cancel ||
      function () {
      };
  this.loadTime = this.settings.loadTime || 800;

  this.initializer = function() {
      var b = this;
      var t = document.getElementById("TouchPopbox");
      b.winH = window.document.documentElement.clientHeight;
      var popbox = document.createElement('div')
      var popinner = document.createElement('div')
      var btnsubmit = document.createElement('div')
      var btncancel = document.createElement('div')
      var msg = document.createElement('div')
      var popsubmit = document.createElement('a')
      var popcancel = document.createElement('a')
      popbox.setAttribute('id', 'TouchPopbox')
      popbox.setAttribute('class', 'touch-popbox')
      popinner.setAttribute('id', 'popinner')
      msg.setAttribute('class', 'msg')
      btnsubmit.setAttribute('class', 'btn btn-sn-b')
      popsubmit.setAttribute('id', 'popsubmit')
      btncancel.setAttribute('class', 'btn btn-sn-d')
      popcancel.setAttribute('id', 'popcancel')

      switch (b.type) {
        case 'fullscreen':
          popbox.setAttribute('class', 'touch-popbox touch-popbox-mask000')
          popbox.append(msg)
          break;
        case 'confirm':
          popcancel.append(b.cancelText)
          popsubmit.append(b.submitText)
          btncancel.append(popcancel)
          btnsubmit.append(popsubmit)
          msg.append(b.title)
          popinner.append(msg, btncancel, btnsubmit)
          popbox.append(popinner)
          break;
        case 'isok':
          popsubmit.append(b.submitText)
          btnsubmit.append(popsubmit)
          msg.append(b.title)
          popinner.append(msg, btnsubmit)
          popbox.append(popinner)
          break;
        default:
          popbox.setAttribute('class', 'touch-inner-popbox hide')
          msg.setAttribute('id', 'Pop_Content')
          msg.append(b.title)
          popbox.append(msg)
      }
      b.html = popbox
      b.systemComfirm();
      if (b.system) {
          return
      }
      if (!t) {
          document.body.appendChild(b.html)
          b.rBlur()
      }
      if (b.type != "fullscreen" && b.type != "confirm" && b.type != "isok") {
          b.mini()
      } else {
          b.start();
          var btn = document.getElementById('popcancel')
          if(btn){
            btn.addEventListener('click', function(){
              b.end()
            });
          }
          var popsubmit = document.getElementById('popsubmit')
          if(popsubmit){
            popsubmit.addEventListener('click', function(){
              b.submit()
            })
          }
      }
  }
  this.start = function() {
      var b = this;
      var c = document.getElementById("TouchPopbox");
      // c.style.-webkit-transform-origin = window.document.documentElement.clientHeight / 2 + "px";
      c.style.display = 'block'
      var content = document.getElementById(b.contentId)
      if(content){
          document.getElementById("Pop_Content").innerHTML = content
          content.style.display = 'block'
          content.style.position = 'fixed'
          content.style.width = '100%'
          content.style.left = (document.body.offsetWidth  - content.offsetWidth) / 2 + 'px'
          content.style.top = document.body.scrollTop + window.document.documentElement.clientHeight / 2 - content.clientHeight / 2 + 'px'
      }
      c.style.minHeight = b.winH + "px";
      var popinner = document.getElementById('popinner')
      if (popinner) {
          popinner.style.left = (document.body.offsetWidth - popinner.offsetWidth) / 2 + 'px'
          popinner.style.top = document.body.scrollTop + window.document.documentElement.clientHeight / 2 - popinner.clientHeight / 2 + 'px'
      }
  }
  this.end = function() {
      var b = this;
      b.HTMLRemove();
      b.cancel();
  }
  this.submit = function() {
      var b = this;
      b.HTMLRemove();
      if (b.submitCallback) {
          b.submitCallback()
      }
  }
  this.mini = function() {
      var b = this;
      var c = document.getElementById('TouchPopbox');
      if (b.cls) {
          c.classList.add(b.cls)
      }
      if(c){
        c.classList.add('popIn')
        c.style.left = (document.body.offsetWidth- c.clientWidth) / 2 + 'px'
        c.style.top = document.body.scrollTop + (window.document.documentElement.clientHeight - c.clientHeight) / 2 + 'px'
        setTimeout(function(){
          c.classList.add('popOut')
        }, 3000)
      }
  }
  this.systemComfirm = function () {
      var c = this.systemSettings;
      if (!this.system) {
          return
      }
      var b = {
          str: "",
          ok: function () {
          },
          cancel: function () {
          }
      }
      b = Object.assign(b, c)
      if (confirm(b.str)) {
          b.ok()
      } else {
          b.cancel()
      }
  }

  this.initializer();
}
function Dialog(){
  Sntouch.call(this);
  //提示框输出
  this.snalert = function(tit) {
      this.HTMLRemove();
      new Popbox({title: tit, type: "inner"});
  }
  //对话框输出
  this.snconfirm = function(tit, cancelText, cancelCallback, submitText, submitCallback){
    this.HTMLRemove();
    new Popbox({
      title: tit,
      type: "confirm",
      cancelText: cancelText,
      cancel: cancelCallback,
      submitText: submitText,
      submitCallback: submitCallback});
  }
  //对话框输出
  this.snisok = function(tit, fun) {
    this.HTMLRemove();
    new Popbox({title: tit, type: "isok", submitCallback: fun});
  }
  this.fullscreen =function(){
    this.HTMLRemove();
    new Popbox({type: "fullscreen"});
  }
}
//加载动画
function Toast(){
  Sntouch.call(this)
  this.start = function(txt){
    var divProgress = document.createElement('div');
    divProgress.setAttribute('id', 'progress');
    divProgress.setAttribute('style', 'z-index:10001; left:');
    divProgress.append(txt);
    document.body.append(divProgress);
    var progress = document.getElementById('progress');
    if(progress){
      progress.style.left = (document.body.offsetWidth  - progress.offsetWidth) / 2 + 'px'
      progress.style.top = document.body.scrollTop + window.document.documentElement.clientHeight / 2 - progress.clientHeight / 2 + 'px'
    }
    this.HTMLRemove();
    new Popbox({type: "fullscreen"});
  }
  //数据加载动画
  this.loadPage = function(txt) {
    if (txt) {
      this.start(txt);
    } else {
      this.HTMLRemove();
      var progress = document.getElementById('progress');
      if(progress){
        progress.parentNode.removeChild(progress)
      }
    }
  }
  //地址加载动画
  this.loadUrl = function(url, txt) {
    if(!txt){
      txt = '正在加载'
    }
    if(url && txt){
      this.start(txt);
      if (document.layers)
          document.write('<Layer src="' + url + ' " VISIBILITY="hide" > </Layer>');
      else if (document.all)
          document.write('<iframe src="' + url + '" style="visibility: hidden;"></iframe>');
      else window.location.href = url;
    }
  }
}

module.exports = {Toast: new Toast(), Dialog: new Dialog()}
