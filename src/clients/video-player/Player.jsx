import React from 'react';
import ReactDOM from 'react-dom';

import plyr from 'plyr';

import cx from 'classnames';

import injectSheet from 'react-jss';

import assign from 'lodash/assign';
import omit from 'lodash/omit';
import flow from 'lodash/fp/flow';

import Icons from './Icons.jsx';
import Preview from './Preview.jsx';

import {
    controlIconSize,
    controlSpacing,
    controlIconSizeSmall,
    controlSpacingSmall,
    rangeTrackHeight,
    rangeTrackHeightSmall,
    rangeThumbActiveScale,
    rangeThumbSize,
    rangeThumbSizeSmall,
    tooltipArrowSize,
    progressLoadingSize,
    progressLoadingBg
} from './styleVars';

function px(n) {
    return n + 'px';
}

function trbl(top = 0, right = 0, bottom = 0, left = 0, unit = 'px') {
    return [top, right, bottom, left]
        .filter(v => v != null)
        .map(v => `${v}${v === 0 ? '' : unit}`)
        .join(' ');
}

const rangeTrack = {
    height: rangeTrackHeight,
    background: 'transparent',
    border: 0,
    borderRadius: '50%',
    userSelect: 'none',

    '$small &': {
        height: rangeTrackHeightSmall
    }
};

const rangeThumb = {
    position: 'relative',
    height: rangeThumbSize,
    width: rangeThumbSize,
    background: 'white',
    border: 'none',
    borderRadius: '50%',
    transition: 'background .2s ease, border .2s ease, transform .2s ease',
    boxShadow: '0 0 4px rgba(0,0,0,0.7)',

    '$small &': {
        height: rangeThumbSizeSmall,
        width: rangeThumbSizeSmall
    }
};

