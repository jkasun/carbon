let playSlider = function () {
    let z = 1;

    const canvas = document.createElement('canvas');
    canvas.className = "play-slider"

    document.getElementById('video-overlay').appendChild(canvas);

    let height = 25 * z;
    let width = $(canvas.parentElement).width();

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
        let seekTime = player.getVideoDuration() * ratio;

        player.setCurrentTime(seekTime);
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
        let status = width * player.getVideoCurrentTime() / player.getVideoDuration();

        c.fillStyle = ColorPallete.SliderBackground;
        c.lineWidth = 1;
        c.beginPath();
        c.rect(0, 0, width, height * z);
        c.fill();
        c.closePath();

        c.fillStyle = ColorPallete.SliderColor;
        c.beginPath();
        c.rect(0, 0, status, height * z);
        c.fill();
        c.closePath();
    }

    let resetHeight = () => {
        width = $(canvas.parentElement).width();
        canvas.width = width;
    }

    appEvent.onWindowResize(resetHeight);

    appEvent.onFullScreenOpen(resetHeight);
    
    appEvent.onFullScreenExit(resetHeight);

    return {
        startAnimation
    }
}();