import Chart from 'chart.js';
import $ from 'jquery';

$.extend(Chart.defaults.global, {
    defaultFontFamily: 'GothamBook'
});

const costScenes = [
    {
        text: 'Wahlen sind nicht billig. Der gesamte Wahlkampf über drei Wahlrunden wird Alexander Van der Bellen etwa 4,7 und Norbert Hofer 5,4 Millionen € kosten (Prognose).',
        label: 'Mio. €',
        labels: ['Van der Bellen gesamt', 'Hofer gesamt'],
        data: [4.7, 5.4]
    },
    {
        text: 'Laut offiziellen Angaben sind bei Van der Bellen 2,7 Millionen in die ersten beiden Wahlgänge geflossen. Bei Hofer waren es um 700.000 Euro mehr.',
        label: 'Mio. €',
        labels: ['Van der Bellen gesamt', 'Hofer gesamt', 'VdB - Wahlgang 1&2', 'Hofer - Wahlgang 1&2'],
        data: [4.7, 5.4, 2.7, 3.4]
    },
    {
        text: 'Für die Wahlwiederholung haben beide Kandidaten Schätzungen von 1,5 bis 2 Millionen Euro abgegeben.',
        label: 'Mio. €',
        labels: ['Van der Bellen gesamt', 'Hofer gesamt', 'VdB - Wahlgang 1&2', 'Hofer - Wahlgang 1&2', 'VdB - Wahl-Wh. (Plan)', 'Hofer - Wahl-Wh. (Plan)'],
        data: [4.7, 5.4, 2.7, 3.4, 2, 2]
    },
    {
        text: 'Dazu kommen die Kosten, die der Republik direkt entstehen. Alleine für die Wiederholungswahl kosten die Drucksorten ca. 2,2 Millionen. Die Gemeinden fürchten Kosten von etwa 8 Millionen.',
        label: 'Mio. €',
        labels: ['VdB - Wahl-Wh. (Plan)', 'Hofer - Wahl-Wh. (Plan)', 'Drucksorten', 'Gemeinden'],
        data: [2, 2, 2.2, 8]
    },
    {
        text: 'Der Republik kostet die Wiederholung also mehr als 10 Millionen Euro - zusätzlich zu den Ausgaben der Kandidaten, die teilweise auch mit Stuergeldern finanziert werden. (Parteiförderung etc.)',
        label: 'Mio. €',
        labels: ['VdB - Wahl-Wh. (Plan)', 'Hofer - Wahl-Wh. (Plan)', 'Drucksorten', 'Gemeinden', 'Republik - Wahl-Wh. gesamt'],
        data: [2, 2, 2.2, 8, 10.2]
    },
    {
        text: 'Insgesamt kann davon ausgegangen werden, dass also mindestens 14 Millionen für den Wahlgang im September ausgegeben werden. Zum Vergleich: Etwa genauso viel erhält der Schiverband ÖSV (aktuellste Zahlen 2011) an staatlichen Förderungen.',
        label: 'Mio. €',
        labels: ['VdB - Wahl-Wh. (Plan)', 'Hofer - Wahl-Wh. (Plan)', 'Republik - Wahl-Wh. gesamt', 'ÖSV - Förderung'],
        data: [2, 2, 10.2, 14]
    }
];

function BarchartScenes(container, scenes) {
    const $el = $(`
<div class="chartjs">
<div class="chartjs__controls">
<a class="chartjs__button chartjs__left" href="#">
<svg title="Zurück"><use xlink:href="#arrowLeft" xmlns:xlink="http://www.w3.org/1999/xlink"></use></svg>
</a>
<div class="chartjs__text" />
<a class="chartjs__button chartjs__right" href="#">
<svg title="Zurück"><use xlink:href="#arrowRight" xmlns:xlink="http://www.w3.org/1999/xlink"></use></svg>
</a>
</div>
<canvas class="chartjs__chart" />
</div>
`);
    
    $(container).append($el);
    
    const $canvas = $el.find('.chartjs__chart');
    const $left = $el.find('.chartjs__left');
    const $right = $el.find('.chartjs__right');
    const $text = $el.find('.chartjs__text');

    let currentSceneIndex = 0;

    function buildData(sceneIndex) {
        const scene = scenes[sceneIndex];
        
        const dataset = $.extend({
            backgroundColor: 'rgba(170, 170, 170, 0.5)',
            borderColor: '#aaa',
            borderWidth: 2
        }, scene);

        delete dataset.text;
        delete dataset.labels;
        
        return {
            labels: scene.labels,
            datasets: [dataset]
        };
    }

    const chart = new Chart($canvas, {
        type: 'bar',
        data: buildData(0),
        options: {
            onResize(controller, {width}) {
                if(width < 400) {
                    this.scales.xAxes[0].ticks.fontSize = 9;
                } else {
                    this.scales.xAxes[0].ticks.fontSize = this.defaultFontSize;
                }
            },
            responsive: true,
            maintainAspectRatio: false,
            legend: {
                display: false
            },
            scales: {
                xAxes: [{
                    ticks: {
                        fontSize: $(window).width() < 480 ? 9 : 12,
                    },
                    gridLines: {
                        display: false
                    }
                }],
                yAxes: [{
                    ticks: {
                        min: 0,
                        maxTicksLimit: 7
                    }
                }]
            }
        }
    });
    
    $text.text(scenes[currentSceneIndex].text);

    function update(e, newIndex) {
        e.preventDefault();
        
        $.extend(chart.data, buildData(newIndex));
        chart.update();
        $text.text(scenes[newIndex].text);
        
        currentSceneIndex = newIndex;
    }
    
    $left.click(e => update(e, currentSceneIndex-1));
    
    $right.click(e => update(e, currentSceneIndex+1));
}

BarchartScenes($('#bar-costs'), costScenes);
