const timeout = require('raf-funcs/timeout')

var out = document.querySelector('p[out]')
var started = Date.now()
var count = 3000000000
// var count = 10000

//

// fast bind -- from https://github.com/component/bind
function bind(ctx, fn) {
  return function() {
    return fn.apply(ctx, [].slice.call(arguments))
  }
}

function Test1() {
  this.a = 'a'
  this.binded = bind(this, this.update)
}
Test1.prototype.update = function(b) {
  return this.a + '-' + b
}
Test1.prototype.compute = function() {
  return this.binded('b')
}

function Test2() {
  this.a = 'c'
  this.binded = this.update.bind(this)
}
Test2.prototype.update = function(b) {
  return this.a + '-' + b
}
Test2.prototype.compute = function() {
  return this.binded('d')
}

//

function test1() {
  return new Promise(function(resolve) {
    var now = Date.now()
    var t1 = new Test1
    var res
    for (var i = 0; i < count; i++) {
      res = t1.update('b')
    }

    log('test1: ' + (Date.now() - now) + ' res:' + res)
    next(resolve)
  })
}

function test2() {
  return new Promise(function(resolve) {
    var now = Date.now()
    var t2 = new Test2
    var res
    for (var i = 0; i < count; i++) {
      res = t2.update('b')
    }

    log('test2: ' + (Date.now() - now) + ' res:' + res)
    next(resolve)
  })
}

//

function log(msg) {
  if (out.innerHTML == '...') {
    out.innerHTML = msg
  } else {
    out.innerHTML = out.innerHTML + '<br>' + msg
  }
}

function next(cb) {
  timeout(cb, 100)
}

function start() {
  return new Promise(function(resolve) {
    log('started')
    next(resolve)
  })
}

function wait(dash) {
  return function() {
    return new Promise(function(resolve) {
      if (dash === true) log('---')
      next(resolve)
    })
  }
}

Promise.resolve()
.then(start)
.then(wait(true))

.then(test1)
.then(wait)
.then(test1)
.then(wait)
.then(test1)
.then(wait)
.then(test2)
.then(wait)
.then(test2)
.then(wait)
.then(test2)
.then(wait(true))

.then(function() {
  log('done in: ' + (Date.now() - started))
})
