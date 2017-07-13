const $ = require('jquery');
const tinycolor = require('tinycolor2');
const merge = require('lodash/merge');

// optional dependency
let Chart = null;
try {
    Chart = require('chart.js');
} catch (e) {}

const colors = require('../utils/colors');

function ChartSlideshow(container, { type, attribution, min, max, scenes }) {
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
<div class="attribution rmb2"></div>
</div>
`);

    $(container).append($el);

    const $canvas = $el.find('.chartjs__chart');
    const $left = $el.find('.chartjs__left');
    const $right = $el.find('.chartjs__right');
    const $text = $el.find('.chartjs__text');
    const $attribution = $el.find('.attribution');

    let currentSceneIndex = 0;

    if (attribution) {
        $attribution.text(attribution);
    } else {
        $attribution.hide();
    }

    function buildData(sceneIndex) {
        const scene = scenes[sceneIndex];

        scene.valueKeys = scene.valueKeys || ['value'];

        const highlightColors = {
            petrol: colors.petrol300,
            red: colors.red300,
            light: colors.grey200
        };

        let datasets = null;
        if (type === 'bar') {
            datasets = scene.valueKeys.map(key => {
                return {
                    label: scene.labels[key],
                    backgroundColor: scene.chartData.map(d => {
                        const baseColor = d.highlight
                            ? highlightColors[d.highlight]
                            : colors.grey400;
                        return tinycolor(baseColor).setAlpha(0.5).toRgbString();
                    }),
                    borderColor: scene.chartData.map(d => {
                        return d.highlight
                            ? highlightColors[d.highlight]
                            : colors.grey400;
                    }),
                    borderWidth: 2,
                    data: scene.chartData.map(d => d[key])
                };
            });
        } else {
            datasets = scene.valueKeys.map(key => {
                return {
                    label: scene.labels[key],
                    lineTension: 0,
                    fill: false,
                    borderColor: scene.colors ? scene.colors[key] : '#ddd',
                    borderWidth: 2,
                    pointRadius: 0,
                    data: scene.chartData.map(d => d[key])
                };
            });
        }

        return {
            labels: scene.chartData.map(d => d.label),
            datasets
        };
    }

    const baseOptions = {
        onResize(controller, { width }) {
            if (width < 400) {
                this.scales.xAxes[0].ticks.fontSize = 9;
            } else {
                this.scales.xAxes[0].ticks.fontSize = this.defaultFontSize;
            }
        },
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            xAxes: [
                {
                    ticks: {
                        fontSize: $(window).width() < 480 ? 9 : 12
                    },
                    gridLines: {
                        display: false
                    }
                }
            ]
        }
    };

    if (min != null || max != null) {
        merge(baseOptions, {
            scales: {
                yAxes: [
                    {
                        ticks: { min, max }
                    }
                ]
            }
        });
    }

    const barOptions = merge({}, baseOptions, {
        legend: {
            display: false
        },
        scales: {
            yAxes: [
                {
                    ticks: {
                        maxTicksLimit: 7
                    }
                }
            ]
        }
    });

    const lineOptions = merge({}, baseOptions, {
        animation: false
    });

    const chart = new Chart($canvas, {
        type,
        data: buildData(0),
        options: type === 'bar' ? barOptions : lineOptions
    });

    $text.text(scenes[currentSceneIndex].text);

    function update(e, newIndex) {
        e.preventDefault();

        if (newIndex < 0) {
            newIndex = scenes.length - 1;
        } else if (newIndex >= scenes.length) {
            newIndex = 0;
        }

        $.extend(chart.data, buildData(newIndex));
        chart.update();
        $text.text(scenes[newIndex].text);

        currentSceneIndex = newIndex;
    }

    $left.click(e => update(e, currentSceneIndex - 1));

    $right.click(e => update(e, currentSceneIndex + 1));
}

module.exports = ChartSlideshow;
