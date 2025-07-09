import * as THREE from "three";
import gsap from "gsap";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

function myThree() {
  const canvasEl = document.querySelector("#helmet");

  const modelLoader = new GLTFLoader();
  const scene = new THREE.Scene();

  // scene.fog = new THREE.Fog(0xff0000, 3, 11);
  scene.fog = new THREE.Fog(0x000000, 3, 11);

  const camera = new THREE.PerspectiveCamera(
    40,
    window.innerWidth / window.innerHeight,
    1,
    50
  );
  camera.position.z = 7;
  let helmet;

  const helmetWrapper = new THREE.Group();
  scene.add(helmetWrapper);

  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    canvas: canvasEl,
  });

  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.outputColorSpace = "srgb";
  renderer.toneMapping = THREE.ReinhardToneMapping;
  renderer.toneMappingExposure = 4;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
  scene.add(ambientLight);

  const lightHolder = new THREE.Group();
  scene.add(lightHolder);

  const staticLight = new THREE.DirectionalLight(0xffffff, 1);
  staticLight.position.set(0, -9, 20);
  staticLight.castShadow = true;
  staticLight.shadow.bias = 0.001;
  staticLight.shadow.mapSize.width = 4096;
  staticLight.shadow.mapSize.height = 4096;
  scene.add(staticLight);

  const staticLightCopy = new THREE.DirectionalLight(0xffffff, 0.7);
  staticLightCopy.position.set(-15, -9, 10);
  staticLightCopy.castShadow = true;
  staticLightCopy.shadow.bias = 0.001;
  staticLightCopy.shadow.mapSize.width = 4096;
  staticLightCopy.shadow.mapSize.height = 4096;
  scene.add(staticLightCopy);

  const movingLight = new THREE.DirectionalLight(0xffffff, 1);
  movingLight.position.set(0, 10, 15);
  // movingLight.castShadow = true;
  // movingLight.shadow.bias = .002;
  // movingLight.shadow.mapSize.width = 4096;
  // movingLight.shadow.mapSize.height = 4096;
  lightHolder.add(movingLight);

  const movingLightCopy = new THREE.DirectionalLight(0xffffff, 1);
  movingLightCopy.position.set(0, 10, -15);
  lightHolder.add(movingLight);

  const trackingPlane = new THREE.Mesh(
    new THREE.PlaneGeometry(100, 100),
    new THREE.MeshBasicMaterial({
      transparent: true,
      opacity: 0,
    })
  );
  trackingPlane.position.set(0, 0, 3);
  scene.add(trackingPlane);

  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2(0, 0);
  const mouseTarget = new THREE.Vector2(0, 0);

  window.addEventListener("mousemove", (e) => {
    const x = e.clientX;
    const y = e.clientY;
    mouseTarget.x = (x / window.innerWidth) * 2 - 1;
    mouseTarget.y = (y / window.innerHeight) * 2 - 1;
  });

  modelLoader.load(
    // HERE YOU NEED TO REPLACE THE PATH TO THE MODEL FILE
    "https://uploads-ssl.webflow.com/653553673268205b9f99f650/6580b084e4ae5621de218603_helmet2.glb.txt",
    (glb) => {
      helmet = glb.scene;
      helmetWrapper.add(helmet);

      glb.scene.traverse((child) => {
        if (child.isMesh) {
          if (child.material.name === "metal") {
            child.material.roughness = 0.2;
            child.material.metalness = 0.9;
            child.material.normalMap = new THREE.TextureLoader().load(
              "https://uploads-ssl.webflow.com/653553673268205b9f99f650/6580b0706b878ce2c4343293_normalMap.jpeg"
            );
            child.material.normalScale = new THREE.Vector2(0.1, 0.1);
            child.castShadow = true;
          } else {
            child.material.roughness = 0.1;
            child.material.metalness = 0.4;
            child.receiveShadow = true;
          }
        }
      });
    }
  );

  updateSize();
  window.addEventListener("resize", () => updateSize());

  function updateSize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  render();

  function render(time) {
    if (helmet) {
      helmet.position.y = 0.07 * Math.sin(0.001 * time);

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObject(trackingPlane);
      if (intersects.length) {
        helmet.lookAt(
          30 * (intersects[0].uv.x - 0.5),
          30 * (0.5 - intersects[0].uv.y),
          5
        );
        helmet.rotation.x -= helmetWrapper.rotation.x;
        helmet.rotation.y += helmetWrapper.rotation.y;
      }
    }
    if (lightHolder) {
      lightHolder.rotation.y = 0.0006 * time;
    }
    mouse.x += (mouseTarget.x - mouse.x) * 0.1;
    mouse.y += (mouseTarget.y - mouse.y) * 0.1;

    renderer.render(scene, camera);
    requestAnimationFrame(render);
  }

  // TRANSITION TO VIEW #1
  // Select all elements with class .transition-1
  const transitionElements1 = document.querySelectorAll(".transition-1");

  // Define the toFstView function
  function toFstView() {
    gsap
      .timeline({})
      .to(
        scene.fog,
        {
          duration: 0.5,
          near: 4,
        },
        0
      )
      .to(
        helmetWrapper.position,
        {
          duration: 0.5,
          x: 0,
          y: -1.2,
        },
        0
      )
      .to(
        camera.position,
        {
          duration: 1.5,
          z: 7,
          ease: "back.out(1.4)",
        },
        0
      )
      .to(
        helmetWrapper.rotation,
        {
          duration: 2,
          x: -0.1,
          y: -0.15,
          ease: "back.out(2)",
        },
        0
      );
  }

  // Loop through each element
  transitionElements1.forEach((element) => {
    // Attach onclick event
    element.onclick = toFstView;
  });

  // TRANSITION TO VIEW #2
  // Select all elements with class .transition-2
  const transitionElements2 = document.querySelectorAll(".transition-2");

  function toSndView() {
    let xPos = window.innerWidth / window.innerHeight;
    xPos = Math.max(1.1, xPos);
    xPos = Math.min(1.6, xPos);

    gsap
      .timeline({})
      .to(scene.fog, { duration: 0.5, near: 1 }, 0)
      .to(helmetWrapper.position, { duration: 0.5, x: xPos, y: 0 }, 0)
      .to(camera.position, { duration: 1.5, z: 4, ease: "power2.out" }, 0)
      .to(
        helmetWrapper.rotation,
        { duration: 1.5, x: 0, y: -0.4, ease: "back.out(4)" },
        0
      );
  }
  // Loop through each element
  transitionElements2.forEach((element) => (element.onclick = toSndView));

  // TRANSITION TO VIEW #3
  // Select all elements with class .transition-3
  const transitionElements3 = document.querySelectorAll(".transition-3");

  function toTrdView() {
    gsap
      .timeline({})
      .to(scene.fog, { duration: 0.5, near: 6 }, 0)
      .to(helmetWrapper.position, { duration: 0.5, x: 0, y: 0 }, 0)
      .to(camera.position, { duration: 1.5, z: 7, ease: "back.out(1.4)" }, 0)
      .to(
        helmetWrapper.rotation,
        { duration: 2, x: 0, y: -0.1, ease: "back.out(4)" },
        0
      );
  }
  // Loop through each element
  transitionElements3.forEach((element) => (element.onclick = toTrdView));

  // TRANSITION TO VIEW #4
  // Select all elements with class .transition-4
  const transitionElements4 = document.querySelectorAll(".transition-4");

  function toFrthView() {
    gsap
      .timeline({})
      .to(scene.fog, { duration: 0.5, near: 3 }, 0)
      .to(helmetWrapper.position, { duration: 1, x: 0, y: 0 }, 0)
      .to(camera.position, { duration: 1.4, z: 10, ease: "power1.inOut" }, 0)
      .to(helmetWrapper.rotation, { duration: 1.5, x: 0, y: 0 }, 0);
  }

  // Loop through each element
  transitionElements4.forEach((element) => (element.onclick = toFrthView));

  return { toFstView, toSndView, toTrdView, toFrthView };
}

export { myThree };
