var camera, scene, renderer;
var material,geometry, container;
var spheres = [];
var mouseX = 0,mouseY = 0;
var windowHalfX, windowHalfY;
var control;
init();
animate();


function onDocumentMouseMove( event ) {
  mouseX = ( event.clientX - windowHalfX ) * 10;
  mouseY = ( event.clientY - windowHalfY ) * 10;
}

function onWindowResize(){
  windowHalfX = window.innerWidth/2;
  windowHalfY = window.innerHeight/2;
  camera.updateProjectionMatrix();
  camera.aspect = window.innerWidth/ window.innerHeight;
  renderer.setSize(window.innerWidth, window.innerHeight);
}


function init(){
  //Seting the values of windowHalfY and windowHalfX

  windowHalfX = window.innerWidth/2;
  windowHalfY = window.innerHeight/2;
  //Scene
  scene = new THREE.Scene();
  scene.background = new THREE.CubeTextureLoader().setPath('public/img/').load(['px.png', 'nx.png', 'py.png', 'ny.png', 'pz.png', 'nz.png' ]);

  //camera
  camera = new THREE.PerspectiveCamera(100, window.innerWidth/window.innerWidth, 0.1, 10000000);
  camera.position.z = 200;

  //making our bubbles
   geometry = new THREE.SphereBufferGeometry(100,32,16);
   material = new THREE.MeshBasicMaterial({
     envMap: scene.background,
     //wireframe: true,
     //transparent: true,
     //opacity: 0.5
   });

for (var i = 0; i < 450; i++) {
  var mesh = new THREE.Mesh(geometry, material);
  mesh.position.x = Math.random() * 10000 - 5000;
  mesh.position.y = Math.random() * 10000 - 5000;
  mesh.position.z = Math.random() * 10000 - 5000;
  mesh.scale.x = mesh.scale.y = mesh.scale.z = Math.random() * 3 + 1;
  scene.add(mesh);
  spheres.push(mesh);
}

//renderer

  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio(window.innerWidth/window.innerHeight);
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  //Orbit control
  //control = new THREE.OrbitControl(camera, renderer.domElement);
  //on resize
  window.addEventListener('onresize', onWindowResize, false);
  window.addEventListener( 'mousemove', onDocumentMouseMove, false );
}


function animate(){
  requestAnimationFrame(animate);
  render();
}

function render(){
  var timer = 0.00001 * Date.now();
  for (var i = 0;i < spheres.length; i++) {
    var sphere = spheres[i];
    sphere.position.x += Math.cos( timer + i );
    sphere.position.y += Math.sin( timer + i*1.1);
  }
  camera.position.x += ( mouseX - camera.position.x ) * .005;
  camera.position.y += ( mouseY - camera.position.y ) * .005;
  camera.lookAt( scene.position );
  renderer.render( scene, camera );


}
