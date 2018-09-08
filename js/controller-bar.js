let controlBar = function () {
    let z = 1;

    const canvas = document.createElement('canvas');
    canvas.className = "controller-bar"

    document.getElementById('video-overlay').appendChild(canvas);

    let height = 30 * z;
    let width = $(canvas.parentElement).width();

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
            player.openFullscreen();
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

            c.stroke();
            c.closePath();
        }

        let isInside = function ({ x, y }) {
            let verticallyInside = x > width - 18 - rightPad - lineWidth && x < width - rightPad + lineWidth;
            let horizontallyInsize = y > topPad - lineWidth && y < 18 + lineWidth;

            return verticallyInside && horizontallyInsize;
        }

        return {
            draw,
            isInside
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
    }

    return {
        startAnimation
    }
}();