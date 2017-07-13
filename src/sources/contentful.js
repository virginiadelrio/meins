const contentful = require('contentful');

// STUB
module.exports = function({ space, accessToken, contentType, mapper }) {
    return {
        fetch() {
            const client = contentful.createClient({ space, accessToken });

            return client
                .getEntries({
                    content_type: contentType,
                    limit: 500
                })
                .then(res => res.items)
                .then(mapper);
        },
        getLastUpdate() {
            return Promise.resolve(null);
        }
    };
};
