var camera, scene, renderer;
var group, controls;

init();
animate();

function init(){
  scene = new THREE.Scene();
  scene.background = new THREE.CubeTextureLoader().setPath('public/img/').load(['px.jpg', 'nx.jpg', 'py.jpg', 'ny.jpg', 'pz.jpg', 'nz.jpg']);
  camera = new THREE.PerspectiveCamera(100, window.innerWidth/ window.innerHeight, 0.1, 1000);
  camera.position.set(200, 30, 40);
  scene.add(camera);

  renderer = new THREE.WebGLRenderer({antialias:true});
  renderer.setPixelRatio = window.innerWidth/ window.innerHeight;
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.localClippingEnabled = true;
  document.body.appendChild(renderer.domElement);

  //Adding camera controls
  controls = new THREE.OrbitControls(camera, renderer.domElement);

  var light = new THREE.HemisphereLight( 0xffffff, 0x080808, 1 );
	scene.add( light );

  group = new THREE.Group();
    var geometry = new THREE.SphereBufferGeometry (20, 48, 24);
    var material = new THREE.MeshPhongMaterial({
        map : new THREE.TextureLoader().load('public/img/earth.jpg'),

    });
    group.add(new THREE.Mesh(geometry, material));
scene.add(group);
}
function animate(){
  requestAnimationFrame(animate);
  scene.rotation.y += 0.001;
  group.scale.x = group.scale.y = group.scale.z += 0.001;
  group.rotation.y += 0.1;
  renderer.render(scene, camera);
}
