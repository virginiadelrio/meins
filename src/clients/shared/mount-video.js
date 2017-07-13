/* global oewa, OEWA */

const $ = require('jquery');
const React = require('react');
const ReactDOM = require('react-dom');
const once = require('lodash/once');

const Einsplayer = require('../video-player/Player.jsx').default;

const resetSignals = [];

class Signal {
    constructor() {
        this._listeners = [];
    }

    subscribe(l) {
        this._listeners.push(l);
    }

    send(s) {
        this._listeners.forEach(l => l(s));
    }
}

function countPageImpression() {
    try {
        oewa.c({}, OEWA, 2);
    } catch (e) {}
}

function mountVideo({ posterFallback, titleFallback, creatorFallback } = {}) {
    $('.video-mount').each(function() {
        const src = this.getAttribute('data-src');
        const poster = this.getAttribute('data-poster') || posterFallback;
        const title = this.getAttribute('data-title') || titleFallback;
        const creator = this.getAttribute('data-creator') || creatorFallback;
        const length = this.getAttribute('data-length');
        const subtitles = this.getAttribute('data-subtitles');

        const signalReset = new Signal();

        ReactDOM.render(
            React.createElement(Einsplayer, {
                title,
                creator,
                length,
                signalReset,
                previewImage: poster,
                initialState: 'preview',
                sources: {
                    sd: {
                        src,
                        type: 'mp4'
                    }
                },
                subtitles,
                onMount() {
                    // XXX this is just a temporary workaround
                    resetSignals
                        .filter(s => s !== signalReset)
                        .forEach(s => s.send());
                },
                onPlay: once(countPageImpression)
            }),
            this
        );

        resetSignals.push(signalReset);
    });
}

module.exports = mountVideo;
