/*
Lab 2 GPC. Robotic Arm
*/ 

// Common variables to all scripts (motor, escena y camara)
var renderer, scene, camera;

// Other global variables
var cubeSphere, angle = 0;

// Actions when the body and this script is loaded
init();
loadScene();
render();

function init() {
    // Configure the renderer and the canvas
    renderer = new THREE.WebGLRenderer();
    // Using full size of the window
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor( new THREE.Color(0x6495ED));

    document.getElementById("container").appendChild(renderer.domElement);

    // Scene - data structure grafo aciclico dirigido
    scene = new THREE.Scene();

    // Camera
    var aspectRatio = window.innerWidth / window.innerHeight;
    // angleVision, aspectRatio, minVisionPosition, maxVisionPosition
    camera = new THREE.PerspectiveCamera(50, aspectRatio, 0.1, 500);

    scene.add(camera);

    camera.position.set(80, 150, 150);
    camera.lookAt(new THREE.Vector3(0,80,0));
}

function loadScene() {
    // Build scene graph

    // Materials
    var planeMaterial = new THREE.MeshBasicMaterial({color: 0xF0F8FF,
                                                    wireframe: true});
    var baseMaterial = new THREE.MeshBasicMaterial({color: 0x9400D3,
                                                    wireframe: true});
    var detailMaterial = new THREE.MeshBasicMaterial({color: 0xFF7F50,
                                                    wireframe: true});
    
    // Geometries
    var geoPlane = new THREE.PlaneGeometry(1000, 1000, 100, 100);
    var geoBase = new THREE.CylinderGeometry(50, 50, 15, 50);
    
    var geoAxis = new THREE.CylinderGeometry(20, 20, 18, 32);
    var geoAsparagus = new THREE.BoxGeometry(18, 120, 12);
    var geoKneecap = new THREE.SphereGeometry(20, 30, 30);

    var geoDisc = new THREE.CylinderGeometry(22, 22, 6, 32); 
    var geoNerve = new THREE.BoxGeometry(4, 80, 4);
    //var hand = new THREE.CylinderGeometry(15, 15, 40, 32);
    
    var geoRightClamp
    var geoLeftClamp

    // Objects
    var plane = new THREE.Mesh(geoPlane, planeMaterial);
    var base = new THREE.Mesh(geoBase, baseMaterial);

    var axis = new THREE.Mesh(geoAxis, baseMaterial);
    var asparagus = new THREE.Mesh(geoAsparagus, detailMaterial);
    var kneecap = new THREE.Mesh(geoKneecap, baseMaterial);
    //var axis = new THREE.Mesh(geoAxis, );
    //var asparagus = new THREE.Mesh();
    //var kneecap 


    //var cube = new THREE.Mesh(geoCube, material);
    //var sphere = new THREE.Mesh(geoSphere, material);

    // PlaneGeometry

    // Transformations the order is not important
    // but a specific order has been stablished Trans <- Rot <- Scal
    kneecap.position.y = 120;
    asparagus.position.y = 60;
    axis.rotation.x = Math.PI/2;
    
    plane.rotation.x = Math.PI/2;

    // Container object
    robot = new THREE.Object3D();
    arm = new THREE.Object3D();
    foreArm = new THREE.Object3D();
    hand = new THREE.Object3D();
    
    // Organize scene graph
    scene.add(new THREE.AxesHelper((1000, 1000, 1000)));
    
    // hand <- rClamp, lClamp

    // foreArm <- disc, nerves, hand
    foreArm.add(hand);

    // arm <- axis, asparagus, kneecap, foreArm
    arm.add(kneecap);
    arm.add(asparagus);
    arm.add(axis);
    arm.add(foreArm);
    
    // base <- arm    
    base.add(arm);

    // robot <- base
    robot.add(base);

    // scene <- plane, base    
    scene.add(robot);
    scene.add(plane);
}

function update() {
    // Frame variation during each frame
    
    //angle += Math.PI/100;

}

function render() {
    // Build and show each frame
    requestAnimationFrame(render);
    update();
    renderer.render(scene, camera);
}