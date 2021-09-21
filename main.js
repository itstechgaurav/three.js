import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as dat from 'dat.gui';
import gsap from 'gsap';

const canvas = document.getElementById("webgl");
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
}

const cubeColor = 0x00ff00;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(70, sizes.width / sizes.height, 0.1, 2000);

const geometry = new THREE.BoxBufferGeometry(1, 1, 1, 20, 20, 20);
const meterial = new THREE.MeshBasicMaterial({
  color: cubeColor,
  wireframe: true,
});

const cube = new THREE.Mesh(geometry, meterial);
scene.add(cube);
const control = new OrbitControls(camera, canvas);
control.enableDamping = true;

camera.position.z = 2;


const renderer = new THREE.WebGLRenderer({
  canvas,
});

renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const render = () => {
  control.update();
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}
render();

// resize event
window.addEventListener('resize', () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  renderer.setSize(sizes.width, sizes.height);
})

// debug ui

const dUI = new dat.GUI();
const cubeFolder = dUI.addFolder('Cube');

// cube color
cubeFolder.addColor({
  color: cubeColor
}, 'color').onChange(val => {
  meterial.color = new THREE.Color(val);
});

// cube wireframe 
cubeFolder.add(meterial, 'wireframe').name("Show wireframe");

// cube show/hide
cubeFolder.add(cube, 'visible').name("Show Cube")

// spin cube
cubeFolder.add({
  spin() {
    // enable gsap to spin the cube
    gsap.to(cube.rotation, {
      y: Math.PI + cube.rotation.y,
      duration: 2,
    })
  }
}, 'spin').name("Sping the Cube");

const cubePosition = cubeFolder.addFolder('Cube Position');
cubePosition.add(cube.position, 'x', -1, 1, .001);
cubePosition.add(cube.position, 'y', -1, 1, .001);
cubePosition.add(cube.position, 'z', -1, 1, .001);