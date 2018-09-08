const player = function () {
    const videoMain = document.getElementById('video-main');

    let playVideo = () => {
        videoMain.play();
    }

    let isVideoPlaying = () => {
        return !videoMain.paused;
    }

    let pauseVideo = () => {
        videoMain.pause();
    }

    let getVideoDuration = () => {
        return videoMain.duration;
    }

    let getVideoCurrentTime = () => {
        return videoMain.currentTime;
    }

    let setCurrentTime = (time) => {
        videoMain.currentTime = time;
    }

    videoMain.addEventListener('progress', function () {
        var range = 0;
        var bf = this.buffered;
        var time = this.currentTime;

        while (!(bf.start(range) <= time && time <= bf.end(range))) {
            range += 1;
        }
    });

    let videoWrapper = document.getElementById('video-wrapper');

    let openFullscreen = () => {
        if (videoWrapper.requestFullscreen) {
            videoWrapper.requestFullscreen();
        } else if (videoWrapper.mozRequestFullScreen) { /* Firefox */
            videoWrapper.mozRequestFullScreen();
        } else if (videoWrapper.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
            videoWrapper.webkitRequestFullscreen();
        } else if (videoWrapper.msRequestFullscreen) { /* IE/Edge */
            videoWrapper.msRequestFullscreen();
        }
    }

    let lastHeight;
    let lastWidth;

    document.onwebkitfullscreenchange = function () {
        if (document.webkitIsFullScreen) {
            lastHeight = $(videoWrapper).height();
            lastWidth = $(videoWrapper).width();

            videoWrapper.style.height = '100%';
            videoWrapper.style.width = '100%';
        } else {
            $(videoWrapper).height(lastHeight);
            $(videoWrapper).width(lastWidth);
        }

        width = $(canvas.parentElement).width();
        canvas.width = width;
    }

    window.onresize = function () {
        width = $(canvas.parentElement).width();
        canvas.width = width;
    }

    return {
        playVideo,
        isVideoPlaying,
        pauseVideo,
        getVideoCurrentTime,
        getVideoDuration,
        setCurrentTime,
        openFullscreen
    }
}();