const url = require('url');
const React = require('react');
const _ = require('lodash');
const cheerio = require('cheerio');
const cx = require('classnames');

const FormattedText = require('./FormattedText');
const Slideshow = require('./Slideshow');
const Quote = require('./Quote');

const convertTinymce = require('../../utils/silver-stripe/convert-tinymce');

function getAttribution(source, mobileOnly = false) {
    const className = cx('attribution', 'rmb2', { 'show-lt-md': mobileOnly });
    return source
        ? <a className={className} href="orfeins-info-redaktion/">

              {source}
          </a>
        : null;
}

module.exports = props => {
    const convertContent = content => {
        if (content) {
            return convertTinymce(content, props.siteTree, props.buildContext);
        }
    };

    const renderer = {
        BlockText(node, id) {
            const { QuoteSourceName, QuoteBody, QuoteSourceImageSrc } = node;

            let inlineElement = null;

            if (QuoteSourceName && QuoteSourceImageSrc && QuoteBody) {
                inlineElement = _.merge({ inlineType: 'quote' }, node);
            }

            return (
                <div id={id} className="row">
                    <FormattedText
                        innerHtml={convertContent(node.Content)}
                        buildContext={props.buildContext}
                        inlineElement={inlineElement}
                    />
                </div>
            );
        },

        BlockImage(node, id) {
            return (
                <div id={id} className="row--oversize">
                    <FormattedText
                        className="rmb2"
                        innerHtml={convertContent(node.Content)}
                    />
                    <img className="width-100" src={node.src} />
                </div>
            );
        },

        BlockSlideshow(node, id) {
            return (
                <div id={id} className="row--oversize">
                    <FormattedText
                        className="rmb2"
                        innerHtml={convertContent(node.Content)}
                    />
                    <Slideshow
                        slides={_.map(node.children, 'ImageSrc')}
                        buildContext={props.buildContext}
                    />
                    {getAttribution(node.SlideshowSource)}
                </div>
            );
        },

        BlockVideo(node, id) {
            const previewImagePath = props.buildContext.img(
                node.PreviewImageSrc,
                { width: 1280 }
            );

            return (
                <div id={id} className="row--oversize">
                    <FormattedText
                        className="rmb2"
                        innerHtml={convertContent(node.Content)}
                    />

                    <div
                        className="video-mount rmt2"
                        data-src={node.VideoURL}
                        data-poster={previewImagePath}
                        data-title={node.VideoTitle}
                        data-length={node.VideoLength}
                        data-creator={node.VideoSource}
                    />
                    {getAttribution('Video: ' + node.VideoSource, true)}
                </div>
            );
        },

        BlockQuote(node, id) {
            return (
                <div id={id} className="row rmy3 u-clearfix">
                    <div className="row__quote">
                        <Quote quote={node} buildContext={props.buildContext} />
                    </div>
                </div>
            );
        },

        BlockFacebook(node, id) {
            if (node.EmbedCode == null) {
                return null;
            }

            const $ = cheerio.load(node.EmbedCode);
            const { query } = url.parse($('iframe').attr('src'), true);

            return (
                <div id={id} className="row--oversize">
                    <div className="facebook-content">
                        <div
                            className="fb-video"
                            data-href={query.href}
                            data-width="auto"
                            data-show-text="true"
                        />
                    </div>
                </div>
            );
        },

        BlockYoutube(node, id) {
            return (
                <div className="row--oversize rmt3 rmb3">
                    <div
                        id={id}
                        className="u-16-9"
                        dangerouslySetInnerHTML={{ __html: node.EmbedCode }}
                    />
                </div>
            );
        }
    };

    const renderedContent = props.contentNodes.map(node => {
        const { type } = node;

        if (!renderer.hasOwnProperty(type)) {
            throw new Error(`Unknown content type ${type}`);
        }

        return renderer[type](node.props, node.url);
    });

    return (
        <div className="content-container">
            {renderedContent}
        </div>
    );
};
