const React = require('react');
const Icon = require('./Icon');

module.exports = props => {
    const shareUrl = encodeURIComponent('http://meins.orf.at/' + props.url);
    const fbShareUrl =
        'http://www.facebook.com/sharer/sharer.php?u=' + shareUrl;
    const twitterShareUrl =
        'http://twitter.com/intent/tweet?source=' +
        shareUrl +
        '&text=' +
        shareUrl;

    return (
        <div className="header">
            <a href="/" className="header__logo" />
            <div
                className="header__tagline"
                data-tagline={
                    props.OverviewText ||
                    props.MainHeadline.replace(/&shy;/g, '') ||
                    props.TeaserText
                }
            >
                EINE WOCHE. EIN THEMA.
            </div>
            <div className="header__share hide-lt-lg">
                <a href={fbShareUrl} className="social-link" target="_blank">
                    <Icon
                        title="Facebook"
                        className="icons icons--fb"
                        href="#facebook"
                    />
                </a>
                <a
                    href={twitterShareUrl}
                    className="social-link"
                    target="_blank"
                >
                    <Icon
                        title="Twitter"
                        className="icons icons--twitter"
                        href="#twitter"
                    />
                </a>
            </div>
            <div className="header__progress" />
        </div>
    );
};
