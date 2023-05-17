"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export default function Scene() {
	const container = useRef();

	useEffect(() => {
		const scene = new THREE.Scene();

		const width = window.innerWidth;
		const height = window.innerHeight;

		// Camera Variables

		const fov = 60;
		const nearclip = 0.1;
		const farclip = 1000;

		const camera = new THREE.PerspectiveCamera(
			fov,
			width / height,
			nearclip,
			farclip
		);
		camera.position.set(-15, 15, 13);
		camera.rotation.order = "ZYX";
		camera.rotation.set(65, 0, -45);
		/*
		camera.rotation.set(
			THREE.MathUtils.degToRad(65),
			THREE.MathUtils.degToRad(0),
			THREE.MathUtils.degToRad(-42)
			
		); */

		// Rendering Variables
		const b_antialias = true;

		const renderer = new THREE.WebGLRenderer({ antialias: b_antialias });
		renderer.setSize(width, height);
		renderer.shadowMap.enabled = true;
		renderer.shadowMap.type = THREE.VSMShadowMap;
		container.current.appendChild(renderer.domElement);

		renderer.setClearColor(0xffffff);

		// Resize Window
		const onResize = function () {
			const width = window.innerWidth;
			const height = window.innerHeight;
			renderer.setSize(width, height);
			camera.aspect = width / height;
			camera.updateProjectionMatrix();
		};

		window.addEventListener("resize", onResize);

		/*// Lighting

		const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
		scene.add(ambientLight);

		const dirLight = new THREE.DirectionalLight(0xffffff, 0.9);
		dirLight.position.set(10, 5, 2);
		dirLight.castShadow = true;
		dirLight.shadow.mapSize.width = 1024;
		dirLight.shadow.mapSize.height = 1024;
		dirLight.shadow.camera.near = 0.5;
		dirLight.shadow.camera.far = 25;
		dirLight.shadow.camera.left = -10;
		dirLight.shadow.camera.right = 10;
		dirLight.shadow.camera.top = 10;
		dirLight.shadow.camera.bottom = -10;
		dirLight.shadow.radius = 5;
		dirLight.shadow.blurSamples = 25;
		dirLight.shadow.bias = 0.00001;

		dirLight.shadow.camera.near = 0.1;
		dirLight.shadow.camera.far = 5000;
		scene.add(dirLight);

		*/

		// GLTF Loader
		const loader = new GLTFLoader();

		loader.load(
			"/models/room.glb",
			(gltf) => {
				const textureLoader = new THREE.TextureLoader();
				const lightMap = textureLoader.load("/lightmaps/room_lightmap.png");
				lightMap.flipY = false;

				gltf.scene.traverse((node) => {
					if (node.isMesh) {
						node.material.lightMap = lightMap;
						node.material.needsUpdate = true;
					}
				});

				scene.add(gltf.scene);
			},
			undefined,
			(error) => console.error(error)
		);

		// Add all models to be loaded here.

		const controls = new OrbitControls(camera, renderer.domElement);
		controls.rotateSpeed = 0.7;
		controls.zoomSpeed = 0.3;
		controls.minDistance = 2;
		controls.maxDistance = 10;

		function animate() {
			requestAnimationFrame(animate);
			renderer.render(scene, camera);

			// Update controls!

			controls.update();
		}

		animate();

		return () => {
			window.removeEventListener("resize", onResize);
			container.current.removeChild(renderer.domElement);
		};
	}, []);

	return <div ref={container}></div>;
}
