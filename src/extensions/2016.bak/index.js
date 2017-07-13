const ReactDOMServer = require('react-dom/server');
const React = require('react');
const cheerio = require('cheerio');

const Review = require('./Review.jsx');

module.exports = function transform(originalHtml, { buildContext, siteTree }) {
    const $ = cheerio.load(originalHtml);

    const reviewHtml = ReactDOMServer.renderToStaticMarkup(
        React.createElement(Review, { buildContext, siteTree })
    );

    $('#review').replaceWith(reviewHtml);
    $('header.title').remove();
    $('#hero').remove();

    return Promise.resolve($.html());
};
