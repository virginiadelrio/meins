const path = require('path');
const _ = require('lodash');
const Bluebird = require('bluebird');

function tryRequire(modulePath) {
    try {
        return require(modulePath);
    } catch (e) {
        if (e.code !== 'MODULE_NOT_FOUND') {
            throw e;
        }
        return null;
    }
}

module.exports = function({ extensionPath }) {
    function applyExtension(node, tree, context) {
        const extension =
            tryRequire(path.join(extensionPath, node.url)) ||
            tryRequire(path.join(extensionPath, `${node.props.ReleaseNumber}`));

        if (extension != null) {
            console.log(
                `Extension found for release ${node.url ||
                    node.props.ReleaseNumber}.`
            );
            return extension(node.content, {
                production: process.env.NODE_ENV === 'production',
                buildContext: context,
                siteTree: tree
            });
        }

        return Promise.resolve(node.content);
    }

    return (tree, context) => {
        const pairs = _.toPairs(tree);

        return Bluebird.mapSeries(pairs, pair => {
            const node = pair[1];

            return applyExtension(node, tree, context).then(html => {
                node.content = html;
                return [pair[0], node];
            });
        }).then(newPairs => _.fromPairs(newPairs));
    };
};
