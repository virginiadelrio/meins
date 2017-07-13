/*
  This middleware scans paths in the rendered html and changes them to be relative to a root path and adds hashes from a manifest file for cache busting
*/

const path = require('path');
const _ = require('lodash');
const cheerio = require('cheerio');
const fs = require('fs-extra');

function process(html, filename, hashes) {
    const $ = cheerio.load(html);

    const fixRelative = (el, attr) => {
        const $el = $(el);
        const oldValue = $el.attr(attr);

        if (attr === 'style') {
            const updatedValue = oldValue.replace(
                /url\((assets\/[^)]+)\)/,
                (match, pathPart) => {
                    return `url(${path.relative(
                        path.dirname(filename),
                        pathPart
                    )})`;
                }
            );

            if (updatedValue !== oldValue) {
                $el.attr(attr, updatedValue);
            }
        } else {
            if (oldValue != null && !oldValue.match(/^(\/|http|ftp|\.|#)/)) {
                const bustedPath = oldValue in hashes
                    ? hashes[oldValue]
                    : oldValue;
                $el.attr(
                    attr,
                    path.relative(path.dirname(filename), bustedPath)
                );
            }
        }
    };

    $('use').attr('xmlns:xlink', 'http://www.w3.org/1999/xlink');

    $('a, link').each(function() {
        fixRelative(this, 'href');
    });

    $('img, script').each(function() {
        fixRelative(this, 'src');
    });

    $('div[data-poster]').each(function() {
        fixRelative(this, 'data-poster');
    });

    $('img[data-lazy]').each(function() {
        fixRelative(this, 'data-lazy');
    });

    $('*[style]').each(function() {
        fixRelative(this, 'style');
    });

    $('video source').each(function() {
        fixRelative(this, 'src');
    });

    $('video').each(function() {
        fixRelative(this, 'poster');
    });

    return $.html();
}

module.exports = function({ manifest }) {
    return tree => {
        return fs
            .readJson(manifest)
            .then(hashes => {
                _.forEach(tree, (node, url) => {
                    if (node.contentType !== 'html') {
                        return;
                    }

                    node.content = process(
                        node.content,
                        path.join(url, 'index.html'),
                        hashes
                    );
                });
            })
            .then(() => tree);
    };
};