const styles = {
    // FIXME two "player" elements being rendered

    '@keyframes plyr-progress': {
        to: { backgroundPosition: `${progressLoadingSize}px 0` }
    },

    playerContainer: {
        textRendering: 'optimizeLegibility',
        '-webkit-font-smoothing': 'antialiased',
        textAlign: 'left',

        '& a, button, input, label': {
            touchAction: 'manipulation'
        },

        '& video, audio': {
            width: '100%',
            height: 'auto',
            verticalAlign: 'middle',
            borderRadius: 'inherit',
            backgroundColor: 'black'
        },

        '&:focus': {
            outline: 0
        },

        '& input[type="range"]': {
            display: 'block',
            width: '100%',
            margin: 0,
            padding: 0,
            verticalAlign: 'middle',

            appearance: 'none',
            cursor: 'pointer',
            border: 'none',
            background: 'transparent',

            '&::-webkit-slider-runnable-track': rangeTrack,
            '&::-webkit-slider-thumb': assign(
                {
                    appearance: 'none',
                    marginTop: px(-(rangeThumbSize - rangeTrackHeight) / 2)
                },
                rangeThumb
            ),

            '&::-moz-range-track': rangeTrack,
            '&::-moz-range-thumb': rangeThumb,

            '&::-ms-track': {
                height: px(rangeTrackHeight),
                background: 'transparent',
                border: 0,
                color: 'transparent'
            },
            '&::-ms-fill-upper': rangeTrack,
            '&::-ms-fill-lower': rangeTrack,
            '&::-ms-thumb': assign(rangeThumb, { marginTop: 0 }),
            '&::-ms-tooltip': {
                display: 'none'
            },

            '$small &::-webkit-slider-thumb': {
                marginTop: px(
                    -(rangeThumbSizeSmall - rangeTrackHeightSmall) / 2
                )
            },

            //TODO missing ms and moz

            '&:focus': {
                outline: 0
            },

            '&.tab-focus:focus': {
                outlineOffset: '3px'
            },

            '& ::-webkit-media-controls': {
                display: 'none'
            },

            // TODO range-thumb-active

            '$small &': {
                height: px(rangeThumbSizeSmall * rangeThumbActiveScale)
            }
        }
    },
    small: {},
    medium: {},
    large: {},
    width100: { width: '100%' },

    loader: {
        display: 'none',
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: '10em',
        height: '10em',
        marginLeft: '-5em',
        marginTop: '-5em',

        fontSize: '10px',
        color: 'transparent',
        borderTop: '1.1em solid rgba(255, 255, 255, 0.2)',
        borderRight: '1.1em solid rgba(255, 255, 255, 0.2)',
        borderBottom: '1.1em solid rgba(255, 255, 255, 0.2)',
        borderLeft: '1.1em solid #ffffff',
        transform: 'translateZ(0)',
        animation: 'load8 1.1s infinite linear',
        borderRadius: '50%',

        '$stateLoading &': {
            display: 'block'
        },

        '$small &': {
            width: '7em',
            height: '7em',
            marginLeft: '-3.5em',
            marginTop: '-3.5em',

            borderTop: '.7em solid rgba(255, 255, 255, 0.2)',
            borderRight: '.7em solid rgba(255, 255, 255, 0.2)',
            borderBottom: '.7em solid rgba(255, 255, 255, 0.2)',
            borderLeft: '.7em solid #ffffff'
        }
    },
    '@keyframes load8': {
        '0%': {
            transform: 'rotate(0deg)'
        },
        '100%': {
            transform: 'rotate(360deg)'
        }
    },

    player: {
        position: 'relative',
        maxWidth: '100%',
        minWidth: '200px',
        fontFamily: 'sans-serif'
    },

    seekInput: {
        height: px(rangeThumbSize * rangeThumbActiveScale)
    },

    videoWrapper: {
        position: 'relative'
    },

    controls: {
        transition: 'opacity .3s ease'
    },

    bottomControls: {
        // composes: 'flex align-center'
        display: 'flex',
        alignItems: 'center',

        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        padding: px(controlIconSize),
        background: 'linear-gradient(rgba(0,0,0,0), rgba(0,0,0,.6))',
        borderBottomLeftRadius: 'inherit',
        borderBottomRightRadius: 'inherit',
        color: 'white',

        button: {
            // Hover and tab focus
            '&.tab-focus:focus, &:hover': {
                background: 'green',
                color: 'white'
            }
        },

        '$small &': {
            padding: `${1.5 * controlSpacingSmall}px ${controlSpacingSmall}px`
        },

        '$stateLoading &': {
            display: 'none'
        }
    },

    topControls: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        padding: '10px 10px 40px',

        fontFamily: 'Vollkorn, serif',
        color: 'white',
        background: 'linear-gradient(rgba(0,0,0,.6), rgba(0,0,0,0))'
    },

    hideControls: {
        '& $controls': {
            opacity: 0,
            pointerEvents: 'none'
        }
    },

    button: {
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexShrink: 0,
        overflow: 'visible', // IE11
        verticalAlign: 'middle',
        padding: `0 ${controlSpacing * 0.7}px`,
        border: 0,
        background: 'transparent',
        cursor: 'pointer',
        transition: 'background .3s ease, color .3s ease, opacity .3s ease',
        fontFamily: 'GothamMedium, sans-serif',
        fontSize: px(controlIconSize * 0.8),
        color: 'inherit',
        userSelect: 'none',

        '&::-moz-focus-inner': {
            border: 0,
            margin: 0,
            padding: 0
        },

        '& svg': {
            width: px(controlIconSize),
            height: px(controlIconSize),
            fill: 'currentColor'
        },

        // Default focus
        '&:focus': {
            outline: 0
        },

        '$small &': {
            padding: `0 ${controlSpacingSmall * 0.7}px`,
            fontSize: px(controlIconSizeSmall * 0.8)
        },

        '$small & svg': {
            width: px(controlIconSizeSmall),
            height: px(controlIconSizeSmall)
        }
    },

    buttonDisabled: {
        opacity: 0.5
    },

    progress: {
        display: 'inline-block',
        position: 'relative',
        flex: 1,

        '& input[type="range"]': {
            position: 'relative',
            zIndex: 2,

            '&::-webkit-slider-runnable-track': {
                background: 'transparent'
            },
            '&::-moz-range-track': {
                background: 'transparent'
            },
            '&::-ms-fill-upper': {
                background: 'transparent'
            }
        },

        '$small &': {
            margin: `0 ${controlSpacingSmall}px`
        }
    },

    progressBase: {
        position: 'absolute',
        left: 0,
        top: '50%',
        width: '100%',
        height: px(rangeTrackHeight),
        margin: trbl(-rangeTrackHeight / 2),
        padding: '1px',
        verticalAlign: 'top',
        appearance: 'none',
        border: 'none',
        borderRadius: '100px',

        '&::-webkit-progress-bar': {
            background: 'transparent'
        },

        '&::-webkit-progress-value': {
            background: 'currentColor',
            borderRadius: '100px'
        },
        '&::-moz-progress-bar': {
            background: 'currentColor',
            borderRadius: '100px'
        },
        '&::-ms-fill': {
            borderRadius: '100px'
        },

        '$small &': {
            height: px(rangeTrackHeightSmall),
            margin: trbl(-rangeTrackHeightSmall / 2),
            padding: '1px'
        }
    },

    progressPlayed: {
        zIndex: 1,
        color: 'rgba(255,255,255,.7)',
        background: 'transparent',
        transition: 'none',

        '&::-webkit-progress-value': {
            maxWidth: '99%',
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0,
            transition: 'none'
        },
        '&::-moz-progress-bar': {
            background: 'currentColor',
            borderRadius: '100px'
        },
        '&::-ms-fill': {
            borderRadius: '100px'
        }
    },

    progressBuffer: {
        color: 'rgba(255,255,255,.4)',
        backgroundColor: 'black',

        '&::-webkit-progress-value': {
            transition: 'width .2s ease'
        },
        '&::-moz-progress-bar': {
            transition: 'width .2s ease'
        },
        '&::-ms-fill': {
            transition: 'width .2s ease'
        }
    },

    time: {
        width: '80px',
        fontFamily: 'GothamMedium, sans-serif',
        fontSize: '15px',
        textAlign: 'center',

        '$small &': {
            width: '50px',
            fontSize: '12px'
        }
    },

    timeCurrent: {},
    timeCurrentText: {},

    timeDuration: {
        '$small &': {
            display: 'none'
        }
    },
    timeDurationText: {},

    volume: {
        position: 'relative',

        '&:hover $volumeTrack': {
            backgroundColor: 'rgba(0, 0, 0, .5)',
            display: 'block'
        },

        '$small &': {
            display: 'none'
        }
    },
    volumeTrack: {
        display: 'none',

        position: 'absolute',
        top: '40px',
        left: '5px',
        width: '190px',
        paddingLeft: '50px',
        paddingRight: '15px',

        transform: 'rotate(270deg)',
        transformOrigin: 'top left'
    },
    volumeRange: {
        height: '50px',
        opacity: 0,

        '&::-webkit-slider-thumb': {
            visibility: 'hidden'
        },
        '&::-moz-range-thumb': {
            visibility: 'hidden'
        },
        '&::-ms-thumb': {
            visibility: 'hidden'
        }
    },
    volumeProgress: {
        pointerEvents: 'none',
        background: 'transparent',
        border: '1px solid white',
        color: 'white',

        '$progressBase&': {
            left: '50px',
            /* right: '15px',*/
            width: '124px',
            height: '8px',

            margin: '-4px 0 0 0',
            padding: 0
        }
    },
    muted: {},
    volumeIcon: {
        zIndex: 2,

        '$muted &': {
            display: 'none'
        }
    },
    mutedIcon: {
        display: 'none',
        zIndex: 2,

        '$muted &': {
            display: 'block'
        }
    },

    tooltip: {
        position: 'absolute',
        zIndex: 2,
        bottom: '100%',
        left: 0,
        marginBottom: px(tooltipArrowSize * 4),
        padding: `${tooltipArrowSize + 1}px ${tooltipArrowSize * 1.5 + 1}px`,
        pointerEvents: 'none',

        opacity: 0,
        background: 'black',
        borderRadius: '3px',

        color: 'white',
        fontSize: '20px',
        lineHeight: 1.3,

        transform: 'translate(-50%, 10px) scale(.8)',
        transformOrigin: '50% 100%',
        transition: 'transform .2s .1s ease, opacity .2s .1s ease',

        '&::before': {
            // Arrows
            content: '""',
            position: 'absolute',
            width: 0,
            height: 0,
            left: '50%',
            transform: 'translateX(-50%)',

            // The background triangle
            bottom: px(-tooltipArrowSize),
            borderRight: `${tooltipArrowSize}px solid transparent`,
            borderTop: `${tooltipArrowSize}px solid black`,
            borderLeft: `${tooltipArrowSize}px solid transparent`,
            zIndex: 2
        },

        '&--visible': {
            opacity: 1
        }
    },

    screenReader: {
        clip: 'rect(1px, 1px, 1px, 1px)',
        overflow: 'hidden',

        position: 'absolute',
        padding: 0,
        border: 0,
        height: '1px',
        width: '1px'
    },

    fullscreenActive: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        height: '100%',
        width: '100%',
        zIndex: 10000000,
        background: '#000',
        borderRadius: '0 !important',

        '& video': {
            height: '100%'
        },

        '& $videoWrapper': {
            height: '100%',
            width: '100%'
        },

        '& $controls': {
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0
        },

        '& $iconFullscreen': {
            display: 'none'
        },

        '& $iconExitFullscreen': {
            display: 'flex'
        }
    },

    statePlaying: {
        '& [data-plyr="play"]': {
            display: 'none'
        }
    },

    statePaused: {
        '& [data-plyr="pause"]': {
            display: 'none'
        }
    },

    stateLoading: {
        '& $progressBuffer': {
            animation: 'plyr-progress 1s linear infinite',
            backgroundSize: `${progressLoadingSize}px ${progressLoadingSize}px`,
            backgroundRepeat: 'repeat-x',
            backgroundImage: `linear-gradient(-45deg, ${progressLoadingBg} 25%, transparent 25%, transparent 50%, ${progressLoadingBg} 50%, ${progressLoadingBg} 75%, transparent 75%, transparent)`,
            color: 'transparent'
        }
    },

    buttonHd: {},

    iconFullscreen: {
        paddingTop: '2px' // FIXME why?
    },
    iconExitFullscreen: {
        display: 'none'
    },

    captions: {
        position: 'absolute',
        left: '0',
        width: '100%',
        bottom: '2.5rem',

        '& span': {
            display: 'block',
            width: '80%',
            maxWidth: '30rem',
            margin: '0 auto',
            padding: '5px 12px',

            background: 'rgba(0, 0, 0, 0.35)',
            textAlign: 'center',
            color: 'white',
            whiteSpace: 'pre-line',
            fontSize: '1.6rem'
        },

        '& span:empty': {
            background: 'none'
        }
    }
};

