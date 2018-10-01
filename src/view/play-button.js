var {Theme} = require('./theme');

let playButton = function (videoOverlay, video) {
    let z = 1; // zoomLevel

    const canvas = document.createElement('canvas');
    canvas.className = "cnv-play-btn";

    let height = 92 * z;
    let width = 92 * z;

    canvas.height = height;
    canvas.width = width;

    videoOverlay.appendChild(canvas);

    let frameRate = 24;
    let frameTime = Math.round(1000 / frameRate);

    let startAnimation = () => {
        // Initial Setup
        const c = canvas.getContext('2d');

        let draw = () => {

            c.clearRect(0, 0, width, height);
            drawPlayButton(c);

            setTimeout(() => {
                c.restore();
                window.requestAnimationFrame(draw);
            }, frameTime);
        }

        window.requestAnimationFrame(draw);
    }

    let drawPlayButton = (c) => {
        let iX = height / 2;
        let iY = width / 2;

        var lastRad = Math.PI * 2 * video.getVideoCurrentTime() / video.getVideoDuration();

        // Outer line
        c.beginPath();
        c.strokeStyle = Theme.PrimaryColor;
        c.lineWidth = 1;
        c.arc(iX, iY, 44 * z, 0, 2 * Math.PI);
        c.stroke();

        // Timer Status
        c.beginPath();
        c.strokeStyle = Theme.PrimaryColor;
        c.lineWidth = 5 * z;
        c.arc(iX, iY, 41 * z, 0, lastRad);
        c.stroke();

        // Play, Pause Symbols
        if (video.isVideoPlaying()) {
            c.beginPath();
            c.rect(iX - 15 * z, iY - 15 * z, 10 * z, 30 * z);
            c.stroke();

            c.rect(iX + (15 - 10) * z, iY - 15 * z, 10 * z, 30 * z);
            c.stroke();
            c.closePath();
        } else {
            c.beginPath();
            c.moveTo(iX - 10 * z, iY - 20 * z);
            c.lineTo(iX - 10 * z, iY + 20 * z);
            c.lineTo(iX + 20 * z, iY);
            c.closePath();
        }

        c.fillStyle = Theme.PrimaryColor;
        c.fill();
    }

    let show = () => {
        canvas.style.display = 'block';
    }

    let hide = () => {
        canvas.style.display = 'none';
    }

    canvas.onclick = function () {
        if (video.isVideoPlaying()) {
            video.pauseVideo();
        } else {
            video.playVideo();
        }
    }

    return {
        startAnimation,
        show,
        hide
    }
};

module.exports = playButton;