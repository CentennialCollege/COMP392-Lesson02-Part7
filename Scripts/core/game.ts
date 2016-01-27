/// <reference path="_reference.ts"/>

// MAIN GAME FILE

// THREEJS Aliases
import Scene = THREE.Scene;
import Renderer = THREE.WebGLRenderer;
import Camera = THREE.Camera;
import PerspectiveCamera = THREE.PerspectiveCamera;
import OrthographicCamera = THREE.OrthographicCamera;
import BoxGeometry = THREE.BoxGeometry;
import CubeGeometry = THREE.CubeGeometry;
import PlaneGeometry = THREE.PlaneGeometry;
import SphereGeometry = THREE.SphereGeometry;
import Geometry = THREE.Geometry;
import AxisHelper = THREE.AxisHelper;
import LambertMaterial = THREE.MeshLambertMaterial;
import MeshBasicMaterial = THREE.MeshBasicMaterial;
import Material = THREE.Material;
import Mesh = THREE.Mesh;
import Object3D = THREE.Object3D;
import SpotLight = THREE.SpotLight;
import PointLight = THREE.PointLight;
import AmbientLight = THREE.AmbientLight;
import DirectionalLight = THREE.DirectionalLight;
import Control = objects.Control;
import GUI = dat.GUI;
import Color = THREE.Color;
import Vector3 = THREE.Vector3;
import Face3 = THREE.Face3;
import Point = objects.Point;

//Custom Game Objects
import gameObject = objects.gameObject;

var scene: Scene;
var renderer: Renderer;
var camera: Camera;
var axes: AxisHelper;
var cube: Mesh;
var plane: Mesh;
var sphere: Mesh;
var ambientLight: AmbientLight;
var spotLight: SpotLight;
var directionalLight: DirectionalLight;
var control: Control;
var gui: GUI;
var guiScale: GUI;
var guiPosition: GUI;
var guiRotation: GUI;
var guiTranslate: GUI;
var stats: Stats;
var step: number = 0;
var planeMaterial: LambertMaterial;
var planeGeometry: PlaneGeometry;
var cubeMaterial: LambertMaterial;
var cubeGeometry: CubeGeometry;

function init() {
    // Instantiate a new Scene object
    scene = new Scene();

    setupRenderer(); // setup the default renderer
	
    setupCamera(); // setup the camera
	
    // add an axis helper to the scene
    axes = new AxisHelper(20);
    scene.add(axes);
    console.log("Added Axis Helper to scene...");
    
    //Add a Plane to the Scene
    planeGeometry = new THREE.PlaneGeometry(180, 180);
    planeMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff });
    plane = new gameObject(planeGeometry, planeMaterial, 0, 0, 0);
    plane.rotation.x = -0.5 * Math.PI;
    scene.add(plane);
    console.log("Added Plane Primitive to scene...");

    cubeMaterial = new LambertMaterial({ color: 0x00ee22 });
    cubeGeometry = new CubeGeometry(4, 4, 4);
    for (var row = 0; row < (180 / 5); row++) {
        for (var col = 0; col < (180 / 5); col++) {
            var cube = new Mesh(cubeGeometry, cubeMaterial);
            cube.position.z = -(180 / 2) + 2 + (row * 5);
            cube.position.x = -(180 / 2) + 2 + (col * 5);
            cube.position.y = 2;
            scene.add(cube);
        }
    }
    console.log("Added 36 x 36 Cube Primitives to the Scene");
    
    // Add an AmbientLight to the scene
    ambientLight = new AmbientLight(0x292929);
    scene.add(ambientLight);
    console.log("Added an Ambient Light to Scene");
	
    // Add a DirectionalLight to the scene
    directionalLight = new DirectionalLight(0xffffff, 0.7);
    directionalLight.position.set(-20, 40, 60);
    scene.add(directionalLight);
    console.log("Added a Directional Light to Scene");
    
    // add controls
    gui = new GUI();
    control = new Control();
    addControl(control);

    // Add framerate stats
    addStatsObject();
    console.log("Added Stats to scene...");

    document.body.appendChild(renderer.domElement);
    gameLoop(); // render the scene	
    
    window.addEventListener('resize', onResize, false);
}

// Change the Camera Aspect Ratio according to Screen Size changes
function onResize(): void {
    if(camera instanceof PerspectiveCamera) {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    }
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function addControl(controlObject: Control): void {
   gui.add(controlObject, 'switchCamera');
   gui.add(controlObject, 'perspective').listen();
}

// Add Stats Object to the Scene
function addStatsObject() {
    stats = new Stats();
    stats.setMode(0);
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.left = '0px';
    stats.domElement.style.top = '0px';
    document.body.appendChild(stats.domElement);
}

// Setup main game loop
function gameLoop(): void {
    stats.update();

    // render using requestAnimationFrame
    requestAnimationFrame(gameLoop);
	
    // render the scene
    renderer.render(scene, camera);
}

// Setup default renderer
function setupRenderer(): void {
    renderer = new Renderer();
    renderer.setClearColor(0xEEEEEE, 1.0);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    console.log("Finished setting up Renderer...");
}

// Setup main camera for the scene
function setupCamera(): void {
    camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.x = 120;
    camera.position.y = 60;
    camera.position.z = 180;
    camera.lookAt(scene.position);
    console.log("Finished setting up Initial Camera...");
}
