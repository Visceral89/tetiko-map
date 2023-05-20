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

		const fov = 55;
		const nearclip = 0.1;
		const farclip = 512;

		const camera = new THREE.PerspectiveCamera(
			fov,
			width / height,
			nearclip,
			farclip
		);
		camera.position.set(6, 5, -3);
		camera.rotation.order = "ZYX";
		camera.rotation.set(3, 1, 3.14);

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

		// GLTF Loader
		const loader = new GLTFLoader();
		const tables = [];

		loader.load(
			"/models/room.glb",
			(gltf) => {
				const textureLoader = new THREE.TextureLoader();
				const lightMap = textureLoader.load("/lightmaps/room_lightmap.png");
				lightMap.flipY = false;

				let materials = {};

				gltf.scene.traverse((node) => {
					if (node.isMesh) {
						node.material = node.material.clone();
						node.material.side = THREE.FrontSide;
						if (
							node.material instanceof THREE.MeshStandardMaterial ||
							node.material instanceof THREE.MeshLambertMaterial
						) {
							node.material.lightMap = lightMap;
						}
						node.material.needsUpdate = true;

						// Check if this is a table, and if so, add it to the list and save the material
						if (node.name.includes("table")) {
							tables.push(node);
							materials[node.name] = node.material;
						}
					}
				});

				scene.add(gltf.scene);
			},
			undefined,
			(error) => console.error(error)
		);

		function onDocumentMouseClick(e) {
			e.preventDefault();

			let mouse = new THREE.Vector2(
				(e.clientX / width) * 2 - 1,
				-(e.clientY / height) * 2 + 1
			);

			let raycaster = new THREE.Raycaster();

			raycaster.setFromCamera(mouse, camera);

			let intersects = raycaster.intersectObjects(tables, true);

			if (intersects.length > 0) {
				intersects[0].object.material.color.set(0xff0000); // Change the color to red
				intersects[0].object.material.needsUpdate = true;
			}
		}

		window.addEventListener("click", onDocumentMouseClick, false);

		const controls = new OrbitControls(camera, renderer.domElement);
		controls.rotateSpeed = 0.7;
		controls.zoomSpeed = 0.3;
		controls.minDistance = 2;
		controls.maxDistance = 10;
		controls.minPolarAngle = 0; // radians
		controls.maxPolarAngle = Math.PI / 2.5; // radians

		function logCameraDetails(e) {
			if (e.key === "q") {
				console.log("Camera Pos: ", camera.position);
				console.log("Camera Rot: ", camera.rotation);
			}
		}

		window.addEventListener("keydown", logCameraDetails);

		function animate() {
			requestAnimationFrame(animate);
			renderer.render(scene, camera);

			// Update controls!

			controls.update();
		}

		animate();

		return () => {
			window.removeEventListener("resize", onResize);
			window.removeEventListener("keydown", logCameraDetails);
			container.current.removeChild(renderer.domElement);
			document.removeEventListener("click", onDocumentMouseClick);
		};
	}, []);

	return <div ref={container}></div>;
}
