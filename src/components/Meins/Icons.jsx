const React = require('react');

module.exports = () => {
    return (
        <svg
            width="0"
            height="0"
            style={{ display: 'none' }}
            className="svgsymbols"
        >

            <symbol id="facebook" viewBox="0 0 12 20">
                <path d="M0 7.5h3.75V5C3.22 3.613 3.69 2.433 5 1.25 5.573.487 6.712 0 7.5 0h3.75v3.75H7.5c-.18.62 0 .758 0 1.25v2.5h3.75v3.75H7.5V20H3.75v-8.75H0V7.5z" />
            </symbol>
            <symbol id="twitter" viewBox="0 0 22 18">
                <path d="M22 2.2c-.81.237-1.68.476-2.2 1.1.54-1.066 1.255-1.94 1.1-3.3-.384.834-1.348 1.202-2.2 1.1-1-.56-2.17-1.1-3.3-1.1-2.662 0-4.684 1.99-4.4 4.4-.284.394-.245.733 0 1.1-3.917-.228-7.242-2-9.9-4.4.045.367-.178 1.13 0 2.2-.178 1.287.62 2.647 2.2 3.3-1.108.12-1.803-.08-2.2 0-.214-.394-.214-.378 0 0-.214 1.794 1.342 3.592 3.3 4.4-.27-.3-.672-.246-1.1 0-.274-.246-.556-.275-1.1 0 .843 1.438 2.51 2.724 4.4 3.3-1.463.653-3.407 1.364-5.5 1.1-.388.264-.746.24-1.1 0 1.996 1.463 4.368 2.2 6.6 2.2 8.62 0 13.158-6.772 13.2-12.1-.042-.74-.045-.93 0-1.1.828-.647 1.593-1.43 2.2-2.2z" />
            </symbol>
            <symbol
                id="arrowRight"
                viewBox="0 0 20 20"
                preserveAspectRatio="none"
            >
                <path d="M0 0L10 10 0 20 10 20 20 10 10 0" />
            </symbol>
            <symbol
                id="arrowLeft"
                viewBox="0 0 20 20"
                preserveAspectRatio="none"
            >
                <path d="M10 0L20 0 10 10 20 20 10 20 0 10" />
            </symbol>
            <symbol
                id="arrowDown"
                viewBox="0 0 20 20"
                preserveAspectRatio="none"
            >
                <path d="M0 0L10 10 20 0 20 10 10 20 0 10 0 0" />
            </symbol>
            <symbol id="arrowUp" viewBox="0 0 20 20" preserveAspectRatio="none">
                <path d="M0 20L10 10 20 20 20 10 10 0 0 10 0 20" />
            </symbol>
            <symbol id="fullscreen" viewBox="-139.5 -153.4 279 306.8">
                <polygon
                    points="50.3,-127.6 13.5,-153.4 -95.4,-66.9 -139.5,65.2 -102.7,90.9 -60.8,-42.6"
                    transform="scale(-1,1)"
                />
                <polygon
                    points="102.7,-90.9 139.5,-65.2 95.5,66.8 -13.5,153.4 -50.3,127.6 60.9,42.5"
                    transform="scale(-1,1)"
                />
            </symbol>
            <symbol id="library" viewBox="-73.1 -81.9 146.1 163.9">
                <polygon points="-73.1,-42.9 62.8,-81.9 73.1,-47 -62.8,-7.9 	" />
                <rect x="-62.7" y="-4.9" width="135.3" height="32.9" />
                <rect x="-62.7" y="33.3" width="135.3" height="26.4" />
                <rect x="-62.7" y="65.5" width="135.3" height="16.5" />
            </symbol>
        </svg>
    );
};
