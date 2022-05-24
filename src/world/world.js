import * as THREE from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import Model from './models/Walking.fbx'
import { Scene, PerspectiveCamera, WebGLRenderer, Color } from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { GlitchPass } from 'three/examples/jsm/postprocessing/GlitchPass';
import { FilmPass } from 'three/examples/jsm/postprocessing/FilmPass';

let camera, scene, renderer;
let mesh, mixer, walk, scrollY=0;

camera = new PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.001, 1000);
camera.position.set(0, 1, 2)
scene = new Scene();
scene.background = new Color('#00ced1')
renderer = new WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
const composer = new EffectComposer( renderer );
document.body.appendChild(renderer.domElement);
const controls = new OrbitControls( camera, renderer.domElement );

const renderPass = new RenderPass( scene, camera );
composer.addPass( renderPass );

const glitchPass = new GlitchPass();
composer.addPass( glitchPass );

const filmPass = new FilmPass(
    0.35,
    0.025,
    5000, 
    false,
);
filmPass.renderToScreen = true;
composer.addPass(filmPass);


const manager = new THREE.LoadingManager();
manager.onLoad = function ( ) {
	console.log( 'Loading complete!');
	document.getElementsByClassName("loader")[0].style.display = "none";
	controls.update();
};

manager.onProgress = function ( url, itemsLoaded, itemsTotal ) {
	document.getElementsByClassName('loader')[0].innerHTML = `<p>${((itemsLoaded/itemsTotal) *100).toFixed(0)}% Loaded</p>`
};

manager.onError = function ( url ) {
	console.log( 'There was an error loading ' + url );
};

const loader = new FBXLoader(manager);

loader.load(
	Model,
	function ( model ) {
		mesh = model;
		mixer = new THREE.AnimationMixer(mesh);
		walk = mixer.clipAction(mesh.animations[0]);
		walk.play()
		mesh.scale.set(0.01,0.01,0.01)
		mesh.position.set(0,-1,0)
		scene.add( mesh );
	}
);

const clock = new THREE.Clock()
function animate() {
	requestAnimationFrame(animate);
	if(mixer) mixer.update(clock.getDelta());
	if(mesh){
		mesh.rotation.y = (scrollY/50)*Math.PI;
		mesh.position.z = (100 - scrollY*1.5)/80;
	}
	renderer.render(scene, camera);
	composer.render()
}

animate();

//Event Listeners
window.addEventListener('resize', resize);

function resize(){
	camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}

const light = new THREE.AmbientLight( 0xFFFFFF ); // soft white light
scene.add( light );

window.addEventListener('scroll',()=>{
	scrollY = currentScrollPercentage();
	console.log(scrollY);
})

function currentScrollPercentage()
{
    return ((document.documentElement.scrollTop + document.body.scrollTop) / (document.documentElement.scrollHeight - document.documentElement.clientHeight) * 100);
}