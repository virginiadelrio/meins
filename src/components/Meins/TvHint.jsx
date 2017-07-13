const React = require('react');
const moment = require('moment');

module.exports = props => {
    if (props.BroadcastContext && props.BroadcastDate) {
        const formattedBroadcastDate = moment(props.BroadcastDate).format(
            'DD.MM.YY'
        );
        const imagePath = (() => {
            switch (props.BroadcastContext) {
                case 'ZiB Magazin':
                    return 'zibmagazin.png';
                case 'ZiB 20:00':
                    return 'zib20.png';
                case 'ZiB 24:00':
                    return 'zib24.png';
                case 'Sondersendung':
                    return 'orf-eins.png';
                default:
                    throw new Error(
                        `Unknown BroadcastContext ${props.BroadcastContext}`
                    );
            }
        })();

        return (
            <div className="tv-hint">
                <div className="tv-hint__date">{formattedBroadcastDate}</div>
                <img className="tv-hint__logo" src={`img/${imagePath}`} />
            </div>
        );
    } else {
        return null;
    }
};
