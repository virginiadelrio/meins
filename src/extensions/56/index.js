const cheerio = require('cheerio');
const Promise = require('bluebird');
const fs = require('fs-extra');
const path = require('path');

const copy = Promise.promisify(fs.copy);

module.exports = function transform(originalHtml, {buildContext}) {
    const $ = cheerio.load(originalHtml);
    
    $('head').append(
        '<script src="https://cdnjs.cloudflare.com/ajax/libs/d3/3.5.17/d3.min.js"></script>');
    
    $('body').append(
        '<script src="../assets/_ext/56/charts.js"></script>');

    return copy(__dirname + '/assets', path.join(buildContext.config.buildDestination, 'assets/_ext/56')).then(() => $.html());
};
