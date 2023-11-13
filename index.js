let exported = null;
if(typeof global.fetch == "function"){
    // checking if the native fetch api is supported, if yes exporting it.
    //if this throws an error:
    // nodejs api's fetch function is not available.
    // trying node-fetch
    exported = global.fetch;
}
else{
    // nodejs native fetch api not found, trying to use node-fetch
    try{
        require.resolve("node-fetch");
        const nodeFetch2 = require("node-fetch")
        exported = nodeFetch2
        // checking for node-fetch@=<2.6.1, if found exporting it.
        // if this throws an error:
        // commonJS require for node-fetch is not available, so node-fetch doesn't exist or its version is higher than 2.6.1 
        // trying to import node-fetch using commonJS import
    }
    catch(err){
        try{
            require.resolve("node-fetch")
            const nodeFetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
            exported = nodeFetch;
            // if this throws an error:
            // any version of node-fetch or native fetch api is not available 
            // trying to install node-fetch with node package manager
        }
        catch(error){
            console.log('native fetch api not found.')
            console.log('module node-fetch not found, installing...')
            // using npm to install node-fetch
            require("child_process").exec("npm install node-fetch", (err, stdout, stderr) => {
                if(err) console.error(err)
                if(stderr) console.log(stderr)
                if(stdout) console.log(stdout)
            })
        }
    }
}
// exporting the found fetch method
module.exports = exported
