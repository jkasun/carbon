const { Theme } = require('./theme');
const appEvent = require('../controller/app-events');
const ThumbnailBar = require('./thumbnail-bar');

/**
 * @param {HTMLElement} videoOverlay 
 * @param {HTMLElement} video 
 * @param {String} options Slider Options
 * @param {Boolean} options.thumbnail.enabled 
 * @param {Function} options.thumbnail.getImageByDuration
 */
let Slider = function (videoOverlay, video, options) {
    let z = 1;

    const canvas = document.createElement('canvas');
    canvas.className = "play-slider"

    videoOverlay.appendChild(canvas);

    let height = 25 * z;
    let width = canvas.parentElement.offsetWidth;

    canvas.height = height;
    canvas.width = width;

    let frameRate = 24;
    let frameTime = Math.round(1000 / frameRate);

    canvas.onclick = function (evt) {
        let rect = canvas.getBoundingClientRect();

        let clickPos = {
            x: evt.clientX - rect.left,
            y: evt.clientY - rect.top
        };

        let ratio = clickPos.x / width;
        let seekTime = video.getVideoDuration() * ratio;

        video.setCurrentTime(seekTime);
    }

    let startAnimation = () => {
        const c = canvas.getContext('2d');

        let draw = () => {
            c.clearRect(0, 0, width, height);
            drawSlider(c);

            setTimeout(() => {
                c.restore();
                window.requestAnimationFrame(draw);
            }, frameTime);
        };

        window.requestAnimationFrame(draw);
    }

    let drawSlider = (c) => {
        let status = width * video.getVideoCurrentTime() / video.getVideoDuration();

        c.fillStyle = Theme.SliderBackground;
        c.lineWidth = 1;
        c.beginPath();
        c.rect(0, 0, width, height * z);
        c.fill();
        c.closePath();

        c.fillStyle = Theme.SliderColor;
        c.beginPath();
        c.rect(0, 0, status, height * z);
        c.fill();
        c.closePath();
    }

    let resetHeight = () => {
        width = canvas.parentElement.offsetWidth;
        canvas.width = width;
    }

    if (options && options.thumbnail && options.thumbnail.enabled) {
        let thumbnailBar = ThumbnailBar(videoOverlay, video, options.thumbnail.getImageByDuration);
        let mouseFreezeEvent = null;

        canvas.onmouseover = function () {
            canvas.onmousemove = function (evt) {
                clearInterval(mouseFreezeEvent);
                let rect = canvas.getBoundingClientRect();

                let clickPos = {
                    x: evt.clientX - rect.left,
                    y: evt.clientY - rect.top
                };

                mouseFreezeEvent = setTimeout(() => {
                    let id = clickPos.x / width * video.getVideoDuration();
                    thumbnailBar.displayThumbnail(Math.round(id));
                }, 50);
            }
        }

        canvas.onmouseleave = function () {
            clearInterval(mouseFreezeEvent);
            mouseFreezeEvent = null;
            thumbnailBar.hide();
        }
    }

    appEvent.onWindowResize(resetHeight);

    appEvent.onFullScreenOpen(resetHeight);

    appEvent.onFullScreenExit(resetHeight);

    return {
        startAnimation
    }
};

module.exports = Slider;