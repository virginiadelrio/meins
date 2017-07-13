var controller = new ScrollMagic.Controller();

$(document).ready(function() {
    var $usaVsChina = $('.usa-vs-china');
    var $score = $('.score');
    var $round = $('.usa-vs-china__round');
    
    [
        {
            trigger: '#runde-2',
            text: '1:0',
            title: 'Runde 1'
        },
        {
            trigger: '#runde-3-wachstum',
            text: '2:0',
            title: 'Runde 2'
        },
        {
            trigger: '#runde-4-bildung',
            text: '2:1',
            title: 'Runde 3'
        },
        {
            trigger: '#runde-5-soft-power',
            text: '3:1',
            title: 'Runde 4'
        },
        {
            trigger: '#and-the-winner-is',
            text: '4:1',
            title: 'Endstand'
        },
    ].forEach(function(spec) {
        var scene = new ScrollMagic.Scene({
            triggerElement: spec.trigger,
            triggerHook: 'onEnter',
            duration: 400,
            offset: -50
        });

        scene.addTo(controller);

        scene.on('enter', function() {
            $score.text(spec.text);
            $round.text(spec.title);
            $usaVsChina.addClass('show');
        });

        scene.on('leave', function() {
            $score.text(spec.text);
            $round.text(spec.title);
            $usaVsChina.removeClass('show');
        });
    });


});
