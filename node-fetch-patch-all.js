let exported = {};
let patchType = null
process.env.PATCHTYPE = null;
global.patchType = null;

if(typeof global.fetch === "function"){
    // checking if the native fetch api is supported, if yes exporting it.
    //if this throws an error:
    // nodejs api's fetch function is not available.
    // trying node-fetch
    global.fetch.patchType = 0;
    exported = global.fetch;
    patchType = 0;
    process.env.PATCHTYPE = 0;
    global.patchType = 0;
}
else{
    // nodejs native fetch api not found, trying to use node-fetch
    try{
        require.resolve("node-fetch");
        const nodeFetch2 = require("node-fetch")
        exported = nodeFetch2
        // checking for node-fetch@=<2.6.1, if found exporting it.
        // if this throws an error:
        // this file will not try import, since its unavailable in versions before 10.0
        patchType = 2;
        process.env.PATCHTYPE = 2;
        global.patchType = 2;
    }
    catch(err){
         // using npm to install node-fetch
         patchType = undefined;
         delete process.env.PATCHTYPE;
         global.patchType = undefined;
         require("child_process").exec("npm install node-fetch", (err, stdout, stderr) => {
            if(err) console.error(err)
            if(stderr) console.log(stderr)
            if(stdout) console.log(stdout)
            if(!require.main){
                require("child_process").spawn(process.execPath, [],{
                    cwd: process.cwd (),
                    detached: true,
                    stdio: 'inherit'
                });
                console.log("[node-fetch-patch] restarting node console")
            }
            else{
                require("child_process").spawn(process.execPath, [require.main.filename],{
                    cwd: process.cwd (),
                    detached: true,
                    stdio: 'inherit'
                });
                console.log("[node-fetch-patch] restarting " + require.main.filename)
            }
        })
    }
}
// exporting the found fetch method
module.exports = exported
module.exports.patchType = patchType
