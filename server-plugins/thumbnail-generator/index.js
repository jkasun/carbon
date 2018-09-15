const ffmpeg = require('fluent-ffmpeg');
const resolution = require('./libs/resolution');

ffmpeg.setFfmpegPath('./bin/ffmpeg.exe');
ffmpeg.setFfprobePath('./bin/ffprobe.exe');
resolution.setFFProbePath('./bin/ffprobe.exe')

const ThumbnailGenerator = require('video-thumbnail-generator').default;

let tg = new ThumbnailGenerator({
    sourcePath: 'F:\\Projects\\carbon\\dist\\sample.mp4',
    thumbnailPath: './tmp',
    tmpDir: './tmp'
});

resolution.getVideoResolution('F:\\Projects\\carbon\\dist\\sample.mp4').then(({width, height}) => {
    let aspectRatio = width/height;
    let w = 200;
    let h = Math.round(200 * (1 / aspectRatio));

    tg.generate({
        count: 300,
        size: `${w}x${h}`
    })
    .then(console.log);
});