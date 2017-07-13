const path = require('path');
const co = require('co');
const _ = require('lodash');
const fs = require('fs-extra');
const BuildContext = require('./BuildContext');
const Bluebird = require('bluebird');

const sources = [];
const middleware = [];
const options = {};

let timer = null;

let context = null;

let buildRunning = false;
let buildQueued = false;

const renderCachedProps = {};

const mm2000 = {
    init(opts) {
        _.assign(options, opts);

        context = new BuildContext({
            buildDestination: opts.target,
            assetSource: opts.assets
        });

        return mm2000;
    },
    set(key, value) {
        options[key] = value;

        return mm2000;
    },
    source(source, opts) {
        sources.push({ source, opts });

        return mm2000;
    },
    use(m) {
        middleware.push(m);
        return mm2000;
    },
    build() {
        if (buildRunning) {
            console.log('Build running, request queued');
            buildQueued = true;
            return;
        }
        buildRunning = true;

        const startTime = Date.now();

        console.log('Building');

        if (options.target == null) {
            throw new Error('Target not specified');
        }

        co(function*() {
            const tree = {};

            try {
                // Fetch from sources
                const trees = yield sources.map(s => {
                    // s.lastUpdate = yield s.source.getLastUpdate();

                    return s.source.fetch();
                });

                trees.forEach(sourceTree => _.assign(tree, sourceTree));

                _.forEach(tree, (sourceTree, url) => {
                    if (_.isEqual(renderCachedProps[url], sourceTree)) {
                        // Don't go through render again
                        delete tree[url];
                        return;
                    }
                    renderCachedProps[url] = sourceTree;
                });

                // Apply middleware
                let nextTree = tree;
                for (const m of middleware) {
                    nextTree = yield m(nextTree, context);
                }

                // Write to disc
                yield _.map(nextTree, ({ content }, url) => {
                    const [, extension] = url.match(/\.(.+)$/) || [];

                    const filename = extension
                        ? path.join(options.target, url)
                        : path.join(options.target, url, 'index.html');

                    return fs.ensureFile(filename).then(() => {
                        fs.writeFile(filename, content, {
                            mode: 0o644
                        });
                    });
                });

                // Limit to 4 concurrent resize jobs
                yield Bluebird.map(_.values(context.tasks), t => t.run(), {
                    concurrency: 4
                });
            } catch (err) {
                console.error(err);
                process.exit(1);
            }
        }).then(() => {
            console.log('Build took', Date.now() - startTime, '(ms)');
            buildRunning = false;
            if (buildQueued) {
                return mm2000.build();
            }
        });

        return mm2000;
    },
    poll(interval) {
        return mm2000;
    }
};

module.exports = mm2000;
