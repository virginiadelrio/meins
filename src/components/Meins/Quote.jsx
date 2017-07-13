const React = require('react');
const classnames = require('classnames');

module.exports = ({ quote, buildContext, inline }) => {
    const sourceImagePath = buildContext.img(quote.QuoteSourceImageSrc, {
        width: 176,
        height: 176,
        grayscale: true
    });
    const className = inline ? 'quote--inline' : 'quote--break';

    const bodyAside = quote.QuoteBodyAside
        ? <div className="quote__body-aside hide-lt-lg">
              {quote.QuoteBodyAside}
          </div>
        : null;

    const sourceInfo = quote.QuoteSourceInfo
        ? <div className="quote__source-info">{quote.QuoteSourceInfo}</div>
        : null;

    const bodyClassname = classnames(
        {
            'quote__body-main--more-text':
                (quote.QuoteBody ? quote.QuoteBody.length : 0) > 60
        },
        'quote__body-main'
    );

    return (
        <div className={className}>
            <div className="quote__body">
                <div className={bodyClassname}>{quote.QuoteBody}</div>
                {bodyAside}
            </div>
            <div className="quote__source">
                <img src={sourceImagePath} className="quote__source-image" />
                <div className="quote__source-text">
                    <div className="quote__source-name">
                        {quote.QuoteSourceName}
                    </div>
                    {sourceInfo}
                </div>
            </div>
        </div>
    );
};
