const cheerio = require('cheerio');
const Promise = require('bluebird');
const fs = require('fs-extra');
const path = require('path');

const copy = Promise.promisify(fs.copy);

module.exports = function transform(originalHtml, { buildContext }) {
    const $ = cheerio.load(originalHtml);
    const $hero = $('#hero');
    const $heroImage = $('.hero__image');

    $heroImage.addClass('show-lt-lg');

    const $video = `
    <video poster="assets/_ext/78/preview.png" autoplay loop muted class="hero__image show-gt-lg">
    <source src="assets/_ext/78/hero.mp4">
    </video>
    `;

    $hero.prepend($video);

    return copy(
        __dirname + '/assets',
        path.join(buildContext.config.buildDestination, 'assets/_ext/78')
    ).then(() => $.html());
};
