"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export default function Scene() {
	const container = useRef();

	const width = window.innerWidth;
	const height = window.innerHeight;

	useEffect(() => {
		const scene = new THREE.Scene();

		// Camera Variables

		const fov = 90;
		const nearclip = 0.1;
		const farclip = 1000;

		const camera = new THREE.PerspectiveCamera(
			fov,
			width / height,
			nearclip,
			farclip
		);
		camera.position.z = 5;

		// Rendering Variables
		const b_antialias = true;

		const renderer = new THREE.WebGLRenderer({ antialias: b_antialias });
		renderer.setSize(width, height);
		container.current.appendChild(renderer.domElement);

		// Resize Window
		window.addEventListener("resize", function () {
			const width = window.innerWidth;
			const height = window.innerHeight;
			renderer.setSize(width, height);
			camera.aspect = width / height;
			camera.updateProjectionMatrix();
		});

		// GLTF Loader
		const loader = new GLTFLoader();

		function loadModel(url) {
			return new Promise((resolve, reject) => {
				loader.load(
					url,
					(gltf) => {
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

		const modelUrls = ["@/models/room.glb"];
		Promise.all(modelUrls.map(loadModel))
			.then(() => {
				console.log("All models loaded");
			})
			.catch((error) => {
				console.error("An error happened while loading models", error);
			});

		function animate() {
			requestAnimationFrame(animate);
			renderer.render(scene, camera);

			// Update controls!
			const controls = new OrbitControls(camera, renderer.domElement);
			controls.update();
		}

		animate();

		return () => {
			window.removeEventListener("resize", function () {});
			container.current.removeChild(renderer.domElement);
		};
	}, []);

	return <div ref={container}></div>;
}
