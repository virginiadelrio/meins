const React = require('react');
const fp = require('lodash/fp');

const MainPageBody = require('./Meins/MainPageBody.jsx');
const siteTreeHelpers = require('../utils/silver-stripe/siteTreeHelpers');

function getDynamicTitle({ type, ID, siteTree, MainHeadline }) {
    if (type === 'MainPage') {
        return (MainHeadline || '').replace(/&shy;/g, '');
    } else {
        const siteTreeNode = siteTree[ID];
        const parentNode = siteTree[siteTreeNode.parentId];

        return (parentNode.content.MainHeadline || '').replace(/&shy;/g, '');
    }
}

function getDynamicDescription({ type, ID, siteTree, SubHeadline }) {
    if (type === 'MainPage') {
        return SubHeadline;
    } else {
        const siteTreeNode = siteTree[ID];
        const parentNode = siteTree[siteTreeNode.parentId];

        return parentNode.content.SubHeadline;
    }
}

module.exports = props => {
    const { buildContext } = props;

    const shareImage = props.HeroImageSrc
        ? buildContext.img(props.HeroImageSrc, { width: 1280 })
        : buildContext.img(props.OverviewImageSrc, { width: 1280 });

    const fullShareImagePath = `http://meins.orf.at/${shareImage}`;

    const title = `Meins - ${getDynamicTitle(props)}`;
    const description = getDynamicDescription(props);

    const latestRelease = fp.defaultTo(
        { props: {} },
        fp.head(siteTreeHelpers.getSortedPages(props.siteTree))
    );

    return (
        <html>
            <head>
                <meta charSet="utf-8" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
                <meta name="description" content={description} />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />

                <meta
                    property="og:url"
                    content={`http://meins.orf.at/${props.url}`}
                />
                <meta property="og:title" content={title} />
                <meta property="og:description" content={description} />
                <meta property="og:site_name" content="M eins" />
                <meta property="og:image" content={fullShareImagePath} />

                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={title} />
                <meta name="twitter:site" content="@orfmeins" />
                <meta name="twitter:description" content={description} />
                <meta name="twitter:image" content={fullShareImagePath} />

                <title>{title}</title>

                <link
                    rel="apple-touch-icon"
                    href="http://meins.orf.at/img/favicon.png"
                />
                <link
                    rel="icon"
                    type="image/png"
                    href="http://meins.orf.at/img/favicon.png"
                />

                <link rel="stylesheet" href="css/meins.css" />

                <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js" />
                <script
                    dangerouslySetInnerHTML={{
                        __html: `var MeinsContext = {latestRelease: ${latestRelease
                            .props
                            .ReleaseNumber}, release: ${props.ReleaseNumber}, url: '${props.url}'};`
                    }}
                />

            </head>

            <MainPageBody {...props} />

        </html>
    );
};
