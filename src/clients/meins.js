/* global MeinsContext, oewa, OEWA */

const $ = require('jquery');
const FastClick = require('fastclick');

const ScrollManager = require('./ScrollManager');

const mountVideo = require('./shared/mount-video');

window.$ = $;

require('slick-carousel');

function countPageImpression() {
    try {
        oewa.c({}, OEWA, 2);
    } catch (e) {}
}

// polyfill history
if (!('history' in window)) {
    window.history = {
        back() {},
        pushState() {},
        replaceState() {}
    };
}

$(() => {
    const $window = $(window);
    const $body = $('body');

    FastClick.attach(document.body);

    mountVideo({
        posterFallback: 'http://placehold.it/1280x720',
        titleFallback: 'Video abspielen',
        creatorFallback: '[M]eins'
    });

    // TODO
    // - clean code
    // - get out of fullscreen with ESC
    $('.slideshow').each(function() {
        const $slideshow = $(this);
        const $slides = $slideshow.find('.slideshow__slides');

        function refreshSlideshow() {
            setImmediate(() => {
                // only way i know to refresh
                $slides.slick('slickSetOption', 'dots', true, true);
            });
        }

        function enterFullscreen() {
            refreshSlideshow();

            $slideshow.addClass('slideshow--fullscreen');
            $slideshow.removeClass('rmt3');
            $body.addClass('u-overflow-hidden');
        }

        function exitFullscreen() {
            refreshSlideshow();

            $slideshow.removeClass('slideshow--fullscreen');
            $slideshow.addClass('rmt3');
            $body.removeClass('u-overflow-hidden');
        }

        $slides.slick({
            dots: true,
            infinite: true,
            adaptiveHeight: true,
            lazyLoad: 'progressive',
            prevArrow: $slideshow.find('.slideshow__go-left'),
            nextArrow: $slideshow.find('.slideshow__go-right')
        });

        $slides.on('afterChange', countPageImpression);

        $slideshow.find('.slideshow__fullscreen').click(() => {
            enterFullscreen();
            window.history.pushState({}, '', `#${Date.now()}`);
            $window.one('popstate', exitFullscreen);
        });

        $slideshow.find('.slideshow__close').click(() => {
            exitFullscreen();
            $window.off('popstate', exitFullscreen);
            window.history.back();
        });
    });

    $('.library--footer .library__items').slick({
        dots: false,
        infinite: true,
        slidesToShow: 3,
        prevArrow: $('.library--footer .library__arrow--left'),
        nextArrow: $('.library--footer .library__arrow--right'),
        responsive: [
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    initialSlide: MeinsContext.latestRelease ===
                        MeinsContext.release
                        ? 1
                        : 0,
                    centerMode: true,
                    prevArrow: null,
                    nextArrow: null
                }
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    initialSlide: 0,
                    centerMode: true,
                    prevArrow: null,
                    nextArrow: null
                }
            }
        ]
    });

    $('.library-button').click(e => {
        if ($('.title').hasClass('title--is-library-open')) {
            e.preventDefault();
        }

        $('.title').toggleClass('title--is-library-open');
    });

    const scrollManager = new ScrollManager();

    let taglineTimer = null;
    const $tagline = $('.header__tagline');
    const replaceTagline = (next = '', text = '') => {
        clearTimeout(taglineTimer);

        $tagline.text(text);

        if (next === '') {
            return;
        }

        taglineTimer = setTimeout(
            () => replaceTagline(next.slice(1), text + next.slice(0, 1)),
            16
        );
    };

    scrollManager.register(
        { $lt: 150 },
        {
            on() {
                $('.library-button, .title__arrow').css('opacity', 1);
                $('.tv-hint').css('display', 'block');
                replaceTagline('EINE WOCHE. EIN THEMA.');
            },
            off() {
                $('.library-button, .title__arrow').css('opacity', 0);
                $('.tv-hint').css('display', 'none');
                $('.title').removeClass('title--is-library-open');
                replaceTagline($tagline.data('tagline'));
            }
        }
    );

    scrollManager.register(
        { bottom: 5 },
        {
            on() {
                $('.orf-logo').addClass('orf-logo--at-bottom');
            },
            off() {
                $('.orf-logo').removeClass('orf-logo--at-bottom');
            }
        }
    );

    $window.scroll(() => {
        // progress
        const scrollTop = $window.scrollTop();
        const progress =
            scrollTop / ($(document).height() - $window.height()) * 100;
        $('.header__progress').css('width', `${progress}%`);
    });

    $('.title__arrow').click(function(e) {
        e.preventDefault();

        countPageImpression();

        const emSize = parseInt($('body').css('font-size'), 10);

        $('body,html').animate(
            {
                scrollTop: $('.content-container').offset().top - 4 * emSize
            },
            600
        );
    });

    $('.animate-scroll').click(function(e) {
        e.preventDefault();

        countPageImpression();

        const id = $(this).attr('href');
        const $el = $(id);

        if ($el.length === 0) {
            return;
        }

        const emSize = parseInt($('body').css('font-size'), 10);

        $('body,html').animate(
            {
                scrollTop: $el.offset().top - 3 * emSize
            },
            600
        );
    });
});

window.ChartSlideshow = require('./ChartSlideshow');
