import './styles/main.scss';
import './world/world';
import Music from './music/Music.mp3'

let playing = false;
var audio = new Audio(Music);

function play() {
    if(!playing){
        audio.play();
        playing = true;
    }else{
        audio.currentTime = 0;
        audio.pause();
        playing = false;
    }
}

document.getElementById("music").addEventListener('click',()=>{
    if(!playing){
        document.getElementById("music").innerHTML = "<button>Music On</button>";
    }else{
        document.getElementById("music").innerHTML = "<button>Music Off</button>";
    }
    play();
})