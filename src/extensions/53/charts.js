/* global ChartSlideshow */

const data1 = {
    type: 'bar',
    attribution: 'Quelle: Dexhelpp',
    min: 0,
    scenes: [{
        text: 'In Österreichs Krankenhäusern werden immer mehr Implantate eingesetzt.',
        labels: {
            value: 'Implantate'
        },
        chartData: [{
            value: 124621,
            label: '2009'
        }]
    }, {
        text: 'Im Jahr 2009 wurden 124.621 medizinische Leistungen rund um Implantate erbracht. Im Jahr darauf waren es schon um 7.800 mehr.',
        labels: {
            value: 'Implantate'
        },
        chartData: [{
            value: 124621,
            label: '2009'
        }, {
            value: 132442,
            label: '2010'
        }]
    }, {
        text: 'Und 2011 (letzte verfügbare Daten) stieg die Zahl der Neu-Implantate weiter: eine jährliche Zunahme von 5 bis 6%.',
        labels: {
            value: 'Implantate'
        },
        chartData: [{
            value: 124621,
            label: '2009'
        }, {
            value: 132442,
            label: '2010'
        }, {
            value: 139428,
            label: '2011'
        }]
    }, {
        text: 'Werden die einzelnen Implantate in drei Gruppen geteilt, so sieht man, dass futuristische, elektrische und elektronische Implantate (z.B. Herzschrittmacher, Pumpensysteme für Schmerztherapien, Elektroden- und Cochlearimplantate) mit knapp 5% erst einen kleinen Teil darstellen (6.300 Eingriffe im Jahr 2011).',
        labels: {
            value: 'Implantate'
        },
        chartData: [{
            value: 6303,
            label: 'Elektronik'
        }]
    }, {
        text: 'Klassische Prothesen hingegen sind für über 30% aller Leistungen rund um Implantate verantwortlich. Spitzenreiter hier sind Eingriffe rund um Hüft- (23.000) und Kniegelenksprothesen (19.800 Eingriffe).',
        labels: {
            value: 'Implantate'
        },
        chartData: [{
            value: 6303,
            label: 'Elektronik'
        }, {
            value: 88423,
            label: 'Augenlinsen'
        }]
    }, {
        text: 'Unangefochtener Spitzenreiter sind Eingriffe am Auge: Linsenimplantation wurden 2011 über 88.000 Mal durchgeführt. Auf diesem Gebiet wird besonders eifrig an bionischen Linsen geforscht: sie können die Sehkraft deutlich über das natürliche Niveau steigern.',
        labels: {
            value: 'Implantate'
        },
        chartData: [{
            value: 6303,
            label: 'Elektronik'
        }, {
            value: 88423,
            label: 'Augenlinsen'
        }, {
            value: 44702,
            label: 'Prothesen'
        }]
    }]
};

const data3 = {
    type: 'bar',
    attribution: 'Quelle: Dexhelpp',
    min: 0,
    scenes: [{
        text: 'Die Häufigkeit, mit der Implantate eingesetzt werden, variiert von Bundesland zu Bundesland. So wurden im Zeitraum 2009-2011 etwa in Kärnten deutlich mehr Elektroimplantate eingesetzt (pro 1000 Einwohner 2,8 Mal) als in Tirol (1,6 Mal).',
        labels: {
            value: 'pro 1000 Einwohner'
        },
        chartData: [{
            value: 2.757631994,
            label: 'Kärnten'
        }, {
            value: 2.672078001,
            label: 'Burgenland'
        }, {
            value: 2.57321276,
            label: 'Wien'
        }, {
            value: 2.482287113,
            label: 'Niederösterreich'
        }, {
            value: 2.425564165,
            label: 'Steiermark'
        }, {
            value: 2.063925805,
            label: 'Oberösterreich'
        }, {
            value: 1.91790924,
            label: 'Vorarlberg'
        }, {
            value: 1.791773875,
            label: 'Salzburg'
        }, {
            value: 1.630619221,
            label: 'Tirol'
        }]
    }, {
        text: 'Bei Linsenimplantationen liegt Oberösterreich mit 32,5 Eingriffen pro 1.000 Einwohner in den drei Jahren klar voran. Schlusslicht ist das Burgenland mit nur 23,9.',
        labels: {
            value: 'pro 1000 Einwohner'
        },
        chartData: [{
            value: 30.21897574,
            label: 'Kärnten'
        }, {
            value: 23.88538905,
            label: 'Burgenland'
        }, {
            value: 30.51528263,
            label: 'Wien'
        }, {
            value: 30.78612298,
            label: 'Niederösterreich'
        }, {
            value: 24.07171262,
            label: 'Steiermark'
        }, {
            value: 32.51207159,
            label: 'Oberösterreich'
        }, {
            value: 24.5508299,
            label: 'Vorarlberg'
        }, {
            value: 24.97855838,
            label: 'Salzburg'
        }, {
            value: 28.61171121,
            label: 'Tirol'
        }]
    }, {
        text: 'Und bei den Prothesen führt Niederösterreich, wenn auch knapp. Deutlich abgeschlagen sind hier Wien (12,3 pro 1.000 in 3 Jahren) und Vorarlberg (11,2).',
        labels: {
            value: 'Häufigkeit'
        },
        chartData: [{
            value: 15.51998879,
            label: 'Kärnten'
        }, {
            value: 16.4042656,
            label: 'Burgenland'
        }, {
            value: 12.3523196,
            label: 'Wien'
        }, {
            value: 16.97874576,
            label: 'Niederösterreich'
        }, {
            value: 15.30388115,
            label: 'Steiermark'
        }, {
            value: 16.76992118,
            label: 'Oberösterreich'
        }, {
            value: 11.1997411,
            label: 'Vorarlberg'
        }, {
            value: 15.02778089,
            label: 'Salzburg'
        }, {
            value: 15.59158921,
            label: 'Tirol'
        }]
    }]
};

new ChartSlideshow('#chart-1', data1);
new ChartSlideshow('#chart-3', data3);
