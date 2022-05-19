import * as THREE from 'three';

//Utilities
import {camera, scene, renderer, scrinit, resize} from './utilities/scr';

let geometry, material, mesh;

init();
animate();

function init() {

	//Init Scene Camera Renderer with orbit controls.
	scrinit("controls");
	
	geometry = new THREE.PlaneGeometry( 3, 3);
	material = new THREE.MeshNormalMaterial({side:THREE.DoubleSide});
	mesh = new THREE.Mesh( geometry, material );
	scene.add( mesh );

}

function animate() {

	requestAnimationFrame( animate );
	renderer.render( scene, camera );

}

//Event Listeners
window.addEventListener('resize',resize);
