const fetch = require("../node-fetch-patch")

    if(fetch.patchType === 0) console.log('using nodejs native fetch api')
    if(fetch.patchType === 2) console.log('using node-fetch with require')
    if(fetch.patchType === 3) console.log('using node-fetch with import')
    if(typeof fetch.patchType !== "number") console.log('no fetch installation found')
