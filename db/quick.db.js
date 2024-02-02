const { QuickDB } = require('quick.db');
const db = new QuickDB({ filePath: '../quick.db' });
module.exports = () => {
    return new Promise(resolve => {
        resolve(db)
    })
}