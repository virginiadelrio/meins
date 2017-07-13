const React = require('react');
const fp = require('lodash/fp');

const Icons = require('./Icons');
const Header = require('./Header');
const Title = require('./Title');
const Hero = require('./Hero');
const Content = require('./Content');
/* import Editorial from './Editorial';*/
const Footer = require('./Footer');
const Library = require('./Library');
const TvHint = require('./TvHint');

module.exports = props => {
    const { siteTree } = props;

    const facebookEmbeds = fp.filter(
        fp.propEq('type', 'BlockFacebook'),
        siteTree[props.url].props.contentNodes
    );

    const facebookPlaceholder = facebookEmbeds.length > 0
        ? '$$FBPLACEHOLDER'
        : null;

    return (
        <body>
            <Icons />

            <Header {...props} />

            <Title {...props} />
            <Hero {...props} />

            <Content {...props} />

            {/* <Editorial /> */}

            <Library mode="footer" arrows={true} {...props} />

            <Footer />

            <TvHint {...props} />

            <a href="http://orf.at" className="orf-logo" />

            <script src="js/meins.js" />

            {facebookPlaceholder}
        </body>
    );
};
