charIt('line');



async function charIt(graphType) {
    const data = await getData(12);
    const color = ['#ff6384', '#5959e6', '#2babab',
        '#8c4d15', '#8bc34a', '#607d8b', '#009688',
        '#000000', '#ffff00', 'e559e5'];
    const ctx = document.getElementById('chart').getContext('2d');
    const myChart = new Chart(ctx, {
        type: graphType,
        data: {
            labels: data.xs,
            datasets: [{
                label: 'Points',
                data: data.points,
                fill: false,
                backgroundColor: color[0],
                borderColor: color[0],
                borderWidth: 1
            }, {
                label: 'Assists',
                data: data.assists,
                fill: false,
                backgroundColor: color[1],
                borderColor: color[1],
                borderWidth: 1
            },
            {
                label: 'Minutes',
                data: data.minutes,
                fill: false,
                backgroundColor: color[2],
                borderColor: color[2],
                borderWidth: 1
            },
            {
                label: 'Field Goal %',
                data: data.fieldGoals,
                fill: false,
                backgroundColor: color[3],
                borderColor: color[3],
                borderWidth: 1
            },
            {
                label: 'Three Point %',
                data: data.threePoints,
                fill: false,
                backgroundColor: color[4],
                borderColor: color[4],
                borderWidth: 1
            },
            {
                label: 'Free Throw %',
                data: data.freeThrows,
                fill: false,
                backgroundColor: color[5],
                borderColor: color[5],
                borderWidth: 1
            },
            {
                label: 'Rebounds',
                data: data.rebounds,
                fill: false,
                backgroundColor: color[6],
                borderColor: color[6],
                borderWidth: 1
            },
            {
                label: 'Blocks',
                data: data.blocks,
                fill: false,
                backgroundColor: color[7],
                borderColor: color[7],
                borderWidth: 1
            },
            {
                label: 'Steals',
                data: data.steals,
                fill: false,
                backgroundColor: color[8],
                borderColor: color[8],
                borderWidth: 1
            },
            {
                label: 'Personal Fouls',
                data: data.personalFouls,
                fill: false,
                backgroundColor: 'rgb(255, 165, 0)',
                borderColor: 'rgb(255, 165, 0)',
                borderWidth: 1
            },
            {
                label: 'Turn Overs',
                data: data.turnOvers,
                fill: false,
                backgroundColor: 'rgb(255, 0, 255)',
                borderColor: 'rgb(255, 0, 255)',
                borderWidth: 1
            }]
        },
        options: {
            title: {
                display: true,
                text: 'Date of Game vs Stats Graph',

            },
            legend: {
                display: true,
                position: 'bottom'
            }
        }


    });
    async function getData(colIndex) {
        const xs = [];
        const minutes = [];
        const fieldGoals = [];
        const threePoints = [];
        const freeThrows = []
        const rebounds = [];
        const assists = [];
        const blocks = [];
        const steals = [];
        const personalFouls = [];
        const turnOvers = [];
        const points = [];
        const response = await fetch('./textfiles/stats.csv');
        const data = await response.text();
        console.log(data);

        const table = data.split('\n').slice(1);
        for (let i = table.length; i >= 0; i--) {
            if (table[i] !== undefined) {
                const cols = table[i].split(',');
                const date = cols[0];
                const opposition = cols[1];
                const minute = cols[2];
                const fieldGoal = cols[3];
                const threePoint = cols[4];
                const freeThrow = cols[5];
                const rebound = cols[6];
                const assist = cols[7];
                const block = cols[8];
                const steal = cols[9];
                const personalFoul = cols[10];
                const turnOver = cols[11];
                const point = cols[12];
                xs.push(date + '\n' + opposition);
                minutes.push(minute);
                fieldGoals.push(fieldGoal);
                threePoints.push(threePoint);
                freeThrows.push(freeThrow);
                rebounds.push(rebound);
                assists.push(assist);
                blocks.push(block);
                steals.push(steal);
                personalFouls.push(personalFoul);
                turnOvers.push(turnOver);
                points.push(point);
            }
        }
        return { xs, minutes, fieldGoals, threePoints, freeThrows, rebounds, assists, blocks, steals, personalFouls, turnOvers, points };
    }
}

