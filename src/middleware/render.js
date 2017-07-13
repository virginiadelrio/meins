const path = require('path');
const React = require('react');
const ReactDOM = require('react-dom/server');
const _ = require('lodash');
const beautify = require('js-beautify').html;

module.exports = function() {
    return function(tree, context) {
        const renderedTree = _.mapValues(tree, node => {
            const [, extension] = node.url.match(/\.(.+)$/) || [];

            if (extension) {
                // file renderer
                // content should be prefilled

                return node;
            } else {
                // React renderer

                const Component = require(path.join(
                    '../components',
                    node.type + '.jsx'
                ));

                const html =
                    '<!DOCTYPE html>\n' +
                    ReactDOM.renderToStaticMarkup(
                        React.createElement(
                            Component,
                            _.assign({}, node.props, {
                                buildContext: context,
                                url: node.url,
                                siteTree: tree
                            })
                        )
                    );

                return _.assign({}, node, {
                    content: beautify(html),
                    contentType: 'html'
                });
            }
        });

        return renderedTree;
    };
};
