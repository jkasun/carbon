let aspectRatio = null;

$(() => {
    let hideEvent = null;

    $('#video-main').bind('loadedmetadata', function () {
        playButton.startAnimation();
        playSlider.startAnimation();
        controlBar.startAnimation();
    });

    $('.video-overlay').mouseover(function () {
        clearTimeout(hideEvent);
        playButton.show();
    });

    $('.video-overlay').mouseleave(function () {
        clearTimeout(hideEvent);

        hideEvent = setTimeout(function () {
            playButton.hide();
        }, 5000)
    });
});