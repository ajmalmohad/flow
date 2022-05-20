import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import Model from './../models/HCR_Race_Car.glb'
import { Scene, PerspectiveCamera, WebGLRenderer, Color } from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";

let camera, scene, renderer;
let mesh, animationScripts = [], scrollPercent = 0, loaded=false;

camera = new PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.001, 1000);
camera.position.set(0, 1, 2)
scene = new Scene();
scene.background = new Color('black')
renderer = new WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
const controls = new OrbitControls( camera, renderer.domElement );


const loader = new GLTFLoader();

loader.load(
	Model,

	function ( gltf ) {
		scene.add( gltf.scene );
		mesh = gltf.scene;
		console.log(mesh);
		loaded = true
	},

	function ( xhr ) {
		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
	},

	function ( error ) {
		console.log( 'An error happened' );
	}
);


window.scrollTo({ top: 0, behavior: 'smooth' })

animationScripts.push({
	start: 0,
	end: 40,
	func: () => {
		camera.lookAt(mesh.position)
		mesh.position.z = lerp(-10, -5, scalePercent(0, 40))
	},
})

animationScripts.push({
	start: 40,
	end: 101,
	func: () => {
		camera.lookAt(mesh.position)
		mesh.rotation.y = lerp(0, Math.PI, scalePercent(40, 60))
	},
})

function animate() {
	requestAnimationFrame(animate);
	if(loaded) playScrollAnimations()
	renderer.render(scene, camera);
}

animate();

//Event Listeners
window.addEventListener('resize', resize);

document.addEventListener('scroll',()=>{
	scrollPercent =
		((document.documentElement.scrollTop || document.body.scrollTop) /
			((document.documentElement.scrollHeight ||
				document.body.scrollHeight) -
				document.documentElement.clientHeight)) *
		100;
})

function resize(){
	camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}

//Utility Functions
function lerp(x, y, a) {
	return (1 - a) * x + a * y
}

function scalePercent(start, end) {
	return (scrollPercent - start) / (end - start)
}

function playScrollAnimations() {
	animationScripts.forEach((a) => {
		if (scrollPercent >= a.start && scrollPercent < a.end) {
			a.func()
		}
	})
}

const light = new THREE.AmbientLight( 0xFFFFFF ); // soft white light
scene.add( light );