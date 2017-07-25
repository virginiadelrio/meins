const $ = require('jquery');
const React = require('react');
const ReactDOM = require('react-dom');
const forEach = require('lodash/forEach');
const every = require('lodash/every');

const PartyFilter = require('./wahl17/PartyFilter.jsx');
const mountVideo = require('./shared/mount-video');

$(document).ready(() => {
    mountVideo({
        posterFallback: 'http://placehold.it/1280x720',
        titleFallback: '',
        creatorFallback: 'ORFeins'
    });

    $('.posting').each(function() {
        let hidden = true;
        const $el = $(this);
        const $moreButton = $el.find('.posting__more');

        $moreButton.click(() => {
            if (hidden) {
                $el.find('.posting__text').show();
                $moreButton.text('Verbergen');
            } else {
                $el.find('.posting__text').hide();
                $moreButton.text('Weiterlesen');
            }
            hidden = !hidden;
        });
    });

    const headerFilter = {
        spoe: true,
        oevp: true,
        fpoe: true,
        gruene: true,
        stronach: true,
        neos: true
    };

    function handlePartyFilterChange(id) {
        if (id === 'all') {
            forEach(headerFilter, (value, key) => (headerFilter[key] = true));

            return renderPartyFilter();
        }

        if (every(headerFilter, v => v)) {
            forEach(headerFilter, (value, key) => {
                headerFilter[key] = false;
            });
            headerFilter[id] = !headerFilter[id];

            return renderPartyFilter();
        }

        headerFilter[id] = !headerFilter[id];
        if (every(headerFilter, v => !v)) {
            forEach(headerFilter, (value, key) => {
                headerFilter[key] = true;
            });
        }

        return renderPartyFilter();
    }

    const renderPartyFilter = () => {
        ReactDOM.render(
            React.createElement(PartyFilter, {
                filter: headerFilter,
                onFilterChange: handlePartyFilterChange
            }),
            document.getElementById('header')
        );
    };

    // renderPartyFilter();

    $('.burger-menu, .topic-menu__title').click(function() {
        $('.burger-menu').toggleClass('open');
        $('.topic-menu').toggleClass('is-active');
    });
});
