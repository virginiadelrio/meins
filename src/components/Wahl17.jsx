const React = require('react');
const _ = require('lodash');

const Posting = require('./Wahl17/Posting.jsx');
const TopicMenu = require('./Wahl17/TopicMenu.jsx');

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
                  ? highlightedPost.fields.image.fields.file.url
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
                <div id="header" />
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
