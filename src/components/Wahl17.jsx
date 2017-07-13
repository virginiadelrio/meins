const React = require('react');
const fp = require('lodash/fp');

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
    const renderedPostings = fp.flow(
        fp.sortBy(p => {
            if (p.sortDate) {
                return -new Date(p.sortDate);
            }
            return -new Date(p.sys.createdAt);
        }),
        fp.map(({ sys, fields }) =>
            <Posting
                key={sys.id}
                id={sys.id}
                {...fields}
                image={fields.image ? fields.image.fields : null}
            />
        )
    )(posts);

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

    const highlightedModal = highlightedPost
        ? <div className="modal">
              <button className="modal__close">&times;</button>
              <div className="model__body">
                  <Posting
                      key={highlightedPost.sys.id}
                      {...highlightedPost.fields}
                      image={
                          highlightedPost.fields.image
                              ? highlightedPost.fields.image.fields
                              : null
                      }
                  />
              </div>
          </div>
        : null;

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
                <meta property="og:title" content="Wahl 17" />
                <meta property="og:description" content="Wahl 17" />
                <meta property="og:site_name" content="Hundert Tage Wahl" />
                {/* <meta property="og:image" content={fullShareImagePath} /> */}

                {/* <meta name="twitter:card" content="summary_large_image" />
                    <meta name="twitter:title" content={title} />
                    <meta name="twitter:site" content="@orfeins" />
                    <meta name="twitter:description" content={description} />
                    <meta name="twitter:image" content={fullShareImagePath} />
                  */}
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
                <div id="header" />
                <TopicMenu items={items} selectedTopic={selectedTopic} />

                {desktopPostings}
                {mobilePostings}

                <script src="js/wahl17.js" />

                <div id="fb-root" />
                <script dangerouslySetInnerHTML={{ __html: fbSdk }} />
                {resetUrlScript}
                {highlightedModal}

            </body>

        </html>
    );
};
