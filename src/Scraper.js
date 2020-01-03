const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");
const writeStream = fs.createWriteStream('./textfiles/stats.csv')

// Write CSV headers
writeStream.write(`Date, Opposition, Minutes, FieldGoal%, ThreePoint%, FreeThrow%, Rebounds, Assists, Blocks, Steals, PersonalFouls, TurnOvers, Points \n`);

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
                        fs.writeFile('./textfiles/teamlink.txt', this.teamURL, (err) => {
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
                console.log('An error has occurred with espn.com/nba/players (possibly spelling of team name');
            }
        });
    }

    this.scrapePlayerURL = function (teamLink, playerName) {
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
                        fs.writeFile('./textfiles/playerlink.txt', output, (err) => {
                            if (err) {
                                throw err;
                            }
                            console.log('successfuly saved player link!');
                        })
                    }
                });
            } else {
                console.log("An error has occurred with the team link :(")
            }
        })
    }

    this.scrapePlayerGameLog = function (playerURL) {
        request(playerURL, (error, response, html) => {
            if (!error && response.statusCode == 200) {
                const $ = cheerio.load(html);
                let output = $('.Card.gamelogWidget.gamelogWidget--basketball')
                    .children()
                    .find('a')
                    .attr('href');
                output = 'https://www.espn.com' + output;
                console.log('player\'s game log URL request: ' + output);
                fs.writeFile('./textfiles/playerlink.txt', output, (err) => {
                    if (err) {
                        throw err;
                    }
                    console.log('successfuly saved player game log link!');
                })
            }
        })
    }

    this.scrapePlayerStats = function (gameLogURL) {
        request(gameLogURL, (error, response, html) => {
            if (!error && response.statusCode == 200) {
                const $ = cheerio.load(html);
                $('.Table__TR.Table__TR--sm.Table__even').each((i, el) => {
                    if ($(el).attr('class') !== 'totals_row fw-bold ttu Table__TR Table__TR--sm Table__even'
                        && $(el).children().first().text() !== 'Averages'
                        && $(el).children().first().text() !== 'Totals'
                        && $(el).children().length > 6) {
                        const date = $(el)
                            .children()
                            .first()
                        const opposition = date
                            .next()
                            .find('a')
                        const minutes = $(el)
                            .children()
                            .first()
                            .next()
                            .next()
                            .next()
                        const fieldGoal = minutes
                            .next()
                            .next();
                        const threePoint = fieldGoal
                            .next()
                            .next();
                        const freeThrow = threePoint
                            .next()
                            .next();
                        const rebounds = freeThrow.next();
                        const assists = rebounds.next();
                        const blocks = assists.next();
                        const steals = blocks.next();
                        const personalFouls = steals.next();
                        const turnOvers = personalFouls.next();
                        const points = turnOvers.next();
                        writeStream.write(`${date.text()}, ${opposition.text()}, ${minutes.text()}, ${fieldGoal.text()}, ${threePoint.text()}, ${freeThrow.text()}, ${rebounds.text()}, ${assists.text()}, ${blocks.text()}, ${steals.text()}, ${personalFouls.text()}, ${turnOvers.text()}, ${points.text()} \n`);
                    }

                })
                console.log('Scraping stats complete!');
            }
        })
    }
}
module.exports = Scraper;