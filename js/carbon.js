/**
 * 
 * @param {String} elementId 
 * @param {Object} options
 * @param {String} options.videoUrl 
 * @param {Number} options.height
 * @param {Number} options.width
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
    let video = document.createElement('video');
    video.className = 'video';
    video.id = 'video-main';

    // Controller Overlay
    let videoOverlay = document.createElement('div');
    videoOverlay.className = 'video-overlay';
    videoOverlay.id = 'video-overlay';

    video.src = options.videoUrl;

    // Appending View
    videoWrapper.appendChild(video);
    videoWrapper.appendChild(videoOverlay);

    element.appendChild(videoWrapper);
};