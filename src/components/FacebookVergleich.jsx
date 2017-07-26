const React = require('react');

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

module.exports = ({ url }) => {
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
                <meta
                    property="og:site_name"
                    content="Wahl17: Facebook Vergleich"
                />
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
                <link rel="stylesheet" href="css/facebook-vergleich.css" />

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
                    <div style={{ width: '6rem' }} />
                </header>
                <div id="fb-root" />

                <script dangerouslySetInnerHTML={{ __html: fbSdk }} />

                <script src="js/facebook-vergleich.js" />
            </body>

        </html>
    );
};
