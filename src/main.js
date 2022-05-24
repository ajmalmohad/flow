import './world/world';
import Music from './music/Music.mp3'

let playing = false;
var audio = new Audio(Music);
audio.loop = true;

function play() {
    if (!playing) {
        audio.play();
        playing = true;
    } else {
        audio.currentTime = 0;
        audio.pause();
        playing = false;
    }
}

document.getElementById("music").addEventListener('click', () => {
    if (!playing) {
        document.getElementById("music").innerHTML = "<button>Music On</button>";
    } else {
        document.getElementById("music").innerHTML = "<button>Music Off</button>";
    }
    play();
})

audio.addEventListener('ended', function () {
    audio.currentTime = 0;
    audio.play();
    playing = true;
}, false);