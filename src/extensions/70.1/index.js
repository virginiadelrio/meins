const cheerio = require('cheerio');
const pug = require('pug');
const less = require('less');
const Promise = require('bluebird');
const fs = require('fs-extra');
const path = require('path');
const postcss = require('postcss');
const autoprefixer = require('autoprefixer');

const babel = require('babel-core');

const colors = require('../../utils/colors');

const pulseplay = `
<symbol id="pulseplay" viewBox="0 0 400 400"><circle fill="none" stroke="white" r="170" cx="200" cy="200" stroke-width="8"><animate attributeName="stroke-width" values="4;18;4" dur="4s" repeatCount="indefinite"></animate></circle><text x="50%" y="50%" text-anchor="middle" fill="white" font-size="100" dy="30" font-family="Gotham Condensed">PLAY</text>
</symbol>
`;

less.renderAsync = Promise.promisify(less.render);
const readFile = Promise.promisify(fs.readFile);
const copy = Promise.promisify(fs.copy);
const transformFile = Promise.promisify(babel.transformFile);

module.exports = function transform(originalHtml, { buildContext }) {
    const $ = cheerio.load(originalHtml);

    const bodyHtml = pug.compileFile(__dirname + '/index.pug')({});

    const $mainJs = $('body').find('script[src*="main"]');
    const $library = $('body').find('.library--footer');

    $('link[rel="stylesheet"]').remove();

    $('body').html(bodyHtml);

    return transformFile(__dirname + '/client.js', { presets: ['es2015'] })
        .then(({ code }) => {
            $('body').append($mainJs);
            $('body').append(`<script>${code}</script>`);
        })
        .then(() => {
            return copy(
                __dirname + '/assets',
                path.join(
                    buildContext.config.buildDestination,
                    'assets/_ext/70.1'
                )
            );
        })
        .then(() => readFile(__dirname + '/styles.less', 'utf8'))
        .then(lessString =>
            less.renderAsync(lessString, { globalVars: colors })
        )
        .then(({ css }) => {
            return postcss([
                autoprefixer({
                    browsers: [
                        'last 2 versions',
                        '> 1%',
                        'Firefox ESR',
                        'iOS 6',
                        'iOS 7'
                    ]
                })
            ]).process(css);
        })
        .then(({ css }) => {
            $('head').append(`<style type="text/css">${css}</style>`);
        })
        .then(() => {
            $('.bottom-curtain').append($library);
            return $.html().replace('<text>PULSE</text>', pulseplay);
        });
};
