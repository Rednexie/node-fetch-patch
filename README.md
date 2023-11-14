# node-fetch-patch
a patch of fetch function using node-fetch or nodejs api's native fetch method

# How does it work?
import the file
```js
const fetch = require('./node-fetch-patch');
```
- Firstly, the module checks if nodejs native fetch api (built-in) is supported.
- If not, it checks for a node-fetch installation(specifically below 2.6.1), and tries to do a CommonJS require.
- If it doesn't work, tries to import node-fetch with async import function. This works for the verions above 2.6.1.
- If any of those work, it installs node-fetch using node package manager.

# How do I know where 'fetch' was imported from?
node-fetch-patch will add a property to let you know this:
- environment variables `process.env.PATCHTYPE`
- global `global.patchType`
- fetch `fetch.patchType`


For example, if the fetch function was imported from nodejs native fetch api:

```js
> console.log(fetch)
[AsyncFunction: fetch] { patchType: 0 }
> console.log(global.patchType)
0
> console.log(process.env.PATCHTYPE<br>
0
```

From node-fetch versions below 2.6.1 using CommonJS require:
```js
[AsyncFunction: fetch] { patchType: 2 }
```
From node-fetch versions above 2.6.1 using async import:
```js
[AsyncFunction: fetch] { patchType: 3 }
```
if no fetch function found (this means node-fetch-patch is it and will restart the main process):
```js
{ patchType: undefined }
```
Or if node-fetch-patch couldn't export the fetch function (mostly because of an error):
```js
{ patchType: null }
```

