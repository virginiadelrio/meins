const cheerio = require('cheerio');
const less = require('less');
const Promise = require('bluebird');
const fs = require('fs-extra');
const path = require('path');
const autoprefixer = require('autoprefixer');
const postcss = require('postcss');

less.renderAsync = Promise.promisify(less.render);
const readFile = Promise.promisify(fs.readFile);
const copy = Promise.promisify(fs.copy);

const usaVsChinaHtml = `
<div class="usa-vs-china">
<h1 class="usa-vs-china__round">Runde 0</h1>
<div class="usa-vs-china__inner">
<img src="assets/_ext/77/usa.png">
<div class="score">0:0</div>
<img src="assets/_ext/77/china.png">
</div>
</div>
`;

module.exports = function transform(originalHtml, { buildContext }) {
    const $ = cheerio.load(originalHtml);

    $('head').append(
        '<script src="//cdnjs.cloudflare.com/ajax/libs/ScrollMagic/2.0.5/ScrollMagic.min.js"></script>'
    );

    return copy(
        __dirname + '/assets',
        path.join(buildContext.config.buildDestination, 'assets/_ext/77')
    )
        .then(() => readFile(__dirname + '/styles.less', 'utf8'))
        .then(lessString => less.renderAsync(lessString))
        .then(({ css }) => {
            return postcss([
                autoprefixer({
                    browsers: ['last 2 versions', '> 1%', 'Firefox ESR']
                })
            ]).process(css);
        })
        .then(({ css }) => {
            $('head').append(`<style type="text/css">${css}</style>`);
        })
        .then(() => readFile(__dirname + '/script.js', 'utf8'))
        .then(src => {
            $('body').append(`<script>${src}</script>`);
            $('body').append(usaVsChinaHtml);
        })
        .then(() => {
            return Promise.resolve($.html());
        });
};
