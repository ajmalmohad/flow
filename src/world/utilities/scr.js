import { Scene, PerspectiveCamera, WebGLRenderer } from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";

let camera, scene, renderer;

function scrinit(controls) {
    camera = new PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 10);
    camera.position.z = 5;
    scene = new Scene();
    renderer = new WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    if(controls === "controls"){
        const controls = new OrbitControls( camera, renderer.domElement );
    }
}

function resize(){
	camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}

export { camera, scene, renderer, scrinit , resize };