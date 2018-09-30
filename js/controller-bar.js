let controlBar = function () {
    let z = 1;

    const canvas = document.createElement('canvas');
    canvas.className = "controller-bar"

    document.getElementById('video-overlay').appendChild(canvas);

    let height = 30 * z;
    let width = canvas.parentElement.offsetWidth;

    canvas.height = height;
    canvas.width = width;

    let frameRate = 10;
    let frameTime = Math.round(1000 / frameRate);

    canvas.onclick = function (evt) {
        let rect = canvas.getBoundingClientRect();

        let clickPos = {
            x: evt.clientX - rect.left,
            y: evt.clientY - rect.top
        };

        if (fullScreenButton.isInside(clickPos)) {
            if (document.webkitIsFullScreen) {
                player.exitFullScreen();
            } else {
                player.openFullscreen();
            }
        }

        if (volumeBar.isInside(clickPos)) {
            volumeBar.onClick(clickPos);
        }
    }

    let startAnimation = () => {
        const c = canvas.getContext('2d');

        let draw = () => {
            c.clearRect(0, 0, width, height);
            drawControllerBar(c);

            setTimeout(() => {
                c.restore();
                window.requestAnimationFrame(draw);
            }, frameTime);
        };

        window.requestAnimationFrame(draw);
    }

    let fullScreenButton = function () {
        let rightPad = 10;
        let topPad = 6;
        let lineWidth = 2 * z;

        let draw = function (c) {
            // Full Screen Button
            c.strokeStyle = '#ffffff';
            c.beginPath();
            c.lineWidth = lineWidth;

            if (player.isFullScreen()) {
                c.moveTo(width - 18 - rightPad, 6 + topPad);
                c.lineTo(width - 12 - rightPad, 6 + topPad);
                c.lineTo(width - 12 - rightPad, 0 + topPad);

                c.moveTo(width - 0 - rightPad, 6 + topPad);
                c.lineTo(width - 6 - rightPad, 6 + topPad);
                c.lineTo(width - 6 - rightPad, 0 + topPad);

                c.moveTo(width - 18 - rightPad, 10 + topPad);
                c.lineTo(width - 12 - rightPad, 10 + topPad);
                c.lineTo(width - 12 - rightPad, 16 + topPad);

                c.moveTo(width - 6 - rightPad, 16 + topPad);
                c.lineTo(width - 6 - rightPad, 10 + topPad);
                c.lineTo(width - 0 - rightPad, 10 + topPad);
            } else {
                c.moveTo(width - 18 - rightPad, 8 + topPad);
                c.lineTo(width - 18 - rightPad, 0 + topPad);
                c.lineTo(width - 10 - rightPad, 0 + topPad);

                c.moveTo(width - 0 - rightPad, 8 + topPad);
                c.lineTo(width - 0 - rightPad, 0 + topPad);
                c.lineTo(width - 8 - rightPad, 0 + topPad);

                c.moveTo(width - 18 - rightPad, 10 + topPad);
                c.lineTo(width - 18 - rightPad, 18 + topPad);
                c.lineTo(width - 10 - rightPad, 18 + topPad);

                c.moveTo(width - 8 - rightPad, 18 + topPad);
                c.lineTo(width - 0 - rightPad, 18 + topPad);
                c.lineTo(width - 0 - rightPad, 10 + topPad);
            }

            c.stroke();
            c.closePath();
        }

        let isInside = function ({ x, y }) {
            let horizontallyInsize = x > width - 18 - rightPad - lineWidth && x < width - rightPad + lineWidth;
            let verticallyInside = y > topPad - lineWidth && y < 18 + lineWidth;

            return verticallyInside && horizontallyInsize;
        }

        return {
            draw,
            isInside
        }
    }();

    let volumeBar = function () {
        let mute_img = new Image(22, 22);
        mute_img.src = './assets/icons/mute.png';

        let volume_img = new Image(22, 22);
        volume_img.src = './assets/icons/volume.png';

        let draw = function (c) {
            if (player.isMuted()) {
                c.drawImage(mute_img, width - 105, 7, 16, 16);
            } else {
                c.drawImage(volume_img, width - 105, 7, 16, 16);
            }

            // Background
            c.fillStyle = '#ffffff';
            c.beginPath();
            c.moveTo(width - 85, 24);
            c.lineTo(width - 40, 24);
            c.lineTo(width - 40, 6);
            c.fill();

            let volume = player.getVolume();
            let volumeWidth = 45 * volume;
            let volumeHeight = 18 - 18 * volume;

            // Background
            c.fillStyle = ColorPallete.Primary;
            c.beginPath();
            c.moveTo(width - 85, 24);
            c.lineTo(width - 85 + volumeWidth, 24);
            c.lineTo(width - 85 + volumeWidth, 6 + volumeHeight);
            c.fill();
        }

        let isInside = ({ x, y }) => {
            let horizontallyInsize = x > width - 105 && x < width - 40;
            let verticallyInside = y > 7 && y < height - 7;
            return horizontallyInsize && verticallyInside;
        }

        let onClick = ({ x, y }) => {
            if (x > width - 105 && x < width - 105 + 16) {
                if (player.isMuted()) {
                    player.unmuteVideo();
                } else {
                    player.muteVideo();
                }
            } else if (x > width - 85 && x < width - 40) {
                let volume = (x - (width - 85)) / 45;

                if (volume > 0.95) {
                    volume = 1;
                }

                player.setVolume(volume);
            }
        }

        return {
            draw,
            isInside,
            onClick
        }
    }();

    let drawControllerBar = (c) => {
        let f = (n) => n < 10 ? '0' + n : n;

        c.fillStyle = ColorPallete.ControlBarBackground;
        c.lineWidth = 1 * z;
        c.beginPath();
        c.rect(0, 0, width, height * z);
        c.fill();
        c.closePath();

        let currentTime = Math.round(player.getVideoCurrentTime());
        let s = currentTime % 60;
        let m = Math.floor(currentTime / 60);

        let mTxt = `${f(m)}`;
        let mWidth = c.measureText(mTxt).width;

        c.fillStyle = '#ffffff';
        c.beginPath();
        c.font = `${20 * z}px ${Settings.SliderFont}`;
        c.fillText(mTxt, 10, 23 * z);
        c.closePath();

        let sTxt = ` ${f(s)}`;

        c.fillStyle = '#ffffff';
        c.beginPath();
        c.font = `${16 * z}px ${Settings.SliderFont}`;
        c.fillText(sTxt, 15 + mWidth, 20 * z);
        c.closePath();

        fullScreenButton.draw(c);
        volumeBar.draw(c);
    }

    let resetHeight = () => {
        width = canvas.parentElement.offsetWidth;
        canvas.width = width;
    }

    appEvent.onWindowResize(resetHeight);

    appEvent.onFullScreenOpen(resetHeight);

    appEvent.onFullScreenExit(resetHeight);

    return {
        startAnimation
    }
}();