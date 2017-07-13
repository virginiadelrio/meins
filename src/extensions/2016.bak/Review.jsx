const React = require('react');
const moment = require('moment');

moment.locale('de');

const siteTreeHelpers = require('../../utils/silver-stripe/siteTreeHelpers');

export default ({ siteTree, buildContext }) => {
    const pages2016 = siteTreeHelpers.getSortedPages(siteTree).filter(item => {
        return moment(item.content.BroadcastDate).year() === 2016;
    });

    const items = pages2016.map(item => {
        const imagePath = buildContext.img(
            item.content.OverviewImageSrc || item.content.HeroImageSrc,
            {
                width: 500,
                ensureType: 'jpg'
            }
        );

        return (
            <a href={item.fullUrl} className="review__item rmb3">

                <div className="review__image-container">
                    <img className="review__image width-100" src={imagePath} />
                    <div className="review__info">
                        <div>{`Nr. ${item.content.ReleaseNumber}`}</div>
                        <div>
                            {moment(item.content.BroadcastDate).format('MMMM')}
                        </div>
                    </div>
                </div>
                <div className="review__title">
                    <div className="review__headline">
                        {item.content.MainHeadline}
                    </div>
                    <div className="review__text">
                        {item.content.SubHeadline}
                    </div>
                </div>
            </a>
        );
    });

    return (
        <div className="review">
            {items}
        </div>
    );
};
