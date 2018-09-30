let aspectRatio = null;

document.addEventListener("DOMContentLoaded", function () {
    let hideEvent = null;
    let videoMain = document.getElementById('video-main');
    let videoOverlay = document.getElementById('video-overlay');

    videoMain.onloadedmetadata = function () {
        playButton.startAnimation();
        playSlider.startAnimation();
        controlBar.startAnimation();
    }

    videoOverlay.onmousemove = function () {
        clearTimeout(hideEvent);
        playButton.show();

        hideEvent = setTimeout(function () {
            playButton.hide();
        }, 5000)
    }
});