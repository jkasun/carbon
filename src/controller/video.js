const appEvent = require('./app-events');

const player = function (mediaElement, mediaWrapper) {
    let playVideo = () => {
        mediaElement.play();
    }

    let isVideoPlaying = () => {
        return !mediaElement.paused;
    }

    let pauseVideo = () => {
        mediaElement.pause();
    }

    let getVideoDuration = () => {
        return mediaElement.duration;
    }

    let getVideoCurrentTime = () => {
        return mediaElement.currentTime;
    }

    let setCurrentTime = (time) => {
        mediaElement.currentTime = time;
    }

    let muteVideo = () => {
        mediaElement.muted = true;
    }

    let unmuteVideo = () => {
        mediaElement.muted = false;
    }

    let isMuted = () => {
        return mediaElement.muted;
    }

    let setVolume = (value) => {
        if (value > 1 || value < 0) {
            return;
        }

        mediaElement.volume  = value;
    }

    let getVolume = () => {
        return mediaElement.volume;
    }

    mediaWrapper.addEventListener("wheel", function (e) {
        let volume = getVolume();
        
        if (e.wheelDeltaY > 0) {
            setVolume(volume + 0.1);
        }

        if (e.wheelDeltaY < 0) {
            setVolume(volume - 0.1);
        }
    });

    let openFullscreen = () => {

        if (!document.webkitIsFullScreen) {
            lastHeight = mediaWrapper.style.height;
            lastWidth = mediaWrapper.style.width;
        }

        if (mediaWrapper.requestFullscreen) {
            mediaWrapper.requestFullscreen();
        } else if (mediaWrapper.mozRequestFullScreen) { /* Firefox */
            mediaWrapper.mozRequestFullScreen();
        } else if (mediaWrapper.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
            mediaWrapper.webkitRequestFullscreen();
        } else if (mediaWrapper.msRequestFullscreen) { /* IE/Edge */
            mediaWrapper.msRequestFullscreen();
        }
    };

    let exitFullScreen = () => {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    };

    let isFullScreen = () => {
        return document.webkitIsFullScreen;
    }

    let lastHeight;
    let lastWidth;

    appEvent.onFullScreenExit(() => {
        mediaWrapper.style.height = lastHeight;
        mediaWrapper.style.width = lastWidth;
    })

    appEvent.onFullScreenOpen(() => {
        let height = window.innerHeight;
        let width = window.innerWidth;

        mediaWrapper.style.height = height;
        mediaWrapper.style.width = width;
    })

    return {
        playVideo,
        isVideoPlaying,
        pauseVideo,
        getVideoCurrentTime,
        getVideoDuration,
        setCurrentTime,
        openFullscreen,
        muteVideo,
        unmuteVideo,
        isMuted,
        setVolume,
        getVolume,
        exitFullScreen,
        isFullScreen
    }
};

module.exports = player;