const cheerio = require('cheerio');
const Promise = require('bluebird');
const fs = require('fs-extra');
const path = require('path');

const copy = Promise.promisify(fs.copy);

const fbApi = `
<div id="fb-root"></div>
<script>
 window.fbAsyncInit = function() {
     FB.init({
         appId      : '293353244353942',
         xfbml      : true,
         version    : 'v2.7'
     });
 };
 
 (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "//connect.facebook.net/de_DE/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
 }(document, 'script', 'facebook-jssdk'));
</script>
`;

module.exports = function transform(originalHtml, { buildContext }) {
    const $ = cheerio.load(originalHtml);

    $('body').prepend(fbApi);
    $('.content-container').after('<div id="fb-compare"></div>');
    $('body').append('<script src="assets/_ext/61/fbcompare.1.1.js"></script>');
    $('.title__arrow').remove();

    return copy(
        __dirname + '/assets',
        path.join(buildContext.config.buildDestination, 'assets/_ext/61')
    ).then(() => {
        return $.html();
    });
};
