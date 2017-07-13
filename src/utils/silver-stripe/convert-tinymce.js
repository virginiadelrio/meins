const cheerio = require('cheerio');
const _ = require('lodash');

module.exports = (
    tinymceString,
    siteTree,
    buildContext,
    { altAuthor } = {}
) => {
    const $ = cheerio.load(tinymceString);

    if (!$.root().children().first().is('h1')) {
        $.root().children().first().addClass('rmt1');
    }

    $('h1').each(function() {
        const $el = $(this);

        const $contentHeader = $(
            '<div class="content-header rmb2 rmt4"></div>'
        );

        const authorNodes = $el.nextUntil('p');

        $contentHeader.append(
            `<div class="content-header__text u-line-height-1">${$el.text()}</div>`
        );

        const authorClassName =
            'content-header__author' + (altAuthor ? '--alt' : '');
        authorNodes.each(function() {
            const $author = $(this);

            $contentHeader.append(
                `<a href="orfeins-info-redaktion/" class="${authorClassName}">${$author.text()}</a>`
            );
        });
        authorNodes.remove();

        $el.replaceWith($contentHeader);
    });

    $('p').each(function() {
        const $p = $(this);
        $p.addClass('text-content__paragraph rmb1');
    });

    $('a').each(function() {
        const $a = $(this);
        $a.addClass('text-content__link');

        const match = $a.attr('href').match(/\[sitetree_link,id=(\d+)\]/);

        if (match) {
            const { fullUrl } = _.defaultTo(siteTree[match[1]], {});

            if (fullUrl) {
                $a.attr('href', fullUrl);
            } else {
                console.warn(`Warning: No url found for ${match[0]}`);
            }
        } else {
            $a.attr('target', '_blank');
        }
    });

    $('img').each(function() {
        const $img = $(this);

        const src = $img.attr('src');
        $img.attr('src', buildContext.img(src, { width: 1280 }));
        $img.addClass('width-100');
        $img.attr({
            width: null,
            height: null
        });
    });

    // TODO remaining h2 are authors
    // $('h2').each(function() {
    // // TBI: $('h2').filter(function() { return !$(this).prev().is('h2'); })
    // });

    return $.html();
};
