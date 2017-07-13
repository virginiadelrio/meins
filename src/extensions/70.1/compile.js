const less = require('less');
const fs = require('fs');
const colors = require('/Users/filip/src/meinsdesign/src/js/colors');
const babel = require('babel-core');
const pug = require('pug');
const cheerio = require('cheerio');
const postcss = require('postcss');
const autoprefixer = require('autoprefixer');

const baseHtml = fs.readFileSync('base.html', 'utf8');
const $ = cheerio.load(baseHtml);

const pulseplay = `
<symbol id="pulseplay" viewBox="0 0 400 400"><circle fill="none" stroke="white" r="170" cx="200" cy="200" stroke-width="8"><animate attributeName="stroke-width" values="4;18;4" dur="4s" repeatCount="indefinite"></animate></circle><text x="50%" y="50%" text-anchor="middle" fill="white" font-size="100" dy="30" font-family="Gotham Condensed">PLAY</text>
</symbol>
`;

$('script').remove();
$('head').append('<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>');

$('link[rel="stylesheet"]').remove();

const html = pug.compileFile('index.pug')({
    
});

$('body').html(html);

const code = fs.readFileSync('./styles.less', 'utf8');
less.render(code, {
    globalVars: colors,
    paths: ['/Users/filip/src/meinsdesign']
}).then(css => {
    return postcss([
        autoprefixer({browsers: ['last 2 versions', '> 1%', 'Firefox ESR', 'iOS 6', 'iOS 7']})
    ]).process(css.css);
}).then(css => {
    fs.writeFileSync('css/styles.css', css);
    $('head').append('<link rel="stylesheet" href="css/styles.css">');

    babel.transformFile('./client.js', {presets: ['es2015']}, (err, client) => {
        $('body').append(`<script>${client.code}</script>`);

        const htmlString = $.html();

        fs.writeFileSync('index.html', htmlString.replace('<text>PULSE</text>', pulseplay));
        
    });
});
