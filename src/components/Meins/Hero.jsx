const React = require('react');
const classnames = require('classnames');

module.exports = ({ children, HeroImageSrc, buildContext }) => {
    const realHeroImagePath = buildContext.img(HeroImageSrc, {
        width: 1920,
        ensureType: 'jpg'
    });

    const imgComponent = realHeroImagePath
        ? <img src={realHeroImagePath} className="hero__image" />
        : null;

    const titleImages = children
        .filter(c => c.ImageSrc != null)
        .map(c => c.ImageSrc);

    const className = classnames('hero', 'rmb3', {
        'hero--no-teaser': titleImages.length === 0
    });

    return (
        <div id="hero" className={className}>
            {imgComponent}
        </div>
    );
};
