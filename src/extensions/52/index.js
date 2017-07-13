const cheerio = require('cheerio');
const Promise = require('bluebird');

module.exports = function transform(originalHtml) {
    const $ = cheerio.load(originalHtml);

    const $link = $('#klickstrecke-vorher-nachher a.attribution');
    $link.attr('href', 'https://www.facebook.com/Olympia.Rest/');
    $link.attr('target', '_blank');
    
    return Promise.resolve($.html());
};
