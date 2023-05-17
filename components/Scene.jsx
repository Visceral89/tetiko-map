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
		const shadowmapres = 1024;

		// Camera Variables

		const fov = 50;
		const nearclip = 0.1;
		const farclip = 1000;

		const camera = new THREE.PerspectiveCamera(
			fov,
			width / height,
			nearclip,
			farclip
		);
		camera.position.set(-16, -18, 14);
		camera.rotation.order = "ZYX";
		camera.rotation.set(
			THREE.MathUtils.degToRad(60),
			THREE.MathUtils.degToRad(0),
			THREE.MathUtils.degToRad(-42)
		);

		// Rendering Variables
		const b_antialias = true;

		const renderer = new THREE.WebGLRenderer({ antialias: b_antialias });
		renderer.setSize(width, height);
		renderer.shadowMap.enabled = true;
		renderer.shadowMap.type = THREE.PCFSoftShadowMap;
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

		// Lighting

		const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
		scene.add(ambientLight);

		const dirLight = new THREE.DirectionalLight(0xffffff, 0.5);
		dirLight.position.set(0, 20, 10);
		dirLight.castShadow = true;
		dirLight.shadow.mapSize.width = shadowmapres;
		dirLight.shadow.mapSize.height = shadowmapres;

		dirLight.shadow.camera.near = 0.5;
		dirLight.shadow.camera.far = 500;
		scene.add(dirLight);

		// GLTF Loader
		const loader = new GLTFLoader();

		function loadModel(url) {
			return new Promise((resolve, reject) => {
				loader.load(
					url,
					(gltf) => {
						gltf.scene.traverse((node) => {
							if (node instanceof THREE.Mesh) {
								node.castShadow = true;
								node.receiveShadow = true;
							}
						});
						scene.add(gltf.scene);
						resolve(gltf);
					},
					undefined,
					(error) => {
						console.error("Failed to load model", error);
						reject(error);
					}
				);
			});
		}

		// Add all models to be loaded here.

		const modelUrls = ["/models/room.glb"];
		Promise.all(modelUrls.map(loadModel))
			.then(() => {
				console.log("All models loaded");
			})
			.catch((error) => {
				console.error("An error happened while loading models", error);
			});

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
