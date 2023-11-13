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
