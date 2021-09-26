import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as dat from 'dat.gui';
import { Mesh } from 'three';

class Scene {
  constructor(selector) {
    this.canvas = document.querySelector(selector);
    this.sizes = {
      width: window.innerWidth,
      height: window.innerHeight,
    }

    this.init();
    this.createObjects(); // start creating objects
    this.render(); // start rendering
    this.onResize(); // on resize handle
    this.debugMenu(); // settup debug menu
  }

  init() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(70, this.sizes.width / this.sizes.height, 0.1, 2000);
    this.camera.position.z = 2.5;

    // adding orbit control
    this.control = new OrbitControls(this.camera, this.canvas);
    this.control.enableDamping = true;

    // setting up renderer
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
    });
    this.renderer.setSize(this.sizes.width, this.sizes.height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  }

  render() {
    this.animate();
    this.control.update();
    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(this.render.bind(this));
  }

  onResize() {
    window.addEventListener('resize', () => {
      this.sizes.width = window.innerWidth;
      this.sizes.height = window.innerHeight;
      this.canvas.width = this.sizes.width;
      this.canvas.height = this.sizes.height;

      this.camera.aspect = this.sizes.width / this.sizes.height;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(this.sizes.width, this.sizes.height);
    })
  }

  debugMenu() {
    this.dUI = new dat.GUI(); // initialize the debuging menu
  }

  animate() {

  }

  createFloor() {
    const geometry = new THREE.PlaneGeometry(2.5, 3);
    const material = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      side: THREE.DoubleSide
    });
    this.floor = new THREE.Mesh(geometry, material);
    this.floor.rotation.x = 2;
    this.scene.add(this.floor);
  }

  createObjects() {
    // just create a floor
    this.createFloor(); // initial floor
  }
}

new Scene("#webgl");