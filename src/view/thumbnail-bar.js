const appEvent = require('../controller/app-events');

let ThumbnailBar = function (videoOverlay, video, getImageByDuration) {
    let z = 1;

    const canvas = document.createElement('canvas');
    canvas.className = "thumbnail-bar"
    canvas.style.display = 'none';

    videoOverlay.appendChild(canvas);

    let height = 86 * z;
    let width = canvas.parentElement.offsetWidth;

    canvas.height = height;
    canvas.width = width;

    let displayThumbnail = (videoDuration) => {
        var img = new Image(200, 86);
        img.src = getImageByDuration(videoDuration);

        const c = canvas.getContext('2d');

        img.onload = function () {
            let draw = () => {
                let x = width * videoDuration / video.getVideoDuration();

                if (x + 100 < 200) {
                    x = 100;
                }

                if (x + 100 > width) {
                    x = width - 100;
                }

                c.clearRect(0, 0, width, height);
                c.drawImage(img, x - 100, 0);
            };

            window.requestAnimationFrame(draw);
        }

        canvas.style.display = 'block';
    }

    let hide = () => {
        canvas.style.display = 'none';
    }

    let resetHeight = () => {
        width = canvas.parentElement.offsetWidth;
        canvas.width = width;
    }

    appEvent.onWindowResize(resetHeight);

    appEvent.onFullScreenOpen(resetHeight);

    appEvent.onFullScreenExit(resetHeight);

    return {
        displayThumbnail,
        hide
    }
};

module.exports = ThumbnailBar;