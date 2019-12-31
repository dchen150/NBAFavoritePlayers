
const Scraper = require('./Scraper.js');
const inquirer = require('inquirer');
const fs = require("fs");


let questions = [{
    type: 'input',
    name: 'team',
    message: "Enter the team that your favorite player is on",
}, {
    type: 'input',
    name: 'name',
    message: "Enter your favorite player's first and last name (e.g. Derrick Rose)",
}]

inquirer.prompt(questions).then((answers) => {

    let team = answers.team;
    let player = answers.name;

    let scraper = new Scraper();
    scraper.scrapeTeamURL(team);
    let teamURL = '';
    setTimeout(() => {
        teamURL = fs.readFileSync('teamlink.txt', 'utf8');
        console.log('team URL obtained: ' + teamURL);
        scraper.scrapePlayer(teamURL, player);
        setTimeout(() => {
            playerURL = fs.readFileSync('playerlink.txt', 'utf8');
            console.log('player URL obtained: ' + playerURL)
        }, 1500);

    }, 1000)

})











// console.log(`${answers['team']}`);
    // console.log(`${answers['name']}`)





// var setTeamURL = function (team) {

//     return new Promise((resolve, reject) => {
//         let scrape = new Scrape();
//         scrape.scrapeTeam();
//         if (teamURL !== null) {
//             console.log(teamURL + 'wait wait wait ok hm')
//             resolve(teamURL);
//         } else {
//             reject();
//         }

//     })
// }


// const readline = require('readline');
// const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
// })

// rl.question('What team is your favorite player on? ', (answer) => {
//     console.log('your answer was' + answer);
//     rl.close();
// })