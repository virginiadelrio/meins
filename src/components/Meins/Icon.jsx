const React = require('react');

module.exports = ({ title, className, href, transform }) => {
    return (
        <svg title={title} className={className}>
            <use
                xlinkHref={href}
                xmlnsXlink="http://www.w3.org/1999/xlink"
                transform={transform}
            />
        </svg>
    );
};