/* document.querySelector('.plyr__controls-wrapper').addEventListener('click', e => {
 *     if(e.srcElement.id === 'test123') {
 *         player[0].play();
 *     }
 * });
 * */

function getPlyrHtml({ classes: css, sources }) {
    const el = document.createElement('div');

    const hdButton = 'sd' in sources && 'hd' in sources
        ? <button type="button" className={cx(css.button, css.buttonHd)}>
              HD
          </button>
        : null;

    ReactDOM.render(
        <div className={css.controls}>
            {/* <div className={css.topControls}> */}
            {/* {title} */}
            {/* </div> */}
            <div className={css.loader}>
                loading...
            </div>
            <div className={css.bottomControls}>
                <button className={css.button} data-plyr="play">
                    <Icons.play />
                </button>
                <button className={css.button} data-plyr="pause">
                    <Icons.pause />
                </button>
                <span className={cx(css.time, css.timeCurrent)}>
                    <span className={css.screenReader}>Current time</span>
                    <span className={css.timeCurrentText}>00:00</span>
                </span>
                <span className={css.progress}>
                    <label htmlFor="seek{id}" className={css.screenReader}>
                        Seek
                    </label>
                    <input
                        id="seek{id}"
                        className={css.seekInput}
                        type="range"
                        min="0"
                        max="100"
                        step="0.1"
                        defaultValue="0"
                        data-plyr="seek"
                    />
                    <progress
                        className={cx(css.progressBase, css.progressPlayed)}
                        max="100"
                        value="0"
                        role="presentation"
                    />
                    <progress
                        className={cx(css.progressBase, css.progressBuffer)}
                        max="100"
                        value="0"
                    >
                        <span>0</span>% buffered
                    </progress>
                    <span className={css.tooltip}>00:00</span>
                </span>
                <span className={cx(css.time, css.timeDuration)}>
                    <span className={css.screenReader}>Duration</span>
                    <span className={css.timeDurationText}>00:00</span>
                </span>
                {hdButton}
                <div className={css.volume}>
                    <div className={css.volumeTrack}>
                        <progress
                            className={cx(css.progressBase, css.volumeProgress)}
                            min="0"
                            max="10"
                        />
                        <input
                            className={css.volumeRange}
                            type="range"
                            min="0"
                            max="10"
                            defaultValue="8"
                            data-plyr="volume"
                        />
                    </div>
                    <button
                        type="button"
                        className={cx(css.button, css.volume)}
                    >
                        <Icons.volume className={css.volumeIcon} />
                        <Icons.muted className={css.mutedIcon} />
                    </button>
                </div>
                <button
                    type="button"
                    className={css.button}
                    data-plyr="fullscreen"
                >
                    <Icons.fullscreen className={css.iconFullscreen} />
                    <Icons.exitFullscreen className={css.iconExitFullscreen} />
                </button>
            </div>
        </div>,
        el
    );

    return el.outerHTML;
}

