const VideoController = require('./controller/video');
const PlayButton = require('./view/play-button');
const Slider = require('./view/slider');
const ControllerBar = require('./view/controller-bar');

/**
 * @param {String} elementId Element id to inject the player, required
 * @param {Object} options Player Options, required
 * @param {String} options.videoUrl video preview URL, required
 * @param {String} options.poster video poster, optional
 * @param {Number} options.height initial video height in pixels, optional
 * @param {Number} options.width initial video width in pixels, optional
 * @param {Boolean} options.thumbnail.enabled is thumbnail enabled, optional
 * @param {function} options.thumbnail.getImageByDuration, required if thumbnail bar is enabled
 */
let carbon = function (elementId, options) {
    let element = document.getElementById(elementId);

    // Wrapper
    let videoWrapper = document.createElement('div');
    videoWrapper.className = 'video-wrapper';
    videoWrapper.id = 'video-wrapper';
    
    if (options.height) {
        videoWrapper.style.height = options.height + 'px';
    }

    if (options.width) {
        videoWrapper.style.width = options.width + 'px';
    }

    // Media Tag
    let videoElement = document.createElement('video');
    videoElement.className = 'video';
    videoElement.id = 'video-main';

    if (options.poster) {
        videoElement.poster = options.poster
    }

    // Controller Overlay
    let videoOverlay = document.createElement('div');
    videoOverlay.className = 'video-overlay';
    videoOverlay.id = 'video-overlay';

    videoElement.src = options.videoUrl;

    // Appending View
    videoWrapper.appendChild(videoElement);
    videoWrapper.appendChild(videoOverlay);

    element.appendChild(videoWrapper);

    // Creating the api
    let vidApi = VideoController(videoElement, videoWrapper);

    let playButton = PlayButton(videoOverlay, vidApi);
    let controllerBar = ControllerBar(videoOverlay, vidApi);

    let slider = Slider(videoOverlay, vidApi, {
        thumbnail: options.thumbnail
    });

    // Starting the animation
    videoElement.onloadedmetadata = function () {
        playButton.startAnimation();
        slider.startAnimation();
        controllerBar.startAnimation();
    }

    var hideEvent = null;

    videoOverlay.onmousemove = function () {
        if (hideEvent) {
            clearTimeout(hideEvent);
            hideEvent = null;
        }
        
        playButton.show();

        hideEvent = setTimeout(function () {
            playButton.hide();
        }, 5000)
    }
};

window.carbon = carbon;