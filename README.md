# node-fetch-patch
a nodejs fetch polyfill/patch, ensures the availability across environments and versions. 

# How does it work?
import the <a target="_blank" href="https://raw.githubusercontent.com/Rednexie/node-fetch-patch/main/node-fetch-patch.js" download="node-fetch-patch.js">main file</a> (for v10.0 - 20.8.1)
```js
const fetch = require('./node-fetch-patch');
```
or the [other one](https://raw.githubusercontent.com/Rednexie/node-fetch-patch/main/node-fetch-patch-all.js) to use with nodejs versions below 10 (since async import is not available)
```js
const fetch = require('./node-fetch-patch-all');
```


<br>



- Firstly, the module checks if nodejs native fetch api (built-in) is supported.
- If not, it checks for a node-fetch installation(specifically below 2.6.1), and tries to do a CommonJS require.
- If it doesn't work, tries to import node-fetch with async import function. This works for the verions above 2.6.1.
- If any of those work, it installs node-fetch using node package manager, then restarts the script/console.

# How do I know where 'fetch' was imported from?
node-fetch-patch will add a some properties to let you know this:
- environment variable: `process.env.PATCHTYPE`
- global variable: `global.patchType`
- along with a property: `fetch.patchType`


For example, if the fetch function was imported from nodejs native fetch api:

```js
> console.log(fetch)
[AsyncFunction: fetch] { patchType: 0 }

> console.log(global.patchType)
0

> console.log(process.env.PATCHTYPE)
'0'
```

From node-fetch versions below 2.6.1 using CommonJS require:
```js
> console.log(fetch)
[AsyncFunction: fetch] { patchType: 2 }

> console.log(global.patchType)
2

> console.log(process.env.PATCHTYPE)
'2'
```

From node-fetch versions above 2.6.1 using async import (unavailable in `node-fetch-patch-all.js`):
```js
> console.log(fetch)
[AsyncFunction: fetch] { patchType: 3 }

> console.log(global.patchType)
3

> console.log(process.env.PATCHTYPE)
'3'
```
if no fetch function found (this means node-fetch-patch is installing it and will restart the main process or node console):
```js
> console.log(fetch)
{ patchType: undefined }

> console.log(global.patchType)
undefined

> console.log(process.env.PATCHTYPE)
undefined
```
Or if node-fetch-patch couldn't export the fetch function (mostly because of an error):
```js
> console.log(fetch)
{ patchType: null }

> console.log(global.patchType)
null

> console.log(process.env.PATCHTYPE)
'null'
```

