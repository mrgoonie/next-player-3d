import * as THREE from "three";
import { useEffect, useRef, useState } from "react";
import useDimensions from "plugins/next-hooks/useDimension";
import { useCreation } from "ahooks";
import PlayerLoader from "./loader";
import { AppEvent } from "./const";
import PlayerApp, { loadSkybox, getLoopValue, loadModel, getModelSize } from "./app";
import asset from "plugins/assets/asset";
import ThreeUtils from "plugins/three/ThreeUtils";

/**
 * Event fired when 3D app is initialized successfully.
 * @callback AppCallback
 * @param {PlayerApp} app
 */

/**
 * A simple player to display 3D objects.
 * @param  {Object} props
 * @param  {String} props.className=""
 * @param  {React.CSSProperties} [props.style={}]
 * @param  {String} [props.src]
 * @param  {String} [props.textureSrc]
 * @param  {String} [props.skyboxSrc]
 * @param  {String} [props.animationSrc]
 * @param  {{timeScale:Number, loop: ('repeat'|'pingpong'|'once'), state: ('playing'|'stopped')}} props.animationOptions
 * @param  {Boolean} [props.debug=false]
 * @param  {Boolean} [props.controlEnabled=true]
 * @param  {Boolean} [props.zoomEnabled=false]
 * @param  {Number} [props.scale]
 * @param  {Number} [props.addScale]
 * @param  {Boolean} [props.alignCenter=false]
 * @param  {Array<Number>} [props.position]
 * @param  {Array<Number>} [props.rotation]
 * @param  {Number} [props.controlMinDistance=10]
 * @param  {Number} [props.controlMaxDistance=990]
 * @param  {Number} [props.cameraDistance=300]
 * @param  {{horizontal:Number,vertical:Number,animation:Boolean}} [props.controlRotation={animation:false}]
 * @param  {any} props.width="300px"
 * @param  {any} props.height="300px"
 * @param  {Boolean} [props.controlXLock=false]
 * @param  {AppCallback} [props.onInit]
 */
