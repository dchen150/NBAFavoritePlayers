
const Scrape = require('./Scrape.js');
const inquirer = require('inquirer');

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
    let team = answers.team;
    let scrape = new Scrape();
    scrape.scrapeTeam(team);

})