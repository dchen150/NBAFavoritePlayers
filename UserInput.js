
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
    let teamURL = '';
    let team = answers.team;
    let player = answers.name;

    setTeamURL(team)
    setTimeout(function () {
        if (this.teamURL !== '') {
            console.log(this.teamURL + 'finally got it');
        }
    }, 3500)

    //scrape.scrapePlayer(scrape.scrapeTeam(team), player);

})

function setTeamURL(team) {
    let scrape = new Scrape();
    this.teamURL = scrape.scrapeTeam(team);
    // return new Promise(async (resolve, reject) => {
    //     let scrape = new Scrape();
    //     teamURL = await scrape.scrapeTeam(team);

    //     if (teamURL !== '') {
    //         console.log(teamURL + 'wait wait wait hm')
    //         resolve("passed");
    //     } else {
    //         reject();
    //     }

    // })
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