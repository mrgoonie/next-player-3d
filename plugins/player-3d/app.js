import * as THREE from "three";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import CameraControls from "camera-controls";
import gsap from "gsap";
import ThreeUtils from "../three/ThreeUtils";
import { AppEvent } from "./const";
import PlayerLoader from "./loader";

CameraControls.install({ THREE: THREE });

class PlayerApp {
	/**
	 * @type {THREE.Scene}
	 */
	scene;
	/**
	 * @type {THREE.PerspectiveCamera}
	 */
	camera;
	/**
	 * @type {THREE.WebGLRenderer}
	 */
	renderer;
	/**
	 * @type {THREE.DirectionalLight}
	 */
	directLight;
	/**
	 * @type {THREE.AmbientLight}
	 */
	ambientLight;
	/**
	 * @type {THREE.GridHelper}
	 */
	grid;
	/**
	 * @type {THREE.AxesHelper}
	 */
	axes;
	/**
	 * @type {THREE.DirectionalLightHelper}
	 */
	directLightHelper;
	/**
	 * @type {CameraControls}
	 */
	controls;

	lastCalledTime;
	eventListeners = [];
	clock;
	req;

	isInit = false;

	sw = 0;
	sh = 0;
	container;

	/**
	 * @param  {Object} props
	 * @param  {Boolean} [props.transparent=false]
	 * @param  {Boolean} [props.controlEnabled=true]
	 * @param  {Boolean} [props.lightEnabled=true]
	 * @param  {Boolean} [props.gridEnabled=true]
	 * @param  {Number} [cameraDistance=300]
	 * @param  {Boolean} [props.controlXLock=false] https://stackoverflow.com/questions/41135592/lock-x-axis-rotation-when-using-orbitcontrols-three-js
	 */
	constructor(props) {
		this.clock = new THREE.Clock();
		this.props = props;
	}

