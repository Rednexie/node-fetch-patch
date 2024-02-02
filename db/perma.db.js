// Import perma.db
const { PermaDB } = require("perma.db");

const db = new PermaDB({
    minimize: true,
    memory: false
})

module.exports = () => {
    return new Promise(resolve => {
        resolve(db)
    })
}