class Player extends React.Component {
    constructor(props) {
        super(props);

        const { initialState, sources } = this.props;

        this.state = {
            // sizes: small=mobile, medium>=768, large>=1024
            state: initialState || 'preview',
            hd: 'hd' in sources
        };
    }

    getSize(width) {
        if (width >= 1024) {
            return 'large';
        } else if (width >= 768) {
            return 'medium';
        }
        return 'small';
    }

    render() {
        const { classes: css, errorImage } = this.props;
        const size = this.getSize(this.props.size.width);
        const previewProps = omit(this.props, 'classes');

        const preview = this.state.state === 'preview'
            ? <Preview
                  {...previewProps}
                  size={size}
                  onPlay={() => this.setState({ state: 'watching' })}
              />
            : null;

        // FIXME temporary, this should be handled outside via onError
        const error = this.state.state === 'error'
            ? <img
                  style={{ display: 'block' }}
                  className={css.width100}
                  src={errorImage || 'http://meins.orf.at/img/video-error.jpg'}
              />
            : null;

        return (
            <div className={cx(css.playerContainer, css[size])} ref="player">
                {preview}
                {error}
            </div>
        );
    }

    componentDidMount() {
        const { signalReset } = this.props;

        this.plyHtml = getPlyrHtml(this.props);
        if (this.state.state === 'watching') {
            this._mountPlayer();
        }

        if (signalReset) {
            signalReset.subscribe(() => this.setState({ state: 'preview' }));
        }
    }

