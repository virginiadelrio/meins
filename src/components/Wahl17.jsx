const React = require('react');
const _ = require('lodash');

const Posting = require('./Wahl17/Posting.jsx');
const TopicMenu = require('./Wahl17/TopicMenu.jsx');

const partyToClass = require('../utils/wahl17/party-to-class');

const fbSdk = `
      window.fbAsyncInit = function() {
        FB.init({
          appId      : '293353244353942',
          xfbml      : true,
          version    : 'v2.9'
        });
      };
    
      (function(d, s, id){
         var js, fjs = d.getElementsByTagName(s)[0];
         if (d.getElementById(id)) {return;}
         js = d.createElement(s); js.id = id;
         js.src = "//connect.facebook.net/de_DE/sdk.js";
         fjs.parentNode.insertBefore(js, fjs);
       }(document, 'script', 'facebook-jssdk'));
`;

module.exports = ({ url, posts, highlightedPost, selectedTopic }) => {
    let sortedPosts = _.sortBy(posts, p => {
        if (p.sortDate) {
            return -new Date(p.sortDate);
        }
        return -new Date(p.sys.createdAt);
    });

    if (highlightedPost) {
        sortedPosts = [highlightedPost].concat(
            _.without(sortedPosts, highlightedPost)
        );
    }

    const renderedPostings = sortedPosts.map(({ sys, fields }) =>
        <Posting
            key={sys.id}
            id={sys.id}
            {...fields}
            image={fields.image ? fields.image.fields : null}
        />
    );

    const left = [],
        right = [];

    for (let ii = 0; ii < renderedPostings.length; ii++) {
        if (ii % 2 === 0) {
            left.push(renderedPostings[ii]);
        } else {
            right.push(renderedPostings[ii]);
        }
    }

    const desktopPostings = (
        <div className="hide-lt-lg">
            <div className="postings postings--desktop flex">
                <div className="postings__column">{left}</div>
                <div className="postings__column">{right}</div>
            </div>
        </div>
    );

    const mobilePostings = (
        <div className="postings postings--mobile show-lt-lg">
            {renderedPostings}
        </div>
    );

    const resetUrlScript = highlightedPost
        ? <script
              dangerouslySetInnerHTML={{
                  __html:
                      "$(document).ready(function(){window.history && history.replaceState({},'wahl17','/wahl17')});"
              }}
          />
        : null;

    /* const highlightedModal = highlightedPost
     *     ? <div className="modal">
     *           <button className="modal__close">&times;</button>
     *           <div className="model__body">
     *               <Posting
     *                   key={highlightedPost.sys.id}
     *                   {...highlightedPost.fields}
     *                   image={
     *                       highlightedPost.fields.image
     *                           ? highlightedPost.fields.image.fields
     *                           : null
     *                   }
     *               />
     *           </div>
     *       </div>
     *     : null;
     */
    const allItems = [
        { text: 'Alle Themen', href: 'wahl17/' },
        { text: 'Asyl', href: 'wahl17/tags/asyl/' },
        { text: 'Sicherheit', href: 'wahl17/tags/sicherheit/' },
        {
            text: 'Gesellschaft',
            href: 'wahl17/tags/gesellschaft/'
        },
        { text: 'Wirtschaft', href: 'wahl17/tags/wirtschaft/' },
        { text: 'Macht', href: 'wahl17/tags/macht/' },
        {
            text: 'Querfeldeins',
            href: 'wahl17/tags/querfeldeins/'
        }
    ];

    const items = allItems.filter(({ text }) => text !== selectedTopic);

    const sharing = highlightedPost
        ? {
              title: 'Wahl17 - ' + highlightedPost.fields.title,
              description: highlightedPost.fields.title,
              image: highlightedPost.fields.image
                  ? 'http:' + highlightedPost.fields.image.fields.file.url
                  : 'http://meins.orf.at/img/orf-eins.png'
          }
        : {
              title: 'Wahl17',

              image: 'http://meins.orf.at/img/orf-eins.png'
          };

    return (
        <html>
            <head>
                <meta charSet="utf-8" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
                <meta name="description" content={'Wahl 17'} />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />

                <meta
                    property="og:url"
                    content={`http://meins.orf.at/${url}`}
                />
                <meta property="og:title" content={sharing.title} />
                <meta property="og:description" content={sharing.description} />
                <meta property="og:site_name" content="Wahl17" />
                <meta property="og:image" content={sharing.image} />

                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={sharing.title} />
                <meta name="twitter:site" content="@orfeins" />
                <meta
                    name="twitter:description"
                    content={sharing.description}
                />
                <meta name="twitter:image" content={sharing.image} />
                <title>Wahl 17</title>

                <link
                    rel="apple-touch-icon"
                    href="http://meins.orf.at/img/favicon.png"
                />
                <link
                    rel="icon"
                    type="image/png"
                    href="http://meins.orf.at/img/favicon.png"
                />

                <link rel="stylesheet" href="css/wahl17.css" />

                <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js" />

            </head>

            <body>
                <svg
                    width="0"
                    height="0"
                    style={{ display: 'none' }}
                    className="svgsymbols"
                >
                    <symbol id="facebook" viewBox="0 0 12 20">
                        <path d="M0 7.5h3.75V5C3.22 3.613 3.69 2.433 5 1.25 5.573.487 6.712 0 7.5 0h3.75v3.75H7.5c-.18.62 0 .758 0 1.25v2.5h3.75v3.75H7.5V20H3.75v-8.75H0V7.5z" />
                    </symbol>
                    <symbol id="twitter" viewBox="0 0 22 18">
                        <path d="M22 2.2c-.81.237-1.68.476-2.2 1.1.54-1.066 1.255-1.94 1.1-3.3-.384.834-1.348 1.202-2.2 1.1-1-.56-2.17-1.1-3.3-1.1-2.662 0-4.684 1.99-4.4 4.4-.284.394-.245.733 0 1.1-3.917-.228-7.242-2-9.9-4.4.045.367-.178 1.13 0 2.2-.178 1.287.62 2.647 2.2 3.3-1.108.12-1.803-.08-2.2 0-.214-.394-.214-.378 0 0-.214 1.794 1.342 3.592 3.3 4.4-.27-.3-.672-.246-1.1 0-.274-.246-.556-.275-1.1 0 .843 1.438 2.51 2.724 4.4 3.3-1.463.653-3.407 1.364-5.5 1.1-.388.264-.746.24-1.1 0 1.996 1.463 4.368 2.2 6.6 2.2 8.62 0 13.158-6.772 13.2-12.1-.042-.74-.045-.93 0-1.1.828-.647 1.593-1.43 2.2-2.2z" />
                    </symbol>
                </svg>
                <header className="flex space-between align-center top-header">
                    <img
                        className="orf-eins-logo"
                        src="http://meins.orf.at/img/orf-eins.png"
                        alt="ORFeins"
                    />
                    <a className="wahl-logo" href="wahl17">
                        <span className="wahl-logo__wahl">Wahl</span>
                        <span className="wahl-logo__17">17</span>
                    </a>
                </header>
                <div className="flex align-center justify-center tags top-header">
                    {_.map(partyToClass, (v, k) =>
                        <a
                            className="tags__tag fg-white"
                            href={`wahl17/tags/${v}/`}
                        >
                            {k}
                        </a>
                    )}
                </div>
                <TopicMenu items={items} selectedTopic={selectedTopic} />

                {desktopPostings}
                {mobilePostings}

                <script src="js/wahl17.js" />

                <div id="fb-root" />
                <script dangerouslySetInnerHTML={{ __html: fbSdk }} />
                {/* {resetUrlScript} */}
                {/* {highlightedModal} */}

            </body>

        </html>
    );
};
