// A function that takes a mysql url and returns an object with host, port, user, password, and database properties
function convert(url) {
    // Use the built-in URL module to parse the url
    const { URL } = require('url');
    const parsed = new URL(url);
  
    // Extract the relevant parts from the parsed url
    const host = parsed.hostname;
    const port = parsed.port || 3306; // Use the default port if not specified
    const user = parsed.username;
    const password = parsed.password;
    const database = parsed.pathname.slice(1); // Remove the leading slash
  
    // Return an object with the extracted properties
    return { host, port, user, password, database };
  }
  
  module.exports = convert