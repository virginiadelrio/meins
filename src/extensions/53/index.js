const cheerio = require('cheerio');
const Promise = require('bluebird');
const babel = require('babel-core');

const transformFile = Promise.promisify(babel.transformFile);

module.exports = function transform(originalHtml) {
    const $ = cheerio.load(originalHtml);
    
    $('head').append(
        '<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.2.2/Chart.bundle.min.js"></script>');
    
    $('#chart-1').replaceWith('<div id="chart-1"></div>');
    $('#chart-3').replaceWith('<div id="chart-3"></div>');
    
    return transformFile(__dirname + '/charts.js', {presets: ['es2015']})
        .then(({code}) => {
            $('body').append(`<script>${code}</script>`);
        })
        .then(() => $.html());
};
