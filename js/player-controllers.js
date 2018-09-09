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

    // videoMain.addEventListener('progress', function () {
    //     var range = 0;
    //     var bf = this.buffered;
    //     var time = this.currentTime;

    //     while (!(bf.start(range) <= time && time <= bf.end(range))) {
    //         range += 1;
    //     }
    // });

    let videoWrapper = document.getElementById('video-wrapper');

    let openFullscreen = () => {

        if (!document.webkitIsFullScreen) {
            lastHeight = videoWrapper.style.height;
            lastWidth = videoWrapper.style.width;
        }

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

    appEvent.onFullScreenExit(() => {
        videoWrapper.style.height = lastHeight;
        videoWrapper.style.width = lastWidth;
    })

    appEvent.onFullScreenOpen(() => {
        let height = $(window).height();
        let width = $(window).width();

        $(videoWrapper).height(height);
        $(videoWrapper).width(width);
    })

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