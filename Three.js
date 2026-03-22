// 클라이언트 측 3D 설정 (핵심 코드만 요약)
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 바닥(땅) 만들기
const gridHelper = new THREE.GridHelper(100, 100);
scene.add(gridHelper);

// 내 캐릭터 (큐브)
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
const playerMesh = new THREE.Mesh(geometry, material);
scene.add(playerMesh);

// 조명
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 5, 5).lookup(0,0,0);
scene.add(light, new THREE.AmbientLight(0x404040));

camera.position.z = 5;
camera.position.y = 2;
