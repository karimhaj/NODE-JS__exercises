const { createServer } = require("node:http"); 

function createApp(){
    return createServer((request, response)=>{

        response.statusCode = 200;

        response.setHeader("Content-Type", "text/html"); 

        response.end( "<html><h1>Welcome to World Wide Web!</h1></html>");
    })
}

module.exports = createApp; 