    componentDidUpdate(prevProps, prevState) {
        // XXX omitted source change handling, shouldn't really be a case

        if (prevState.state !== 'watching' && this.state.state === 'watching') {
            this._mountPlayer();
        }

        if (prevState.state === 'watching' && this.state.state !== 'watching') {
            this._unmountPlayer();
        }

        if (prevState.hd !== this.state.hd) {
            // change source
            // change look
        }
    }

    _mountPlayer() {
        const {
            classes: css,
            sources,
            previewImage,
            subtitles,
            onPlay,
            onMount
        } = this.props;

        const videoEl = document.createElement('video');

        this.refs.player.appendChild(videoEl);

        this._plyr = plyr.setup(videoEl, {
            html: this.plyHtml,
            storage: {
                enabled: true,
                key: '_plyr_'
            },
            classes: {
                fullscreen: { active: css.fullscreenActive },
                hideControls: css.hideControls,
                stopped: css.statePaused,
                playing: css.statePlaying,
                loading: css.stateLoading,
                tooltip: css.tooltip,
                videoWrapper: css.videoWrapper,
                muted: css.muted
            },
            selectors: {
                container: '.' + css.player,
                controls: {
                    container: null,
                    wrapper: '.' + css.controls
                },
                progress: {
                    container: '.' + css.progress,
                    buffer: '.' + css.progressBuffer,
                    played: '.' + css.progressPlayed
                },
                currentTime: '.' + css.timeCurrentText,
                duration: '.' + css.timeDurationText,
                volume: {
                    display: '.' + css.volumeProgress
                },
                captions: '.' + css.captions
            }
        })[0];

        const source = sources.hd || sources.sd;

        const sourceSpec = {
            type: 'video',
            title: 'Accessibility title',
            poster: previewImage,
            sources: [
                {
                    src: source.src,
                    type: `video/${source.type}`
                }
            ]
        };

        if (subtitles) {
            sourceSpec.tracks = [
                {
                    kind: 'captions',
                    label: 'Deutsch',
                    srclang: 'de',
                    src: subtitles,
                    default: true
                }
            ];
        }

        this._plyr.source(sourceSpec);

        const hdButton = this._plyr
            .getContainer()
            .querySelector('.' + css.buttonHd);

        if (hdButton) {
            hdButton.addEventListener('click', () =>
                this.setState({ hd: !this.state.hd })
            );
        }

        window.plyr = this._plyr;
        this._plyr.play();

        //         this._plyr.on('ready', () => {
        //             const gotoTime = this.onReadyGoto;
        //             setTimeout(
        //                 () => {
        //                     this._plyr.seek(gotoTime);
        //                 },
        //                 200
        //             );
        //             this.onReadyGoto = null;
        //         });

        if (typeof onPlay === 'function') {
            this._plyr.on('play', onPlay);
        }

        this._plyr
            .getMedia()
            .querySelector('source')
            .addEventListener('error', err => {
                console.error(err);
                this.setState({ state: 'error' });
            });

        if (typeof onMount === 'function') {
            onMount();
        }
    }

