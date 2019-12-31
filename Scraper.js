const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");




function Scraper() {

    this.scrapeTeamURL = function (teamName) {

        request('http://www.espn.com/nba/players', (error, response, html) => {
            if (!error && response.statusCode == 200) {
                const $ = cheerio.load(html);
                $('li').each((i, el) => {
                    const liElement = $(el).text();
                    if (liElement.toLowerCase().includes(teamName.toLowerCase())) {
                        let output = $(el)
                            .children()
                            .next()
                            .children('a')
                            .attr('href');
                        this.teamURL = 'https://www.espn.com' + output;
                        console.log('team\'s URL request: ' + this.teamURL);
                        fs.writeFile('teamlink.txt', this.teamURL, (err) => {
                            if (err) {
                                throw err;
                            }
                            console.log('successfuly saved team link!');
                        })

                    }
                });
                if (this.teamURL == undefined) {
                    console.log(teamName + ' was not found. Please try again.');
                }
            } else {
                console.log('An error has occurred with espn.com/nba/players');
            }
        });
    }

    this.scrapePlayer = function (teamLink, playerName) {
        request(teamLink, (error, response, html) => {
            if (!error && response.statusCode == 200) {
                const $ = cheerio.load(html);
                $('.Table__TR.Table__TR--lg.Table__even').each((i, el) => {
                    const rowElement = $(el).text();
                    if (rowElement.toLowerCase().includes(playerName.toLowerCase())) {
                        let output = $(el)
                            .find('.AnchorLink')
                            .attr('href');
                        this.playerURL = output;
                        console.log('player\'s URL request: ' + this.playerURL);

                        fs.writeFile('playerlink.txt', output, (err) => {
                            if (err) {
                                throw err;
                            }
                            console.log('successfuly saved player link!');
                        })
                    }
                });
            }
        })
    }
}
module.exports = Scraper;