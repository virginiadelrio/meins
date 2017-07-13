const cheerio = require('cheerio');
const pug = require('pug');
const less = require('less');
const Promise = require('bluebird');
const fs = require('fs-extra');
const path = require('path');
const autoprefixer = require('autoprefixer');
const postcss = require('postcss');

less.renderAsync = Promise.promisify(less.render);
const readFile = Promise.promisify(fs.readFile);
const copy = Promise.promisify(fs.copy);

module.exports = function transform(originalHtml, { buildContext }) {
    const $ = cheerio.load(originalHtml);
    const $hero = $('#hero');

    $hero.addClass('pinboard');
    $hero.find('img').attr('src', 'assets/_ext/49/pinboard.jpg');

    $('.title__arrow').remove();

    const tiles = pug.compileFile(__dirname + '/tiles.pug')({
        tiles: [
            {
                img: 'sobotka',
                left: 9,
                top: 50,
                width: 19,
                className: 'rot-10',
                href: '#text-sobotka'
            },
            {
                img: 'wahlvolk',
                left: 6,
                top: 7,
                width: 19,
                className: 'rot-5',
                href: '#text-wahlvolk'
            },
            {
                img: 'kuvert',
                left: 31,
                top: 9,
                width: 19,
                className: 'rot10',
                href: '#text-das-kuvert'
            },
            {
                img: 'druckerei',
                left: 39,
                top: 56,
                width: 19,
                className: 'rot-5',
                href: '#text-druckerei'
            },
            {
                img: 'kandidaten',
                left: 53,
                top: 24,
                width: 19,
                className: 'rot5',
                href: '#text-kandidaten'
            },
            {
                img: 'zaungaeste',
                left: 76,
                top: 59,
                width: 19,
                className: 'rot5',
                href: '#text-zaungaeste'
            },
            {
                img: 'bka',
                left: 74,
                top: 6,
                width: 19,
                className: 'rot-10',
                href: '#text-bka'
            }
        ]
    });
    const goTop = pug.compileFile(__dirname + '/go-top.pug')();

    $hero.append(tiles);

    $('.content-header').addClass('relative');
    $('.content-header').prepend(goTop);

    return copy(
        __dirname + '/assets',
        path.join(buildContext.config.buildDestination, 'assets/_ext/49')
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
        .then(() => {
            return Promise.resolve($.html());
        });
};
