const request = require("request");
const cheerio = require("cheerio");

request('https://stats.nba.com/', (error, response, html) => {
    if (!error && response.statusCode == 200) {
        console.log("goodbye");
    } else {
        console.log("hello")
    }

});