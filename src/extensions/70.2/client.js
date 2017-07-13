/* global $, oewa, OEWA */

function toTimeString(t) {
    let minutes = Math.floor(t / 60);
    let seconds = t - (minutes * 60);

    if (minutes < 10) {minutes = '0' + minutes;}
    if (seconds < 10) {seconds = '0' + seconds;}
    return minutes + ':' + seconds;
}

const videoSD = 'http://cdn.einser.info/videos/mono/topeins-sd.mp4',
      videoHD = 'http://cdn.einser.info/videos/mono/topeins-hd.mp4';

// polyfill history
if(!('history' in window)) {
    window.history = {
        back() {},
        pushState() {},
        replaceState() {}
    };
}

function countPageImpression() {
    try {
        oewa.c({}, OEWA, 2);
    } catch(e) {
        
    }
}

$(document).ready(() => {

    let mainPlayer = null,
        $mainVideo = null,
        touchJumpTo = 0,
        hd = true;
    
    const $window = $(window);
    const $body = $('body');
    const $videoContainer = $('.video');
    const $preview = $('.preview');
    const $play = $('.play');
    const $postView = $('.post-view');
    const $replay = $('.replay');
    const $controls = $('.controls');
    const $hd = $('.control.hd');
    
    const isIOS = navigator.userAgent.match(/iPhone|iPad|iPod/i) != null;

    if(isIOS) {
        $body.addClass('ios');
    }
    
    const $poster = $('<div class="poster"></div>');
    
    function installPlayer() {
        $body.addClass('fullscreen');
        
        $mainVideo = $(`<video class="main-video"><source src="${videoHD}" type="video/mp4"></video>`);

        window.history.pushState({}, '', '#fullscreen');
        $window.one('popstate', quitPlayer);
        
        mainPlayer = $mainVideo.get(0);
        if(isIOS) {
            mainPlayer.controls = true;
        } else {
            mainPlayer.controls = false;
        }
        mainPlayer.volume = 0.85;

        if(!isIOS) {
            mainPlayer.load();
        }

        $mainVideo.on('timeupdate', () => {
            if(mainPlayer == null) {
                return;
            }
            
            const progress = mainPlayer.currentTime / mainPlayer.duration;
            $('.progress--inner').width(progress*100 + '%');
            $('.inner--text').width(100/progress + '%');
            $('.time__text').text(toTimeString(Math.floor(mainPlayer.currentTime)));
        });
        
        $mainVideo.one('playing', countPageImpression);

        $mainVideo.on('play, playing', () => {
            $('.controls').addClass('hidden');
            $('.btn-pause').show();
            $('.btn-play').hide();
        });

        $mainVideo.on('pause', () => {
            $controls.removeClass('hidden');
            $('.btn-pause').hide();
            $('.btn-play').show();
        });

        $mainVideo.on('ended', () => {
            $window.off('popstate', quitPlayer);
            window.history.back();
            quitPlayer();
        });
        
        setTimeout(() => {
            $poster.hide();
            $('.bottom-curtain').addClass('post-init');
            
            if(!isIOS) {
                mainPlayer.play();
            }
            
            // TODO mousemove: show controls, queue hide
            
            $videoContainer.append($mainVideo);
        }, 1200);
    }

    function quitPlayer() {
        $poster.show();
        $body.removeClass('fullscreen');
        $body.css('overflow', 'hidden');
        $controls.addClass('hidden');

        $play.hide();
        $postView.show();
        
        mainPlayer = null;
        $mainVideo.fadeOut(200, () => $mainVideo.remove());
        
        $replay.on('click', () => {
            $replay.off('click');
            installPlayer();
        });
    }
    
    $('.video, .control.playpause').on('touchend click', e => {
        e.preventDefault();
        e.stopPropagation();
        
        if(mainPlayer == null || isIOS) {
            return;
        }

        if(mainPlayer.paused) {
            mainPlayer.play();
        } else {
            mainPlayer.pause();
        }
    });
    
    $('.control.progress').on('touchmove', e => {
        if(mainPlayer == null) {
            return;
        }

        const offsetLeft = $(e.target).offset().left;
        touchJumpTo =
            mainPlayer.duration * Math.max(0, Math.min((e.touches[0].clientX - offsetLeft)/e.target.clientWidth, 1));
        const progress = Math.min(touchJumpTo, mainPlayer.duration)/mainPlayer.duration;
        
        $('.progress--inner').width(progress*100 + '%');
        $('.inner--text').width(100/progress + '%');
        $('.time__text').text(toTimeString(Math.floor(touchJumpTo)));

        e.preventDefault();
    });
    
    $('.control.progress').mousemove(e => {
        if(mainPlayer == null) {
            return;
        }

        if(e.buttons === 1) {
            const jumpTo = mainPlayer.duration * e.offsetX/e.target.clientWidth;
            mainPlayer.currentTime = jumpTo;
        }
    });
    
    $('.control.progress').mouseup(e => {
        if(mainPlayer == null) {
            return;
        }

        const jumpTo = mainPlayer.duration * e.offsetX/e.target.clientWidth;
        mainPlayer.currentTime = jumpTo;
        
        mainPlayer.play();
    });

    $('.control.progress').on('touchend', () => {
        if(mainPlayer == null) {
            return;
        }

        mainPlayer.currentTime = touchJumpTo;
        
        mainPlayer.play();
    });

    $('.control.quit').click(() => {
        if(mainPlayer == null) {
            return;
        }
        
        $window.off('popstate', quitPlayer);
        window.history.back();
        quitPlayer();
    });

    $('.control.volume').click(() => {
        if(mainPlayer == null) {
            return;
        }
        
        if(mainPlayer.volume === 0) {
            $('.volume-on').show();
            $('.volume-off').hide();
            mainPlayer.volume = 0.85;
        } else {
            $('.volume-on').hide();
            $('.volume-off').show();
            mainPlayer.volume = 0;
        }
    });

    $('.control.hd').click(() => {
        if(mainPlayer == null) {
            return;
        }

        const $source = $mainVideo.find('source');
        
        const currentTime = mainPlayer.currentTime;
        
        if(hd) {
            hd = false;
            $hd.addClass('off');
            $source.attr('src', videoSD);
        } else {
            hd = true;
            $hd.removeClass('off');
            $source.attr('src', videoHD);
        }
        
        mainPlayer.load();
        mainPlayer.play();
        mainPlayer.currentTime = currentTime;
    });

    function setupPreview() {
        $preview.prepend($poster);
        $preview.removeClass('hidden');
        
        $play.on('click', () => {
            $play.off('click');
            installPlayer();
        });
    }
    
    if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        setupPreview();
    } else {
        const $introVideo = $('<video autoplay><source src="http://cdn.einser.info/videos/mono/topeins-preview.mp4" type="video/mp4"></video>');
        
        const introPlayer = $introVideo.get(0);
        introPlayer.controls = false;

        const finishIntro = () => {
            $introVideo.fadeOut(400, () => {
                setupPreview();

                $introVideo.remove();
            });
        };
        
        // FIXME debug
        $introVideo.on('ended', finishIntro);
        // finishIntro();
        
        $videoContainer.append($introVideo);
    }

    
});
