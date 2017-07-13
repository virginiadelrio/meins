import React from 'react';

import injectSheet from 'react-jss';
import assign from 'lodash/assign';
import cx from 'classnames';

import Icons from './Icons.jsx';

const leftDivider = {
    marginLeft: '15px',
    paddingLeft: '15px',
    borderLeft: '1px solid rgba(255, 255, 255, .5)',

    '$medium &': {
        marginLeft: '12px',
        paddingLeft: '12px'
    }
};

const styles = {
    small: {},
    medium: {},
    large: {},
    preview: {
        position: 'relative',
        backgroundColor: '#c1c1c1',
        cursor: 'pointer',
        minHeight: '200px',

        '$medium&': {
            minHeight: '380px'
        },

        '$large&': {
            minHeight: '500px'
        }
    },
    previewImage: {
        display: 'block',
        width: '100%'
    },
    controlsBase: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0
    },
    controls: {
        padding: '100px 70px 70px 70px',

        display: 'flex',
        alignItems: 'stretch',

        background: 'linear-gradient(rgba(0,0,0,0), rgba(0,0,0,.7))',
        color: 'white',

        '$medium &': {
            padding: '40px 100px 40px 40px'
        },

        '$small &': {
            display: 'none'
        }
    },

    play: {
        marginRight: '26px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexShrink: 0,
        overflow: 'visible', // IE11
        verticalAlign: 'middle',
        border: 0,
        background: 'transparent',
        userSelect: 'none',

        '& svg': {
            width: '70px',
            height: '70px'
        },

        '$medium &': {
            marginRight: '10px'
        },

        '$medium & svg': {
            width: '40px',
            height: '40px'
        }
    },
    right: {
        flex: '1 1 auto',
        maxWidth: 'calc(100% - 80px)',

        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',

        '$medium &': {
            maxWidth: 'calc(100% - 40px)'
        }
    },
    titleRow: {
        maxWidth: '100%',

        fontFamily: 'Vollkorn, serif',
        fontSize: '48px',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        whiteSpace: 'nowrap',

        '$medium &': {
            fontSize: '28px'
        }
    },
    additionalRow: {
        display: 'flex',
        justifyContent: 'space-between',
        fontFamily: 'GothamMedium, sans-serif',
        fontSize: '18px',

        '$medium &': {
            fontSize: '12px'
        }
    },
    context: {
        fontFamily: 'Vollkorn, serif',
        textTransform: 'uppercase',
        fontWeight: 700
    },
    creator: assign(
        {
            textTransform: 'uppercase'
        }
        /* leftDivider*/
    ),
    length: assign({}, leftDivider),
    socialButton: {
        '& svg': {
            width: '1em',
            height: '1em'
        }
    },

    controlsSmall: {
        padding: '1.5em 1em 1em',
        cursor: 'pointer',

        color: 'white',
        background: 'linear-gradient(rgba(0,0,0,0), rgba(0,0,0,.7))',

        fontSize: '18px',
        lineHeight: '22px',

        '$medium &, $large &': {
            display: 'none'
        }
    },
    topRowSmall: {
        display: 'flex',
        alignItems: 'center'
    },
    titleRowSmall: {
        display: 'flex',
        alignItems: 'center',
        maxHeight: '44px',
        maxWidth: 'calc(100% - 2em)',
        overflow: 'hidden',

        fontSize: '20px',
        textOverflow: 'ellipsis'
    },
    playSmall: {
        marginRight: '8px',
        width: '1em',
        height: '1em'
    },
    lengthSmall: {
        fontSize: '16px'
    }
};

class Preview extends React.Component {
    renderSmallControls() {
        const { classes: css, title, length } = this.props;

        let previewInner = null;
        if (length == null) {
            previewInner = (
                <div className={css.titleRowSmall}>
                    <Icons.play className={css.playSmall} />{title}
                </div>
            );
        } else {
            previewInner = [
                <div className={css.topRowSmall}>
                    <Icons.play className={css.playSmall} />
                    <span className={css.lengthSmall}>{length}</span>
                </div>,
                <div className={css.titleRowSmall}>{title}</div>
            ];
        }

        return (
            <a
                className={cx(css.controlsBase, css.controlsSmall)}
                aria-label="Play"
            >
                {previewInner}
            </a>
        );
    }

    renderBigControls() {
        const {
            classes: css,
            title,
            context,
            creator,
            length
        } = this.props;

        const lengthComponent = length &&
            <span className={css.length}>{length}</span>;

        return (
            <div className={cx(css.controlsBase, css.controls)}>
                <div className={css.play} aria-label="Play">
                    <Icons.playHarder />
                </div>
                <div className={css.right}>
                    <div className={css.additionalRow}>
                        <div>
                            {/* <span className={css.context}>{context}</span> */}
                            <span className={css.creator}>{creator}</span>
                            {lengthComponent}
                        </div>
                        {/* <div> */}
                        {/* <a className={css.socialButton}> */}
                        {/* <Icons.facebook /> */}
                        {/* </a> */}
                        {/* </div> */}
                    </div>
                    <div className={css.titleRow}>
                        {title}
                    </div>
                </div>
            </div>
        );
    }

    render() {
        const {
            classes: css,
            previewImage,
            title,
            size,
            onPlay
        } = this.props;

        const controls = size === 'small'
            ? this.renderSmallControls()
            : this.renderBigControls();

        return (
            <div onClick={onPlay} className={cx(css.preview, css[size])}>
                <img
                    className={css.previewImage}
                    src={previewImage}
                    alt={title}
                />
                {controls}
            </div>
        );
    }
}

export default injectSheet(styles)(Preview);
