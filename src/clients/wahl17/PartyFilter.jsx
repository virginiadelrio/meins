const React = require('react');
const every = require('lodash/every');

const parties = [
    { id: 'spoe', caption: 'SPÖ' },
    { id: 'oevp', caption: 'ÖVP' },
    { id: 'fpoe', caption: 'FPÖ' },
    { id: 'gruene', caption: 'Die Grünen' },
    { id: 'neos', caption: 'NEOS' }
];

module.exports = ({ filter, onFilterChange }) => {
    const all = every(filter, state => state);

    const partyFilter = parties.map(({ id, caption }) => {
        const className =
            'parties__filter ' +
            (!all && filter[id] ? `fg-white bg-${id}` : `fg-${id}`);

        return (
            <a
                key={id}
                className={className}
                onClick={() => onFilterChange(id)}
            >
                {caption}
            </a>
        );
    });

    return (
        <div className="parties">
            <div>
                {partyFilter}
                <a
                    className={
                        all
                            ? 'parties__filter bg-text fg-white'
                            : 'parties__filter'
                    }
                    onClick={() => onFilterChange('all')}
                >
                    Alle
                </a>
            </div>
        </div>
    );
};
