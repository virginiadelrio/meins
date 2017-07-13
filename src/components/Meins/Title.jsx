const React = require('react');
const _ = require('lodash');
const classnames = require('classnames');
const Library = require('./Library');

const Icon = require('./Icon');

module.exports = props => {
    const { buildContext } = props;
    const titleImages = props.children
        .filter(c => c.ImageSrc != null)
        .map(c => c.ImageSrc);
    const leftImagePath = buildContext.img(titleImages[0], {
        height: 300,
        ensureType: 'jpg',
        grayscale: true
    });

    const rightTiles = _.map(_.tail(titleImages), (src, i) => {
        const imagePath = buildContext.img(src, {
            height: 450,
            ensureType: 'jpg',
            grayscale: true
        });
        const className = classnames(
            {
                'hide-lt-lg': i > 0
            },
            'title__right-tile'
        );

        return (
            <div
                className={className}
                style={{ backgroundImage: `url(${imagePath})` }}
            />
        );
    });

    return (
        <header className="title">
            <div
                className="title__left-tile hide-lt-lg"
                style={{ backgroundImage: `url(${leftImagePath})` }}
            />
            <div className="title__library">
                <Library {...props} />
            </div>
            <div className="title__text">
                <div
                    className="title__main-text"
                    dangerouslySetInnerHTML={{ __html: props.MainHeadline }}
                />
                <div className="title__subtitle">{props.SubHeadline}</div>
                <a
                    className="arrow arrow--down arrow--white title__arrow"
                    href="#"
                >
                    <div className="bar bar1" />
                    <div className="bar bar2" />
                    <div className="bar bar3" />
                    <div className="bar bar4" />
                    <Icon href="#arrowDown" title="Nach unten" />

                </a>
            </div>
            <div className="title__right-tiles hide-lt-md">
                {rightTiles}
            </div>
            <a href="#" className="library-button">
                <Icon href="#library" />
            </a>
        </header>
    );
};
