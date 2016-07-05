# bind-perf-test

> bind operation performance tests

## Install

```bash
npm i jeromedecoster/bind-perf-test
```

## Results with 3000000000 loops

| Action | Duration |
| :------ | :------- |
| **native** bind | ~3350 ms |
| **function** bind(ctx, fn) | ~3350 ms |

## TL;DR

Native binding is now as fast as the old workaround tip

```js
// native
this.binded = this.fn.bind(this)
```

vs

```js
// old workaround tip
function bind(ctx, fn) {
  return function() {
    return fn.apply(ctx, [].slice.call(arguments))
  }
}

this.binded = bind(this, this.fn)
```

##

## License

MIT
