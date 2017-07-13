const axios = require('axios');
const _ = require('lodash');

/*
  config:
  - lastUpdateUrl
  - fetchUrl
  - pageTypes
  - altAuthor
*/
module.exports = function(config) {
    function classNameInPageTypes(node) {
        return _.includes(config.pageTypes, node.className);
    }

    function transform(siteTree) {
        const pages = {};

        const createPageObject = function(siteTreeNode) {
            const { urlSegment } = siteTreeNode;

            if (urlSegment in pages) {
                throw new Error(`Page ${urlSegment} already defined`);
            }

            const children = [];

            siteTreeNode.children
                .filter(n => !classNameInPageTypes(n))
                .forEach(child => {
                    const childNode = {
                        type: child.className,
                        url: child.urlSegment,
                        props: child.content
                    };

                    children.push(childNode);
                });

            pages[urlSegment] = {
                type: 'Meins',
                props: _.assign(
                    { type: siteTreeNode.className, contentNodes: children },
                    siteTreeNode.content
                ),
                url: urlSegment
                // TODO: updatedAt
            };
        };

        _.filter(_.values(siteTree), classNameInPageTypes).forEach(
            createPageObject
        );

        return pages;
    }

    return {
        fetch(updatedSince) {
            return axios
                .get(config.fetchUrl, { params: { updatedSince } })
                .then(res => res.data)
                .then(transform);
        },
        getLastUpdate() {
            return axios(config.lastUpdateUrl).then(res => new Date(res.data));
        }
    };
};
