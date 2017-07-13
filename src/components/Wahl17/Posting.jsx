const url = require('url');
const React = require('react');
const marked = require('marked');
const cheerio = require('cheerio');
const _ = require('lodash');
const slug = require('slug');

const partyToClass = {
    SPÖ: 'spoe',
    ÖVP: 'oevp',
    FPÖ: 'fpoe',
    NEOS: 'neos',
    'Die Grünen': 'gruene',
    'Team Stronach': 'stronach'
};

class Posting extends React.Component {
    renderMarkdown(html) {
        const renderedMarkdown = marked(html);

        const $ = cheerio.load(renderedMarkdown);

        // Inline Facebook
        const iframes = $('iframe');
        iframes.each((index, iframe) => {
            if (iframe.attribs.src.match(/facebook/)) {
                const { query } = url.parse(iframe.attribs.src, true);
                $(iframe).replaceWith(
                    `<div class="inline-facebook">
                         <div
                             class="fb-video"
                             data-href="${query.href}"
                             data-width="auto"
                             data-show-text="true"
                         />
                     </div>`
                );
            }
        });

        // Inline link
        $('a').each((index, link) => {
            const $link = $(link);

            $link.addClass('posting__inline-link');
            $link.attr('target', '_blank');
        });

        return $.html();
    }

    renderParties() {
        const { parties } = this.props;
        return (
            <div className="flex width-100 posting__parties">
                {parties &&
                    parties.map(p =>
                        <div
                            key={p}
                            title={p}
                            className={`party bg-${partyToClass[p]}`}
                        />
                    )}
            </div>
        );
    }

    renderText() {
        const { text = '' } = this.props;
        const paragraphs = text.split('\n');
        const firstParagraph = paragraphs[0];
        const rest = paragraphs.length > 1
            ? paragraphs.splice(1).join('\n')
            : null;

        const components = [
            <div
                className="posting__first-paragraph"
                dangerouslySetInnerHTML={{
                    __html: this.renderMarkdown(firstParagraph)
                }}
            />
        ];

        if (rest) {
            components.push(
                <div
                    style={{ display: 'none' }}
                    className="posting__text"
                    dangerouslySetInnerHTML={{
                        __html: this.renderMarkdown(rest)
                    }}
                />
            );

            components.push(<a className="posting__more">Weiterlesen</a>);
        }

        return components;
    }

    renderTags() {
        const { tags, freeTags } = this.props;

        const tagComponents = _.union(tags, freeTags).map(tag =>
            <a
                href={`wahl17/tags/${slug(tag.toLowerCase())}/`}
                className="tags__tag fg-white"
            >
                {tag}
            </a>
        );
        return <div className="tags">{tagComponents}</div>;
    }

    renderImage() {
        const { type, title, image, parties = [] } = this.props;

        const imageComponent = image
            ? <div>
                  <img
                      className="width-100 block posting__image"
                      src={image.file.url + '?w=640'}
                      alt={image.title}
                  />
                  {this.renderParties()}
              </div>
            : null;

        return (
            <div
                className={`posting posting--${type}`}
                data-parties={parties.map(p => partyToClass[p]).join(' ')}
            >
                {imageComponent}
                <div className="posting__title">{title}</div>
                {this.renderTags()}
                {this.renderText()}
            </div>
        );
    }

    renderVideo() {
        const {
            id,
            type,
            title,
            sourceUrl,
            videoTitle,
            videoLength,
            image,
            subtitles,
            parties = []
        } = this.props;

        return (
            <div
                className={`posting posting--${type}`}
                data-parties={parties.map(p => partyToClass[p]).join(' ')}
            >
                <div
                    className="video-mount"
                    data-src={sourceUrl}
                    data-poster={image ? image.file.url + '?w=640' : null}
                    data-title={videoTitle}
                    data-length={videoLength}
                    data-subtitles={
                        subtitles ? `/wahl17/subtitles/${id}.vtt` : null
                    }
                />
                {this.renderParties()}
                <div className="posting__title">{title}</div>
                {this.renderTags()}
                {this.renderText()}
            </div>
        );
    }

    renderFacebook() {
        const { type, sourceUrl, parties = [] } = this.props;
        const $ = cheerio.load(sourceUrl);
        const embedSrc = $('iframe').attr('src');

        if (embedSrc == null) {
            return null;
        }

        const { query } = url.parse(embedSrc, true);

        return (
            <div
                className={`posting posting--${type}`}
                data-parties={parties.map(p => partyToClass[p]).join(' ')}
            >
                <div
                    className="fb-post"
                    data-href={query.href}
                    data-width="auto"
                    data-show-text="true"
                />
            </div>
        );
    }

    render() {
        const { type } = this.props;

        if (type === 'Bild') {
            return this.renderImage();
        }

        if (type === 'Video') {
            return this.renderVideo();
        }

        if (type === 'Facebook') {
            return this.renderFacebook();
        }

        console.error(`No renderer for '${type}'`);
        return null;
    }
}

module.exports = Posting;
