const xlabels = [];
const ytemps = [];

chartIt();

async function chartIt() {
    await getData();
    const ctx = document.getElementById('chart').getContext('2d');
    Chart.defaults.global.defaultFontColor = 'white'
    Chart.defaults.global.animation.duration = 3000
    const myChart = new Chart(ctx, {
        type: 'line',
        padding: 10,
        data: {
            labels: xlabels,
            datasets: [{
                data: ytemps,
                fill: false,
                backgroundColor: 'rgba(0, 0, 255, 1)',
                borderColor: 'rgba(255, 255, 255, 1)',
                borderWidth: 3,
                trendlineLinear: {
                    style: "rgb(0 ,0 ,0, 1)",
                    lineStyle: "solid",
                    width: 3
                }
            }]
        },
        options: {
            title: {
                display: true,
                text: 'Global Average Temperature Changes'
            },
            legend: {

                display: false,
            },
            line: {
                pointRadius: 2,
                lineTension: 0,
                color: 'rgba(0, 0, 255, 1)'
            },
        }
    });
}
async function getData() {
    const response = await fetch('test.csv');
    const data = await response.text();

    const table = data.split('\n').slice(1);
    table.forEach(row => {
        const column = row.split(',');
        const year = column[0];
        xlabels.push(year);
        const temp = column[1];
        ytemps.push(parseFloat(temp) + 14);
    });
}