	init(domElement) {
		if (typeof window == "undefined") return;
		// if (this.isInit) return;
		const scope = this;

		this.isInit = true;
		this.container = domElement;

		let props = this.props || {};
		let {
			transparent = false,
			controlEnabled = true,
			zoomEnabled = true,
			lightEnabled = true,
			gridEnabled = true,
			cameraDistance = 300,
			controlMinDistance = 10,
			controlMaxDistance = 990,
			controlXLock = false,
		} = props;

		// initial setup
		this.scene = new THREE.Scene();
		this.scene.background = null;

		this.camera = new THREE.PerspectiveCamera(75, this.sw / this.sh, 0.1, 10000);
		this.camera.position.set(0, 0, cameraDistance);
		this.camera.lookAt(0, 0, 0);
		this.scene.add(this.camera);

		this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: transparent });
		this.renderer.setPixelRatio(window ? window.devicePixelRatio : 1);
		this.renderer.setSize(this.sw, this.sh);
		// this.renderer.setClearColorHex(0x000000, 0);

		if (this.container) this.container.appendChild(this.renderer.domElement);
		this.renderer.domElement.style.outline = "none";
		this.renderer.domElement.style.position = "absolute";
		this.renderer.domElement.style.top = "0px";
		this.renderer.domElement.style.left = "0px";

		this.renderer.domElement.oncontextmenu = function (e) {
			e.preventDefault();
		};

		// lights
		if (lightEnabled) {
			this.directLight = new THREE.DirectionalLight("#fff", 0.2);
			this.directLight.position.set(500, 1000, 750);
			this.scene.add(this.directLight);

			this.ambientLight = new THREE.AmbientLight("#fff", 1);
			this.scene.add(this.ambientLight);
		}

		// helpers
		this.directLightHelper = new THREE.DirectionalLightHelper(this.directLight, 10);
		this.scene.add(this.directLightHelper);

		this.grid = new THREE.GridHelper(200, 20, 0x000000, 0x000000);
		this.grid.material.transparent = true;
		this.grid.material.opacity = 0.1;
		this.scene.add(this.grid);

		this.axes = new THREE.AxesHelper(1000);
		this.scene.add(this.axes);

		this.setGridVisible(gridEnabled);

		/**
		 * USING ORBIT CONTROLS:
		 */
		// this.controls = new OrbitControls(this.camera, this.renderer.domElement);
		// this.controls.minDistance = 10;
		// this.controls.maxDistance = 990;
		// this.controls.dampingFactor = 0.15;
		// this.controls.enableDamping = true;
		// this.controls.enablePan = false;
		// this.controls.enabled = controlEnabled;
		// this.setControlZoom(zoomEnabled);

		/**
		 * USING CAMERA CONTROL PLUGIN:
		 */
		this.controls = new CameraControls(this.camera, this.renderer.domElement);
		// this.controls.minDistance = controlMinDistance;
		// this.controls.maxDistance = controlMaxDistance;
		this.controls.dampingFactor = 0.07;
		this.controls.draggingDampingFactor = 0.25;
		this.controls.mouseButtons.right = CameraControls.ACTION.NONE;
		this.controls.mouseButtons.middle = CameraControls.ACTION.NONE;
		this.controls.touches.three = CameraControls.ACTION.NONE;
		this.controls.dollyTo(cameraDistance, false);

		this.setControlZoom(zoomEnabled);
		this.setControlEnabled(controlEnabled);
		this.setControlLock(controlXLock);

		// resize
		this.playerResize(this.container);

		this.fpsDelta = 0;
		this.fpsInterval = 1 / 30; // 30 fps

		this.animate = (time) => {
			if (!scope.animate) return;

			scope.req = requestAnimationFrame(scope.animate);

			if (!this.renderer) return;
			if (!this.scene) return;
			if (!this.camera) return;

			let deltaTime = this.clock.getDelta();
			let delta = (new Date() - this.lastCalledTime) / 1000;
			let fps = 1 / delta;

			// limit to fpsInterval
			this.fpsDelta += deltaTime;

			this.lastCalledTime = new Date();

			// RENDER THINGS:
			// if (this.fpsDelta > this.fpsInterval) {
			if (this.controls) this.controls.update(deltaTime);

			this.scene.dispatchEvent({ type: AppEvent.BEFORE_RENDER, delta, fps, time });

			try {
				this.renderer.render(this.scene, this.camera);
			} catch (e) {
				// cancelAnimationFrame(this.req);
			}

			this.scene.dispatchEvent({ type: AppEvent.AFTER_RENDER, delta, fps, time });

			this.fpsDelta = this.fpsDelta % this.fpsInterval;
			// }
		};
		this.animate();
	}

	/**
	 * @param  {HTMLElement} parentDom
	 */
	playerResize(parentDom) {
		// console.log("resize!")
		if (!parentDom) return;

		const rect = parentDom.getBoundingClientRect();
		let sw = (this.sw = rect.width);
		let sh = (this.sh = rect.height);

		this.scene.dispatchEvent({ type: AppEvent.RESIZE, sw, sh });

		this.camera.aspect = this.sw / this.sh;
		this.camera.updateProjectionMatrix();

		this.renderer.setSize(this.sw, this.sh);

		return { sw, sh };
	}

	// EVENTS

	addEvent(event, listener) {
		if (this.scene) this.scene.addEventListener(event, listener);
	}

	removeEvent(event, listener) {
		if (this.scene) this.scene.removeEventListener(event, listener);
	}

	// VISIBILITY

	hideImmediately() {
		this.renderer.domElement.style.display = "none";
	}

	showImmediately() {
		this.renderer.domElement.style.display = "block";
	}

	/**
	 * @param  {number} duration
	 */
	hide(duration) {
		gsap.to(this.renderer.domElement, { duration: duration || 0.5, autoAlpha: 0, ease: "sine.in" });
	}
	/**
	 * @param  {number} duration
	 */
	show(duration) {
		gsap.to(this.renderer.domElement, { duration: duration || 0.5, autoAlpha: 1, ease: "sine.out" });
	}

	setGridVisible(visible) {
		if (this.grid) this.grid.visible = visible;
		if (this.axes) this.axes.visible = visible;
		if (this.directLightHelper) this.directLightHelper.visible = visible;
	}

	hideGrid() {
		if (this.grid) this.grid.visible = false;
		if (this.axes) this.axes.visible = false;
	}

	showGrid() {
		if (this.grid) this.grid.visible = true;
		if (this.axes) this.axes.visible = true;
	}

	toggleGrid() {
		if (this.grid) this.grid.visible = !this.grid.visible;
		if (this.axes) this.axes.visible = !this.axes.visible;
	}

	// UTILITIES

	enableControl() {
		if (this.controls) this.controls.enabled = true;
	}

	disableControl() {
		if (this.controls) this.controls.enabled = false;
	}

	setControlEnabled(enabled) {
		if (this.controls) {
			// this.controls.enabled = enabled;
			this.controls.mouseButtons.left = enabled ? CameraControls.ACTION.ROTATE : CameraControls.ACTION.NONE;
			this.controls.touches.one = enabled ? CameraControls.ACTION.TOUCH_ROTATE : CameraControls.ACTION.NONE;
		}
	}

	setControlLock(controlXLock) {
		if (this.controls) {
			if (controlXLock) {
				this.controls.minPolarAngle = Math.PI / 2;
				this.controls.maxPolarAngle = Math.PI / 2;
			}
		}
	}

	setControlZoom(enabled) {
		if (this.controls) {
			// this.controls.zoomEnabled = enabled;
			this.controls.mouseButtons.wheel = enabled ? CameraControls.ACTION.DOLLY : CameraControls.ACTION.NONE;
			this.controls.touches.two = enabled ? CameraControls.ACTION.TOUCH_DOLLY : CameraControls.ACTION.NONE;
		}
	}

	fitView(mesh, top, right, bottom, left) {
		const fov = this.camera.fov * THREE.MathUtils.DEG2RAD;
		const rendererHeight = this.renderer.getSize(new THREE.Vector2()).height;

		const boundingBox = new THREE.Box3().setFromObject(mesh);
		const size = boundingBox.getSize(new THREE.Vector3());
		const boundingWidth = size.x;
		const boundingHeight = size.y;
		const boundingDepth = size.z;

		var distanceToFit = this.controls.getDistanceToFitBox(boundingWidth, boundingHeight, boundingDepth);
		var paddingTop = 0;
		var paddingBottom = 0;
		var paddingLeft = 0;
		var paddingRight = 0;

		// loop to find almost convergence points
		for (var i = 0; i < 10; i++) {
			const depthAt = distanceToFit - boundingDepth * 0.5;
			const cssPixelToUnit = (2 * Math.tan(fov * 0.5) * Math.abs(depthAt)) / rendererHeight;
			paddingTop = top * cssPixelToUnit;
			paddingBottom = bottom * cssPixelToUnit;
			paddingLeft = left * cssPixelToUnit;
			paddingRight = right * cssPixelToUnit;

			distanceToFit = this.controls.getDistanceToFitBox(
				boundingWidth + paddingLeft + paddingRight,
				boundingHeight + paddingTop + paddingBottom,
				boundingDepth
			);
		}

		this.controls.fitToBox(mesh, false, {
			paddingLeft: paddingLeft,
			paddingRight: paddingRight,
			paddingBottom: paddingBottom,
			paddingTop: paddingTop,
		});
	}

	dispose() {
		console.log("[PlayerApp] Dispose...");
		cancelAnimationFrame(this.req);
		this.animate = null;

		if (this.scene) {
			try {
				ThreeUtils.clearThree(this.scene);
			} catch (e) {
				console.warn("Something is preventing disposing THREE.Scene");
			}
			this.scene = null;
		}

		if (this.renderer) {
			try {
				this.renderer.dispose();
				this.renderer.forceContextLoss();
				this.renderer.domElement = null;
				this.renderer = null;
			} catch (e) {
				console.log("PlayerApp -> dispose error:", e);
			}
		}

		if (this.container)
			while (this.container.firstChild) {
				this.container.removeChild(this.container.firstChild);
			}
	}
}

