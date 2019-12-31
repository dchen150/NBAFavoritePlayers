const request = require("request");
const cheerio = require("cheerio");



var props = {
    teamURL: ''
}

function Scrape() {

}

//EFFECTS: given name of a team, return the href of the team on espn.com/nba/players
Scrape.prototype.scrapeTeam = function (team) {
    setURL(team).then((result) => {
        if (result !== '') {
            console.log(result + 'pls work');
            return result;
        }
    })


}

// sets the playerURL to the team requested
var setURL = function (team) {
    return new Promise((resolve, reject) => {
        request('http://www.espn.com/nba/players', (error, response, html) => {
            if (!error && response.statusCode == 200) {
                const $ = cheerio.load(html);
                $('li').each((i, el) => {
                    const liElement = $(el).text();
                    if (liElement.toLowerCase().includes(team.toLowerCase())) {
                        let output = $(el)
                            .children()
                            .next()
                            .children('a')
                            .attr('href');
                        props.teamURL = 'https://www.espn.com' + output;
                        resolve(props.teamURL);
                        console.log(props.teamURL);

                    }
                });
            } else {
                console.log('An error has occurred with espn.com/nba/players');
                reject();
            }
        });
    })

}


//EFFECTS: given the url of the team that a player is on and the player, returns
// the url of stats for that player 
Scrape.prototype.scrapePlayer = function (teamURL, player) {
    request('https://www.espn.com/nba/team/roster/_/name/ny/new-york-knicks', (error, response, html) => {
        if (!error && response.statusCode == 200) {
            const $ = cheerio.load(html);
            let url = "";
            $('.Table__TR.Table__TR--lg.Table__even').each((i, el) => {
                const rowElement = $(el).text();
                console.log(rowElement);
            });
        }
    })

}

module.exports = Scrape;



// request('https://www.espn.com/nba/stats', (error, response, html) => {
//         if (!error && response.statusCode == 200) {
//             const $ = cheerio.load(html);
//             // const offensiveHeader = $('.Table__TR.Table__TR--sm.Table__even');
//             //console.log(offensiveHeader.html());
//             // console.log(offensiveHeader.text());
//             // const output = offensiveHeader.find('div').text();

//             // console.log(output);

//             //const names = $('.headshot.inline-block.relative.TableHeadshot.stats-headshot.headshot--sm.athlete.silo');
//             const names = $('.AnchorLink.flex.items-center');
//             // $('.AnchorLink.flex.items-center').each((i, name) => {
//             //     const item = $(name).text();
//             //     console.log(item);
//             // })
//             // console.log(names.text());

//             const headers = $('.Table__Title.remove_capitalize.pt2');
//             $('.Table__Title.remove_capitalize.pt2').each((i, el) => {
//                 const item = $(el).text();
//                 console.log(item);
//             })
//         }

//     });