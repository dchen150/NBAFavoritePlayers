
const Scrape = require('./Scrape.js');
const inquirer = require('inquirer')


let questions = [{
    type: 'input',
    name: 'team',
    message: "Enter the team that your favorite player is on",
}, {
    type: 'input',
    name: 'name',
    message: "Enter your favorite player's first and last name (e.g. Derrick Rose)",
}]

inquirer.prompt(questions).then(answers => {
    // console.log(`${answers['team']}`);
    // console.log(`${answers['name']}`)
    let team = answers.team;
    let player = answers.name;

    setTeamURL(team).then((result) => {
        console.log(result + 'finally got it');
    })


    //scrape.scrapePlayer(scrape.scrapeTeam(team), player);

})

var setTeamURL = function (team) {
    return new Promise((resolve, reject) => {
        let scrape = new Scrape();
        let teamURL = scrape.scrapeTeam(team);
        if (teamURL !== null) {
            console.log(teamURL + 'wait wait wait ok hm')
            resolve(teamURL);
        } else {
            reject();
        }

    })
}


// const readline = require('readline');
// const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
// })

// rl.question('What team is your favorite player on? ', (answer) => {
//     console.log('your answer was' + answer);
//     rl.close();
// })