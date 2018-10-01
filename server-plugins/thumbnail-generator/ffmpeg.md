Generating a thumbnail from a video every 1 sec with size

ffmpeg -i sample.mp4 -vf "fps=1, scale=200:120" out%d.png