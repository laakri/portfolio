import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  TextureLoader,
  PlaneGeometry,
  Object3D,
  Vector2,
  Vector3,
  PointLight,
  Color,
} from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { AmbientLight, DirectionalLight } from 'three';
import * as TWEEN from '@tweenjs/tween.js';

@Component({
  selector: 'app-three-model',
  templateUrl: './three-model.component.html',
  styleUrls: ['./three-model.component.css'],
})
export class ThreeModelComponent implements OnInit {
  @ViewChild('rendererContainer', { static: true })
  rendererContainer!: ElementRef;

  scene!: Scene;
  camera!: PerspectiveCamera;
  renderer!: WebGLRenderer;

  mousePosition: Vector2 = new Vector2();

  thunderLight!: PointLight;

  constructor() {}

  ngOnInit() {
    this.setupScene();
    this.loadModel();
    this.setupMouseListeners();
    this.animate();
  }

  setupScene() {
    this.scene = new Scene();
    this.camera = new PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera.position.z = 5;

    this.renderer = new WebGLRenderer({ alpha: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.rendererContainer.nativeElement.appendChild(this.renderer.domElement);

    const ambientLight = new AmbientLight(0xffffff, 0.5);
    this.scene.add(ambientLight);

    const directionalLight1 = new DirectionalLight(0xffffff, 0.5);
    directionalLight1.position.set(1, 1, 1); // Top right side lighting
    this.scene.add(directionalLight1);

    const directionalLight2 = new DirectionalLight(0xffffff, 0.5);
    directionalLight2.position.set(0, 0, -1); // Light behind the object
    this.scene.add(directionalLight2);

    // Create thunder light
    this.thunderLight = new PointLight(0xffffff, 1, 5);
    this.scene.add(this.thunderLight);
  }

  loadModel() {
    const loader = new OBJLoader();
    loader.load(
      '../../../assets/Intergalactic_Spaceships_Version_2 (2).abc',
      (object: Object3D) => {
        object.traverse((node) => {
          if (node instanceof Mesh && node.name === 'myMesh') {
            // Apply a blue color to the 'myMesh' mesh
            node.material = new MeshStandardMaterial({ color: 0x151515 });
          } else if (node instanceof Mesh) {
            // Make other meshes black and white
            node.material = new MeshStandardMaterial({ color: 0x151515 });
          }
        });
        object.scale.set(0.5, 0.5, 0.5);
        object.position.y = 0.4;
        object.name = 'model';
        this.scene.add(object);
      }
    );
  }

  setupMouseListeners() {
    window.addEventListener('mousemove', (event) => {
      this.updateMousePosition(event);
    });

    window.addEventListener('mousedown', () => {
      this.performAction();
    });
  }

  updateMousePosition(event: MouseEvent) {
    const containerBounds =
      this.rendererContainer.nativeElement.getBoundingClientRect();
    const mouseX = event.clientX - containerBounds.left;
    const mouseY = event.clientY - containerBounds.top;
    const normalizedX = (mouseX / containerBounds.width) * 2 - 1;
    const normalizedY = -(mouseY / containerBounds.height) * 2 + 1;

    this.mousePosition.x = normalizedX;
    this.mousePosition.y = normalizedY;
  }

  performAction() {
    const model = this.scene.getObjectByName('model');
    if (model) {
      // Create and add thunder light
      const thunderLight = new PointLight(0xff7f50, 22, 100); // Updated color and intensity
      this.scene.add(thunderLight);

      // Animate the thunder light
      const animationDuration = 2000; // in milliseconds
      const intensity = { value: 2 }; // Updated initial intensity
      const targetIntensity = 0.1;

      new TWEEN.Tween(intensity)
        .to({ value: targetIntensity }, animationDuration)
        .easing(TWEEN.Easing.Quadratic.Out)
        .onUpdate(() => {
          thunderLight.intensity = intensity.value;
        })
        .start();

      // Remove the thunder light after the animation completes
      setTimeout(() => {
        this.scene.remove(thunderLight);
      }, animationDuration);
    }
  }

  animate() {
    const model = this.scene.getObjectByName('model');
    if (model) {
      const target = new Vector3(
        this.mousePosition.x,
        this.mousePosition.y,
        this.camera.position.z
      );
      const lookAtVector = new Vector3();
      lookAtVector.subVectors(target, model.position).normalize();

      model.lookAt(lookAtVector);

      if (this.camera.position.z > 2.5) {
        this.camera.position.z -= 0.05;
      }
    }
    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(() => this.animate());
    TWEEN.update();
  }
}
