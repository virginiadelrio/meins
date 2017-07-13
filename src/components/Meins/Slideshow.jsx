const React = require('react');
const Icon = require('./Icon');

module.exports = ({ slides, buildContext }) => {
    const renderedSlides = slides.map(slide => {
        const slidePath = buildContext.img(slide, {
            ensureType: 'jpg',
            width: 1440,
            height: 1080
        });

        return (
            <div className="slideshow__slide">
                <img className="slideshow__slide-image" data-lazy={slidePath} />
            </div>
        );
    });

    return (
        <div className="slideshow rmt3">
            <div className="slideshow__main">
                <div className="slideshow__slides">
                    {renderedSlides}
                </div>
            </div>

            <div className="slideshow__go-left">
                <Icon title="Nach links" href="#arrowLeft" />
            </div>
            <div className="slideshow__go-right">
                <Icon title="Nach rechts" href="#arrowRight" />
            </div>
            <div className="slideshow__fullscreen">
                <Icon title="Vollbild" href="#fullscreen" />
            </div>
            <div className="slideshow__close">
                &times;
            </div>
        </div>
    );
};
