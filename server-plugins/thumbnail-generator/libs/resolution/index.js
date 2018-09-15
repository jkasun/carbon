module.exports = function () {
    const { spawn } = require('child_process');
    let ffprobe = 'ffprobe';

    let getVideoResolution = (path) => {
        const ffprobeProcess = spawn(ffprobe, `-v error -select_streams v:0 -show_entries stream=width,height -of csv=s=x:p=0 ${path}`.split(' '));
        let output = '';
        let errOut = '';

        return new Promise((res, rej) => {
            ffprobeProcess.stdout.on('data', (data) => {
                output += data;
            });

            ffprobeProcess.stderr.on('data', (data) => {
                errOut += data;
            });

            ffprobeProcess.on('close', (code) => {
                if (errOut !== '') {
                    rej(errOut);
                }
                
                let resolutionArr = output.replace('\r\n', '').split('x');

                res({
                    width: parseInt(resolutionArr[0]),
                    height: parseInt(resolutionArr[1])
                });
            });
        });
    }

    let setFFProbePath = (path) => {
        ffprobe = path;
    }

    return {
        getVideoResolution,
        setFFProbePath
    }
}();