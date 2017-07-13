/* global ChartSlideshow */

const barData = {
    type: 'bar',
    attribution: 'Quellen: Spiegel Bestsellerlisten, Börsenverein des Deutschen Buchhandels - Landesverband Bayern e.V.',
    scenes: [{
        text: 'Bei den Büchern, die keine Sachbücher sind, sind die Krimis schon auf Platz 2, was den Umsatz des Buchhandels betrifft.',
        labels: {
            value: '%'
        },
        chartData: [{
            value: 52.5,
            label: 'Erzählende Literatur'
        }, {
            value: 25.7,
            label: 'Krimi & Thriller',
            highlight: 'petrol'
        }, {
            value: 8.1,
            label: 'Comic, Cartoon, Humor'
        }, {
            value: 6.2,
            label: 'Geschenkbücher'
        }, {
            value: 5.9,
            label: 'Sci-Fi & Fantasy'
        }, {
            value: 1.6,
            label: 'Sonstiges',
            highlight: 'light'
        }]
    }, {
        text: 'Krimis werden offenbar gern unterwegs gelesen. Der "Spiegel" hat eigene Bestseller-Listen, aufgeschlüsselt nach dem Einband der Bücher. Im "Paperback"-Format sind die Krimis ganz klar die Nummer 1.',
        labels: {
            value: '%'
        },
        chartData: [{
            value: 4.75,
            label: 'Hardcover'
        }, {
            value: 65,
            label: 'Paperback'
        }, {
            value: 23.81,
            label: 'Taschenbuch'
        }]
    }]
};

const lineData = {
    type: 'line',
    attribution: 'Quellen: Statistik Austria, Tatort Fundus',
    min: 0,
    max: 60,
    scenes: [{
        text: 'Die Mordrate in Österreich (Anzahl der rechtskräftigen Verurteilungen) ist in den vergangenen 20 Jahren relativ stabil mit maximal 34 Fällen pro Jahr.',
        labels: {
            value: 'Verurteilungen Mord'
        },
        colors: {
            value: '#00576e'
        },
        valueKeys: ['value'],
        chartData: [
            {label: 1976, value: 29},
            {label: 1977, value: 32},
            {label: 1978, value: 28},
            {label: 1979, value: 15},
            {label: 1980, value: 27},
            {label: 1981, value: 19},
            {label: 1982, value: 33},
            {label: 1983, value: 40},
            {label: 1984, value: 49},
            {label: 1985, value: 30},
            {label: 1986, value: 41},
            {label: 1987, value: 31},
            {label: 1988, value: 20},
            {label: 1989, value: 21},
            {label: 1990, value: 29},
            {label: 1991, value: 30},
            {label: 1992, value: 32},
            {label: 1993, value: 53},
            {label: 1994, value: 43},
            {label: 1995, value: 31},
            {label: 1996, value: 28},
            {label: 1997, value: 30},
            {label: 1998, value: 33},
            {label: 1999, value: 28},
            {label: 2000, value: 22},
            {label: 2001, value: 29},
            {label: 2002, value: 32},
            {label: 2003, value: 33},
            {label: 2004, value: 24},
            {label: 2005, value: 28},
            {label: 2006, value: 33},
            {label: 2007, value: 34},
            {label: 2008, value: 18},
            {label: 2009, value: 16},
            {label: 2010, value: 31},
            {label: 2011, value: 24},
            {label: 2012, value: 33},
            {label: 2013, value: 28},
            {label: 2014, value: 28},
            {label: 2015, value: 20}
        ]
    }, {
        text: 'Im Gegensatz dazu steigt aber das Bedürfnis nach Krimi und Mord im TV, wie die Anzahl der Erstausstrahlungen der Serie "Tatort" zeigt.',
        labels: {
            value: 'Verurteilungen Mord',
            value2: 'Erstausstrahlungen Tatort'
        },
        colors: {
            value: '#00576e',
            value2: 'rgb(0, 146, 170)'
        },
        valueKeys: ['value', 'value2'],
        chartData: [
            {label: 1976, value: 29, value2: 11},
            {label: 1977, value: 32, value2: 13},
            {label: 1978, value: 28, value2: 12},
            {label: 1979, value: 15, value2: 13},
            {label: 1980, value: 27, value2: 12},
            {label: 1981, value: 19, value2: 12},
            {label: 1982, value: 33, value2: 12},
            {label: 1983, value: 40, value2: 9},
            {label: 1984, value: 49, value2: 12},
            {label: 1985, value: 30, value2: 14},
            {label: 1986, value: 41, value2: 18},
            {label: 1987, value: 31, value2: 16},
            {label: 1988, value: 20, value2: 14},
            {label: 1989, value: 21, value2: 13},
            {label: 1990, value: 29, value2: 11},
            {label: 1991, value: 30, value2: 15},
            {label: 1992, value: 32, value2: 15},
            {label: 1993, value: 53, value2: 18},
            {label: 1994, value: 43, value2: 15},
            {label: 1995, value: 31, value2: 22},
            {label: 1996, value: 28, value2: 28},
            {label: 1997, value: 30, value2: 26},
            {label: 1998, value: 33, value2: 26},
            {label: 1999, value: 28, value2: 30},
            {label: 2000, value: 22, value2: 29},
            {label: 2001, value: 29, value2: 30},
            {label: 2002, value: 32, value2: 30},
            {label: 2003, value: 33, value2: 32},
            {label: 2004, value: 24, value2: 31},
            {label: 2005, value: 28, value2: 34},
            {label: 2006, value: 33, value2: 32},
            {label: 2007, value: 34, value2: 35},
            {label: 2008, value: 18, value2: 31},
            {label: 2009, value: 16, value2: 34},
            {label: 2010, value: 31, value2: 35},
            {label: 2011, value: 24, value2: 36},
            {label: 2012, value: 33, value2: 35},
            {label: 2013, value: 28, value2: 36},
            {label: 2014, value: 28, value2: 36},
            {label: 2015, value: 20, value2: 40}
        ]
    }]
};

new ChartSlideshow('#chart-buch', barData);
new ChartSlideshow('#chart-tatort', lineData);