/**
 * @param  {String} src
 * @param  {THREE.WebGLRenderer} [renderer]
 */
export const loadSkybox = (src, renderer) => {
	const loader = new PlayerLoader();
	return new Promise((resolve, reject) => {
		loader
			.load(src, null, "equirectangular", renderer)
			.then((texture) => {
				// console.log("texture", texture);
				// const material = new THREE.MeshBasicMaterial({ color: 0xffffff, envMap: texture });
				// const geometry = new THREE.BoxGeometry(9000, 9000, 9000);
				// const skybox = new THREE.Mesh(geometry, material);
				// resolve(skybox);
				resolve(texture);
			})
			.catch(reject);
	});
};

export const loadModel = async (src, textureSrc) => {
	const loader = new PlayerLoader();

	return new Promise((resolve, reject) => {
		if (textureSrc) {
			loader
				.load(src)
				.then((model) => {
					loader
						.load(textureSrc)
						.then((texture) => {
							const material = new THREE.MeshStandardMaterial({
								map: texture,
								skinning: true,
								transparent: true,
							});

							model.traverse((child) => {
								if (child.isSkinnedMesh) {
									child.material = material;
								}
							});

							resolve(model);
						})
						.catch((e) => {
							console.log("[Player3D] Load texture failed:", e);
							reject(e);
						});
				})
				.catch((e) => {
					console.log("[Player3D] Load model failed:", e);
					reject(e);
				});
		} else {
			loader
				.load(src)
				.then((model) => {
					resolve(model);
				})
				.catch((e) => {
					console.log("[Player3D] Load texture failed:", e);
					reject(e);
				});
		}
	});
};

