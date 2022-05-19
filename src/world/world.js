import * as THREE from 'three';
import {camera, scene, renderer, scrinit, resize} from './utilities/scr';

let geometry, material, mesh, animationScripts = [], scrollPercent = 0;

init();
window.scrollTo({ top: 0, behavior: 'smooth' })
animate();

document.body.onscroll = () => {
    scrollPercent =
        ((document.documentElement.scrollTop || document.body.scrollTop) /
            ((document.documentElement.scrollHeight ||
                document.body.scrollHeight) -
                document.documentElement.clientHeight)) *
    100;
}


animationScripts.push({
	start: 0,
    end: 101,
    func: () => {
        let g = material.color.g
        g -= 0.05
        if (g <= 0) {
            g = 1.0
        }
        material.color.g = g
    },
})

animationScripts.push({
    start: 0,
    end: 40,
    func: () => {
        camera.lookAt(mesh.position)
        camera.position.set(0, 1, 2)
        mesh.position.z = lerp(-10, 0, scalePercent(0, 40))
    },
})

function init() {
	scrinit("controls");
	
	geometry = new THREE.PlaneGeometry( 3, 3);
	material = new THREE.MeshBasicMaterial({
		color: 0x00ff00,
		wireframe: true,
	})
	mesh = new THREE.Mesh( geometry, material );
	scene.add( mesh );
}

function animate() {

	requestAnimationFrame( animate );
	playScrollAnimations()
	renderer.render( scene, camera );

}

//Event Listeners
window.addEventListener('resize',resize);


//Utility Functions
function lerp(x, y, a){ 
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