const Player3D = ({
	className = "",
	style = {},
	onInit,
	src,
	textureSrc,
	skyboxSrc,
	animationSrc,
	animationOptions = { timeScale: 1, loop: "repeat", state: "playing" },
	animationRef,
	debug = false,
	controlEnabled = false,
	zoomEnabled = false,
	alignCenter = false,
	position,
	rotation,
	scale,
	addScale,
	fitToViewport = true,
	cameraDistance = 300,
	controlMinDistance = 10,
	controlMaxDistance = 990,
	controlRotation = { animation: false },
	width = "100%",
	height = "100%",
	controlXLock = false,
	...props
}) => {
	const [ref, dimensions, node] = useDimensions();

	const app = useCreation(
		() =>
			new PlayerApp({
				transparent: true,
				gridEnabled: debug,
				zoomEnabled,
				controlEnabled,
				cameraDistance,
				controlMinDistance,
				controlMaxDistance,
				controlXLock,
			}),
		[]
	);

	/**
	 * @type {React.MutableRefObject<PlayerApp>}
	 */
	const appRef = useRef();
	const objectRef = useRef();
	const mixerRef = useRef();
	/**
	 * @type {React.MutableRefObject<THREE.AnimationAction>}
	 */
	const actionRef = useRef();

	useEffect(() => {
		if (node) {
			app.init(node);
			// setApp(player);

			if (onInit) onInit(app);

			// console.log("player", player);
			const { scene, camera, controls, renderer, fitView } = app;
			// console.log("scene", scene);

			// create skybox
			if (skyboxSrc) {
				loadSkybox(skyboxSrc, renderer).then((skybox) => {
					// scene.add(skybox);
					scene.background = skybox;
				});
			}

			if (src) {
				loadModel(src, textureSrc).then((model) => {
					// console.log("Added model:", model);
					if (objectRef.current) ThreeUtils.disposeObject3D(objectRef.current);
					objectRef.current = model;
					scene.add(model);

					let shouldFitToViewport = fitToViewport;
					if (scale) {
						model.scale.setScalar(scale);
						shouldFitToViewport = false;
					}

					// fit object into view
					if (shouldFitToViewport) controls.fitToBox(model, false);

					// addScale
					if (addScale) model.scale.setScalar(addScale);

					// centerize model:
					if (alignCenter) {
						let boundingVector = getModelSize(model);
						model.position.setY(-boundingVector.y / 2);
						controls.setTarget(0, 0, 0, false);
					} else {
						controls.setTarget(model.position.x, model.position.y, model.position.z, false);
					}

					if (position) model.position.fromArray(position);
					if (rotation) model.rotation.fromArray(rotation);
					if (controlRotation) {
						// TO DO: Apply control rotation
						controls.rotateTo(
							controlRotation.horizontal || controls.azimuthAngle,
							controlRotation.vertical || controls.polarAngle,
							false
						);
					}

					if (animationSrc) {
						// console.log("animationSrc", animationSrc);
						const clock = new THREE.Clock();
						const mixer = new THREE.AnimationMixer(model);
						mixerRef.current = mixer;

						app.addEvent(AppEvent.BEFORE_RENDER, () => {
							const delta = clock.getDelta();
							// console.log("mixer", mixer);
							// console.log(delta);
							if (mixer) mixer.update(delta);
						});

						const loader = new PlayerLoader();
						loader.load(animationSrc).then((anim) => {
							// console.log("anim", anim);

							const clip = anim.animations[0];
							const { loop, timeScale } = animationOptions;

							/**
							 * @type {THREE.AnimationAction}
							 */
							const action = mixer.clipAction(clip);
							actionRef.current = action;
							if (animationRef) animationRef.current = action;

							action.loop = getLoopValue(loop);
							action.setEffectiveTimeScale(timeScale);
							action.play();
						});
					}
				});
			}
		}

		return () => {
			// clean up
			if (app && app.dispose) {
				app.dispose();
			}
		};
	}, [node, src, textureSrc, animationSrc]);

	useEffect(() => {
		if (app && app.isInit && skyboxSrc) {
			const { scene, renderer } = app;
			// create skybox
			loadSkybox(skyboxSrc, renderer).then((skybox) => {
				scene.background = skybox;
			});
		}
	}, [skyboxSrc]);

	useEffect(() => {
		// const app = appRef.current;
		if (controlRotation && app && app.isInit) {
			console.log(`control changing...`);

			const { controls } = app;

			// TO DO: Apply control rotation
			// app.setControlEnabled(true);

			controls.rotateTo(
				controlRotation.horizontal || controls.azimuthAngle,
				controlRotation.vertical || controls.polarAngle,
				controlRotation.animation || false
			);

			// change distance camera
			controls.dollyTo(cameraDistance, true);

			// app.setControlEnabled(false);
		}
	}, [controlRotation.horizontal, controlRotation.vertical, controlRotation.animation, cameraDistance]);

	useEffect(() => {
		// const app = appRef.current;

		if (app) {
			const { controls, fitView } = app;

			app.setGridVisible(debug);

			app.setControlZoom(zoomEnabled);

			app.setControlEnabled(controlEnabled);

			if (objectRef.current) {
				const model = objectRef.current;

				if (scale) model.scale.setScalar(scale);

				if (position) model.position.fromArray(position);

				if (rotation) model.rotation.fromArray(rotation);

				// fit object into view
				// if (fitToViewport) {
				// 	controls.reset();
				// 	controls.fitToBox(model, false);
				// }

				// controls.setTarget(model.position.x, model.position.y, model.position.z, false);

				// // addScale
				// if (addScale) model.scale.setScalar(addScale);
			}

			const { loop, timeScale } = animationOptions;

			if (actionRef.current) {
				const action = actionRef.current;
				action.loop = getLoopValue(loop);
				action.setEffectiveTimeScale(timeScale);
			}
		}
	}, [
		debug,
		animationOptions.timeScale,
		animationOptions.loop,
		animationOptions.state,
		position,
		rotation,
		scale,
		addScale,
		controlEnabled,
		zoomEnabled,
		fitToViewport,
	]);

	useEffect(() => {
		// const app = appRef.current;
		if (app && app.playerResize) app.playerResize(node);
		// fit 3D to canvas (if defined)
		// if (app && app.controls && fitToViewport) {
		// 	const { controls } = app;
		// 	const model = objectRef.current;
		// 	if (model) {
		// 		controls.reset();
		// 		controls.fitToBox(model, false);
		// 		controls.setTarget(model.position.x, model.position.y, model.position.z, false);
		// 		// addScale
		// 		if (addScale) model.scale.setScalar(addScale);
		// 	}
		// }
	}, [dimensions.width, dimensions.height]);

	useEffect(() => {
		// effect
		return () => {
			// dispose'
			if (app && app.dispose) {
				app.dispose();
			}
		};
	}, []);

	return (
		<div className={`player-3d ${className}`} ref={ref} style={{ position: "relative", width, height }} {...props} />
	);
};

export default Player3D;
