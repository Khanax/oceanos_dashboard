window.chartColors = {
    red: 'rgb(255, 50, 32)',
    orange: 'rgb(255, 159, 64)',
    yellow: 'rgb(255, 205, 86)',
    green: 'rgb(75, 192, 92)',
    blue: 'rgb(54, 162, 235)',
    purple: 'rgb(153, 102, 255)',
    grey: 'rgb(201, 203, 207)',
    black: 'rgb(0,0,0)',
    white:'rgb(255,255,255)'
};

function rgbToHex(rgb_color) {
    var res = rgb_color.split("rgb(")[1].split(")")[0].split(",");
    [r,g,b] = [parseInt(res[0]),parseInt(res[1]),parseInt(res[2])];
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

$(document).ready(function(){
    var presets = window.chartColors;
    var speed_gauge;
    speed_gauge = new JustGage({
        id: "speed_gauge",
        title: "Ship Speed",
        label: "KN",
        titleFontColor: presets.black,
        valueFontColor : presets.black,
        gaugeColor : presets.white,
        labelFontColor : presets.black,
        levelColors: [
            rgbToHex(presets.green),
            rgbToHex(presets.yellow),
            rgbToHex(presets.orange),
            rgbToHex(presets.red)
        ],  
        titleMinFontSize: 20,
        decimals: true,
        pointer: true,
        value: 0,
        min: 0,
        max: 10,
        gaugeWidthScale: 0.3,
        counter: true,
        hideInnerShadow: true,
    });
    var engine_gauge;
    engine_gauge= new JustGage({
        id: "engine_gauge",
        title: "Engine RPM",
        label: "RPM",
        titleFontColor: presets.black,
        valueFontColor : presets.black,
        gaugeColor : presets.white,
        labelFontColor : presets.black,
        levelColors: [
            rgbToHex(presets.green),
            rgbToHex(presets.yellow),
            rgbToHex(presets.orange),
            rgbToHex(presets.red)
        ],  
        titleMinFontSize: 20,
        pointer: true,
        value: 0,
        min: 0,
        max: 2200,
        gaugeWidthScale: 0.63,
        counter: true,
        hideInnerShadow: true,
    });

    var g3;
    g3 = new JustGage({
        id: "g3",
        title: "Engine Temp",
        label: "K",
        titleFontColor: "white",
        titleMinFontSize: 20,
        pointer: true,
        value: 0,
        min: 0,
        max: 2200,
        gaugeWidthScale: 0.3,
        counter: true,
        hideInnerShadow: true,
    });

    var g4;
    g4 = new JustGage({
        id: "g4",
        title: "Battery Temp",
        label: "K",
        titleFontColor: "white",
        titleMinFontSize: 20,
        pointer: true,
        value: 0,
        min: 0,
        max: 2200,
        gaugeWidthScale: 0.3,
        counter: true,
        hideInnerShadow: true,
    });
    var chart1;
    chart1 = new Chart(document.getElementById("line-chart"), {
        type: 'line',
        data: {
            labels: [],
            datasets: [{ 
                data: [],
                label: speed_gauge.config.title,
                borderColor: presets.black,
                backgroundColor: presets.white,
                fill: 'start'
                }
            ]
        },
        options: {
            scales: {
                xAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Time'
                    }
                }],
                yAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Speed'
                    },
                    ticks: {
                        beginAtZero: true,
                        stepSize: 1,
                        min: speed_gauge.config.min,
                        max: speed_gauge.config.max,
                    }
                }]
            },
            title: {
                display: true,
                text: 'World population per region (in millions)'
            }
        }
        });
    var chart2;
    chart2 = new Chart(document.getElementById("line-chart2"), {
        type: 'line',
        data: {
            labels: [],
            datasets: [{ 
                data: [],
                label: engine_gauge.config.title,
                borderColor: presets.black,
                backgroundColor: presets.white,
                fill: 'start'
                }
            ]
        },
        options: {
            scales: {
                xAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Time'
                    }
                }],
                yAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Speed'
                    },
                    ticks: {
                        beginAtZero: true,
                        stepSize: 200,
                        min: engine_gauge.config.min,
                        max: engine_gauge.config.max,
                    }
                }]
            },
            title: {
                display: true,
                text: 'World population per region (in millions)'
            }
        }
        });
    var i=0;
    values_to_show = 20
    setInterval(function() {
        speed_gauge.refresh((Math.random() * (8.8 - 7.8) + 7.8).toFixed(1));
        engine_gauge.refresh(getRandomInt(1700, 1800));
        chart1.config.options.scales.xAxes[0].ticks.min=i-values_to_show
        chart2.config.options.scales.xAxes[0].ticks.min=i-values_to_show
        chart1.config.data.labels.push(i)
        chart2.config.data.labels.push(i)
        chart1.config.data.datasets[0].data.push(speed_gauge.config.value)
        chart2.config.data.datasets[0].data.push(engine_gauge.config.value)
        
        if (speed_gauge.config.value<0.25*speed_gauge.config.max){
            chart1.config.data.datasets[0].backgroundColor = presets.green
        }else if (0.25*speed_gauge.config.max<=speed_gauge.config.value && speed_gauge.config.value<0.5*speed_gauge.config.max){
            chart1.config.data.datasets[0].backgroundColor = presets.yellow
        }else if (0.5*speed_gauge.config.max<=speed_gauge.config.value && speed_gauge.config.value<0.75*speed_gauge.config.max){
            chart1.config.data.datasets[0].backgroundColor = presets.orange
        }else if (0.75*speed_gauge.config.max<=speed_gauge.config.value && speed_gauge.config.value<=speed_gauge.config.max){
            chart1.config.data.datasets[0].backgroundColor = presets.red
        }
        chart1.update();
        chart2.update();
        //g3.refresh(getRandomInt(1700, 1800));
        //g4.refresh(getRandomInt(1700, 1800));
        i++;
      }, 1000);
});