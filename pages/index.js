import DashkitButton from "components/dashkit/Buttons";
import { HorizontalList } from "components/diginext/layout/ListLayout";
import { CHARACTER_PREFIX } from "modules/website/battle-arena/DATA";
import asset from "plugins/assets/asset";
import Player3D from "plugins/player-3d";
import React, { useRef, useState } from "react";

const MODEL_BASE_PATH = CHARACTER_PREFIX;

const Player3DPage = () => {
	const [controlEnabled, setControlEnabled] = useState(false);

	const animation1 = useRef();
	const [isAnimationPlay1, setIsAnimationPlay1] = useState(false);

	const [animationSrc1, setAnimationSrc1] = useState(
		CHARACTER_PREFIX + "/raijusoibang_1/animations/attack_normal/Wolf_lv1@attack-normal_0.glb"
	);

	const [animSpeed2, setAnimSpeed2] = useState(0.8);

	return (
		<>
			<HorizontalList gutter={5} rowGutter={5} wrap>
				<DashkitButton href="/examples" type="secondary">
					{"< "}EXAMPLES
				</DashkitButton>
				<DashkitButton onClick={() => setControlEnabled(!controlEnabled)}>
					CONTROL ENABLED: {controlEnabled.toString().toUpperCase()}
				</DashkitButton>
				<DashkitButton
					onClick={() => {
						const isPlaying = animation1.current.isRunning();
						if (isPlaying) {
							animation1.current.stop();
							setIsAnimationPlay1(true);
						} else {
							animation1.current.play();
							setIsAnimationPlay1(false);
						}
					}}
				>
					{!isAnimationPlay1 ? "STOP" : "PLAY"} ANIMATION 1
				</DashkitButton>
				<DashkitButton
					onClick={() => setAnimationSrc1(MODEL_BASE_PATH + "/raijusoibang_1/animations/idle/Wolf_lv1@idle.glb")}
				>
					CHANGE ANIMATION ANIMAL #1
				</DashkitButton>

				<DashkitButton onClick={() => setAnimSpeed2(3)}>SPEED UP ANIMAL #2</DashkitButton>
			</HorizontalList>

			<style jsx global>{`
				.player-holder {
					width: 100%;
					max-width: 500px;
					height: 500px;
					border: 1px solid #888;

					&.bg-gray {
						background-color: lightgray;
					}

					&.w-300 {
						max-width: 300px;
					}
				}
			`}</style>

			<HorizontalList wrap style={{ backgroundImage: `url(${asset("/images/backgrounds/training-room-mb.jpg")})` }}>
				<div className="player-holder w-300">
					<Player3D
						className="player-1"
						debug
						controlEnabled
						// zoomEnabled
						fitToViewport
						// scale={200}
						addScale={0.55}
						// rotation={[0, -1.5, 0]}
						src={MODEL_BASE_PATH + "/raijusoibang_1/Wolf_lv1.glb"}
						textureSrc={MODEL_BASE_PATH + "/raijusoibang_1/textures/Wolf_lv1.png"}
						animationSrc={animationSrc1}
						animationOptions={{ loop: "pingpong", timeScale: 0.8 }}
						animationRef={animation1}
					/>
				</div>

				<div className="player-holder bg-gray w-300">
					<Player3D
						debug
						className="player-2"
						fitToViewport
						controlEnabled
						// scale={120}
						addScale={0.7}
						// position={[0, -100, 0]}
						rotation={[0, 1.5, 0]}
						src={MODEL_BASE_PATH + "/raijusoibang_2/Wolf_lv2.glb"}
						textureSrc={MODEL_BASE_PATH + "/raijusoibang_2/textures/wolf.png"}
						animationSrc={MODEL_BASE_PATH + "/raijusoibang_2/animations/attack_normal/Wolf_lv2@Attack-normal_0.glb"}
						animationOptions={{ loop: "pingpong", timeScale: animSpeed2 }}
					/>
				</div>

				<div className="player-holder w-300">
					<Player3D
						className="player-3"
						debug
						fitToViewport
						// controlEnabled={controlEnabled}
						// scale={100}
						addScale={0.85}
						// rotation={[0, -1.5, 0]}
						src={MODEL_BASE_PATH + "/raijusoibang_3/Wolf_lv3.glb"}
						textureSrc={MODEL_BASE_PATH + "/raijusoibang_3/textures/Wolf_lv3.jpg"}
						animationSrc={MODEL_BASE_PATH + "/raijusoibang_3/animations/attack_normal/Wolf_lv3@attack_normal_0.glb"}
						animationOptions={{ loop: "repeat", timeScale: 0.8 }}
					/>
				</div>

				<div className="player-holder w-300 bg-gray">
					<Player3D
						className="player-4"
						fitToViewport
						debug={true}
						// controlEnabled={true}
						// zoomEnabled={true}
						// scale={200}
						// rotation={[0, 0.8, 0]}
						// controlRotation={{ horizontal: -1 }}
						src={MODEL_BASE_PATH + "/hoathin_1/dragon_lv1.glb"}
						textureSrc={MODEL_BASE_PATH + "/hoathin_1/textures/Dragon_lv1.png"}
						animationSrc={MODEL_BASE_PATH + "/hoathin_1/animations/attack_normal/dragon_lv1@attack-normal_0.glb"}
						animationOptions={{ loop: "pingpong", timeScale: 0.8 }}
						// skyboxSrc={asset("/images/textures/skybox/equirectangular/sky_1.png")}
					/>
				</div>
			</HorizontalList>
		</>
	);
};

export default Player3DPage;
