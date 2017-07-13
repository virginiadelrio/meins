const React = require('react');
const Icon = require('./Icon');

const siteTreeHelpers = require('../../utils/silver-stripe/siteTreeHelpers');

module.exports = ({ mode, arrows, siteTree, buildContext }) => {
    const libraryItems = siteTreeHelpers.getSortedPages(siteTree).map(item => {
        const imagePath = buildContext.img(
            item.props.OverviewImageSrc || item.props.HeroImageSrc,
            {
                width: 500,
                ensureType: 'jpg'
            }
        );

        return (
            <a href={item.url} className="library__item">
                <div
                    className="library__image"
                    style={{ backgroundImage: `url(${imagePath})` }}
                />
                <div className="library__text">
                    <div className="library__number">
                        {`Nr. ${item.props.ReleaseNumber}`}
                    </div>
                    <div
                        className="library__title"
                        dangerouslySetInnerHTML={{
                            __html:
                                item.props.OverviewText ||
                                    item.props.MainHeadline
                        }}
                    />
                </div>
            </a>
        );
    });

    const className = mode ? `library library--${mode}` : 'library';

    const leftArrow = arrows
        ? <div className="library__arrow library__arrow--left hide-lt-lg">
              <Icon href="#arrowLeft" title="Zurück" />
          </div>
        : null;

    const rightArrow = arrows
        ? <div className="library__arrow library__arrow--right hide-lt-lg">
              <Icon href="#arrowRight" title="Weiter" />
          </div>
        : null;

    return (
        <div className={className}>
            <div className="library__items-wrapper">
                {leftArrow}
                <div className="library__items">
                    {libraryItems}
                </div>
                {rightArrow}
            </div>
        </div>
    );
};