    _unmountPlayer() {
        this._plyr.destroy();
        this._plyr = null;
        this.refs.player.removeChild(this.refs.player.querySelector('video'));
    }
}

const PT = React.PropTypes;

const sourceShape = PT.shape({
    src: PT.string,
    type: PT.oneOf(['mp4']) // add HLS in future
});

Player.propTypes = {
    initialState: PT.oneOf(['preview', 'watching']),
    title: PT.string,
    context: PT.string,
    creator: PT.string,
    length: PT.string,
    shareUrl: PT.string,
    sources: PT.shape({
        sd: sourceShape,
        hd: sourceShape
    }),
    onPlay: PT.func,
    onMount: PT.func,
    signalReset: PT.object
};

function sizeMe(C) {
    class SizedComponent extends React.Component {
        constructor(props) {
            super(props);

            this.listener = () => {
                const el = ReactDOM.findDOMNode(this);
                const { height, width } = el.getBoundingClientRect();
                this.setState({ height, width });
            };

            this.state = {};
        }

        componentDidMount() {
            window.addEventListener('resize', this.listener);
            setTimeout(this.listener, 20);
        }

        componentWillUnmount() {
            window.removeEventListener('resize', this.listener);
        }

        render() {
            const props = assign({}, this.props, { size: this.state });
            return <C {...props} />;
        }
    }

    return SizedComponent;
}

export default flow(injectSheet(styles), sizeMe)(Player);
