const path = require('path');
const fp = require('lodash/fp');
const objectHash = require('object-hash');
const fs = require('fs-extra');
const sharp = require('sharp');

class Task {
    constructor(fn) {
        this.run = fn;
    }
}

function getTransformedPath(src, options) {
    const hash = objectHash(options).substring(0, 8);
    const { dir, name, ext } = path.parse(src);
    // TODO this should be done earlier
    // target = path.join(dir, `${name}.${options.ensureType}`);
    const [, dirname] = dir.match(/^assets\/(.*)/);
    const basename = fp.contains(options.ensureType, ['jpg', 'png'])
        ? `${name}.${options.ensureType}`
        : `${name}${ext.toLowerCase()}`;

    return path.join('assets/_transformed', dirname, `${hash}_${basename}`);
}

function ifNotExists(src, body) {
    return fs.stat(src).then(() => new Task(() => {})).catch(err => {
        if (err.code === 'ENOENT') {
            return new Task(body);
        } else {
            throw err;
        }
    });
}

function convertImage(src, target, options) {
    const resizeOperation = sharp(src);

    if (options.width || options.height) {
        resizeOperation
            .resize(options.width, options.height)
            .max()
            .withoutEnlargement();
    }

    if (options.grayscale) {
        resizeOperation.grayscale();
    }

    console.log('converting:', src, target, options);
    return fs
        .ensureFile(target)
        .then(() => resizeOperation.toFile(target))
        .catch(err =>
            console.error('Image conversion error', src, target, options, err)
        );
}

module.exports = class BuildContext {
    constructor(config) {
        this.config = config;
        this.tasks = {};

        fs.ensureDirSync(config.buildDestination);
        fs.ensureDirSync(path.join(config.buildDestination, 'assets'));
    }

    getSource(src) {
        const [, dirname] = src.match(/^assets\/(.*)/);
        return path.join(this.config.assetSource, dirname);
    }

    img(src, options) {
        if (src == null || src.match(/^\s*$/)) {
            console.log('Warning: src empty');

            return src;
        }

        if (options == null || src.match(/\.gif$/i)) {
            const targetPath = path.join(this.config.buildDestination, src);

            if (!(targetPath in this.tasks)) {
                this.tasks[targetPath] = ifNotExists(targetPath, () => {
                    return fs.copy(this.getSource(src), targetPath);
                });
            }

            return src;
        } else {
            // const {width, height, greyScale, tint} = options;
            const transformedPath = getTransformedPath(src, options);
            const targetPath = path.join(
                this.config.buildDestination,
                transformedPath
            );

            if (!(targetPath in this.tasks)) {
                this.tasks[targetPath] = ifNotExists(targetPath, () =>
                    convertImage(this.getSource(src), targetPath, options)
                );
            }

            return transformedPath;
        }
    }
};
