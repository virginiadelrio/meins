const fp = require('lodash/fp');

const isMainPage = fp.pathEq(['props', 'type'], 'MainPage');
const isNotHidden = fp.complement(fp.pathEq(['props', 'ReleaseNumber'], 0));

module.exports = {
    getSortedPages(siteTree) {
        return fp.sortBy(
            item => -new Date(item.props.BroadcastDate).valueOf(),
            fp.values(fp.filter(n => isNotHidden(n) && isMainPage(n), siteTree))
        );
    }
};
