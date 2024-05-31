import { Component, ElementRef, OnInit, ViewChild, Input, OnChanges, SimpleChanges } from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import occtimportjs from 'occt-import-js'; // Import the OCCT module

@Component({
  selector: 'app-model-viewer',
  standalone: true,
  imports: [],
  templateUrl: './model-viewer.component.html',
  styleUrl: './model-viewer.component.scss'
})
export class ModelViewerComponent implements OnInit, OnChanges {
  @ViewChild('canvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;
  @Input() modelData: any; // Input property to accept model data

  private scene: THREE.Scene = new THREE.Scene();
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private controls!: OrbitControls;

  constructor() {}

  ngOnInit(): void {
    this.initThreeJS();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.modelData) {
      console.log("this.modelData", this.modelData);
      this.loadModel(this.modelData.meshes);
    }
  }

  private initThreeJS() {
    const canvas = this.canvasRef.nativeElement;
    this.renderer = new THREE.WebGLRenderer({ canvas });
    this.renderer.setSize(canvas.clientWidth, canvas.clientHeight);

    this.camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
    this.camera.position.z = 5;

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.25;
    this.controls.screenSpacePanning = false;

    this.animate();
  }

  private loadModel(modelData: any) {
    this.scene.clear(); // Clear the previous model if any

    try {
      const loader = new THREE.ObjectLoader();
      const model = loader.parse(modelData);
      this.scene.add(model);
    } catch (error) {
      console.error('Error loading model:', error);
    }
  }

  private animate() {
    requestAnimationFrame(() => this.animate());
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }
}