export const loadTexture = async (url) => {
	const loader = new PlayerLoader();

	return new Promise((resolve, reject) => {
		loader
			.load(url)
			.then((texture) => resolve(texture))
			.catch((e) => {
				console.log("[Player3D -> loadTexture] ERROR:", e);
				reject(e);
			});
	});
};

export const loadTextureList = async (urls) => {
	const loader = new PlayerLoader();

	return new Promise((resolve, reject) => {
		loader
			.loadList(urls)
			.then((collection) => resolve(collection))
			.catch((e) => {
				console.log("[Player3D -> loadTextureList] ERROR:", e);
				reject(e);
			});
	});
};

/**
 *
 * @param {*} app
 * @param {THREE.Object3D} model
 * @param {*} index
 * @param {*} options
 */
export const playAnimationByIndex = async (app, model, index, options = { timeScale: 1, loop: "repeat" }) => {
	const clock = new THREE.Clock();
	const mixer = new THREE.AnimationMixer(model);

	app.addEvent(AppEvent.BEFORE_RENDER, () => {
		const delta = clock.getDelta();
		// console.log("mixer", mixer);
		if (mixer) mixer.update(delta);
	});
	const clip = model.animations[index];
	if (clip) {
		/**
		 * @type {THREE.AnimationAction}
		 */
		const action = mixer.clipAction(clip);
		action.loop = options.loop || THREE.LoopRepeat;
		action.setEffectiveTimeScale(options.timeScale || 1);
		action.play();
	}
};

export const getLoopValue = (loop) => {
	let val;
	switch (loop) {
		case "once":
			val = THREE.LoopOnce;
			break;
		case "pingpong":
			val = THREE.LoopPingPong;
			break;
		default:
			val = THREE.LoopRepeat;
			break;
	}
	return val;
};

export const getModelSize = (model) => {
	let boundingVector = new THREE.Vector3();
	const boundingBox = new THREE.Box3().setFromObject(model).getSize(boundingVector);
	// console.log(`boundingVector`, boundingVector);
	// model.position.setY(-boundingBox.y / 2);
	return boundingVector;
};

export default PlayerApp;
