const path = require('path');
const _ = require('lodash');
const slug = require('slug');
const schedule = require('node-schedule');
const config = require('config');
const argv = require('yargs').argv;

// Transpile .jsx
require('babel-register');

const mm2000 = require('./src/mm2000');

const silverStripe = require('./src/sources/silver-stripe');
const contentful = require('./src/sources/contentful');

const render = require('./src/middleware/render');
const fixPaths = require('./src/middleware/fix-paths');
const extensions = require('./src/middleware/extensions');
const oewa = require('./src/middleware/oewa');

// middleware: (tree, context) => tree

const builder = mm2000
    .init({
        target: config.get('target'),
        assets: config.get('assets')
    }) // should be part of the system
    .source(silverStripe(config.get('silverStripe')))
    .source(
        contentful({
            space: config.get('wahl17.space'),
            accessToken: config.get('wahl17.accessToken'),
            contentType: config.get('wahl17.contentType'),
            // mapper creates the necessary tree structure
            mapper(posts) {
                const postsByTag = {};
                const postsById = {};
                const subtitles = {};

                posts.forEach(post => {
                    const allTags = _.union(
                        post.fields.tags,
                        post.fields.freeTags
                    );
                    allTags.forEach(tag => {
                        postsByTag[tag] = postsByTag[tag] || [];
                        postsByTag[tag].push(post);
                    });
                });

                posts.forEach(post => {
                    const url = `wahl17/posts/${post.sys.id}`;
                    postsById[url] = {
                        url,
                        type: 'Wahl17',
                        props: {
                            posts,
                            highlightedPost: post
                        }
                    };
                });

                posts
                    .filter(post => post.fields.subtitles != null)
                    .forEach(post => {
                        const url = `wahl17/subtitles/${post.sys.id}.vtt`;
                        subtitles[url] = {
                            url,
                            content: post.fields.subtitles,
                            contentType: 'vtt',
                            props: {}
                        };
                    });

                const tagsTree = {};
                _.keys(postsByTag).forEach(tag => {
                    const url = 'wahl17/tags/' + slug(tag.toLowerCase());
                    tagsTree[url] = {
                        url,
                        type: 'Wahl17',
                        props: { posts: postsByTag[tag], selectedTopic: tag }
                    };
                });

                const siteTree = _.assign(
                    {
                        wahl17: {
                            url: 'wahl17',
                            type: 'Wahl17',
                            props: { posts, selectedTopic: 'Alle Themen' }
                        }
                    },
                    tagsTree,
                    postsById,
                    subtitles
                );
                return siteTree;
            }
        })
    )
    .source({
        fetch() {
            return {
                'facebook-vergleich': {
                    url: 'facebook-vergleich',
                    type: 'FacebookVergleich',
                    props: {}
                }
            };
        }
    })
    .use(render())
    .use(extensions({ extensionPath: config.get('extensionPath') }))
    // FIX PATHS NEEDS TO BE LAST
    .use(
        fixPaths({
            manifest: path.resolve(__dirname, './build/rev-manifest.json')
        })
    )
    .use(oewa());

if (argv.runOnInit || !argv.poll) {
    builder.build();
}

if (argv.poll) {
    const j = schedule.scheduleJob(config.get('schedule'), function() {
        builder.build();
    });
}
