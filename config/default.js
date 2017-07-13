const path = require('path');

module.exports = {
    target: path.resolve(__dirname, '../build'),
    assets: '/Users/filip/meins/assets',
    extensionPath: path.resolve(__dirname, '../src/extensions'),
    silverStripe: {
        fetchUrl: 'https://api.einser.info/cms/site-tree',
        lastUpdateUrl: 'https://api.einser.info/cms/last-update',
        altAuthor: ['BlockVideo', 'BlockSlideshow', 'BlockImage'],
        pageTypes: ['MainPage', 'SidePage']
    },
    wahl17: {
        space: '2zoerdrh5gpp',
        accessToken:
            'd1839bcbc88291dbe373355651f532f3cc4c37e91828543745455e642c56a036',
        contentType: 'entry'
    },
    schedule: '*/1 * * * *'
};
