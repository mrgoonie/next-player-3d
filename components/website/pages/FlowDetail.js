import { FlowTools } from "./../react-flow/FlowTools";
import LayoutPage from "@/components/admin/LayoutPage";
import PageHeader from "@/components/dashkit/PageHeader";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import ReactFlow, {
	removeElements,
	addEdge,
	MiniMap,
	Controls,
	Background,
	ReactFlowProvider,
	isEdge,
	isNode,
	getOutgoers,
	getIncomers,
} from "react-flow-renderer";
import { StartIcon, StepIcon } from "../elements/AppIcons";
import ArrowConnection from "../react-flow/ArrowConnection";
import StepContent from "../react-flow/StepContent";
import { useToggle } from "ahooks";
import dayjs from "dayjs";
import ArrowEdge from "../react-flow/ArrowEdge";
import { StepCard } from "../react-flow/StepCard";
import { v4 as uuidv4 } from "uuid";
import { Breadcrumb, Input, Popover } from "antd";
import {
	CaretRightOutlined,
	CheckOutlined,
	EditOutlined,
	HomeOutlined,
	SettingOutlined,
	UserOutlined,
} from "@ant-design/icons";
import { GridList, HorizontalList } from "@/components/diginext/layout/ListLayout";
import DashkitButton, { ButtonType } from "@/components/dashkit/Buttons";
import ButtonBlank from "@/components/diginext/button/ButtonBlank";
import { devices, FlowConfig } from "../react-flow/FlowConfig";

const edgeTypes = {
	arrow: ArrowEdge,
};

const nodeTypes = {
	stepCard: StepCard,
};

const initialElements = [
	{
		id: "start-card",
		type: "stepCard",
		data: {
			type: "input",
			title: "Starting card",
			icon: <StartIcon size={20} />,
			steps: [
				{
					id: uuidv4(),
					sortable: true,
					title: "Go to URL",
					action: "go_to_url",
					selector: {
						by: "",
						value: "",
					},
					value: "",
					next: [],
				},
			],
		},
		position: { x: 0, y: 0 },
	},
];

const getId = () => `step-card-${dayjs().format("YYYY-MM-DD-HH-mm-ss-sss")}`;

let currentTargetId, currentSourceId;

export default function FlowDetail({ user, res, query, params }) {
	// const router = useRouter();
	const { case_slug } = params;
	const reactFlowWrapper = useRef(null);
	const [flow, setFlow] = useState({ id: "", name: "My test case" });
	const [reactFlowInstance, setReactFlowInstance] = useState(null);
	const [elements, setElements] = useState(initialElements);
	const [stepContentVisible, { toggle }] = useToggle();
	const [currentNode, setCurrentNode] = useState();
	const [config, setConfig] = useState(devices[0]);
	const configRef = useRef();
	const flowNameEditorRef = useRef();

	const header = (
		<PageHeader pretitle="modify" title="Your test steps" separator={false} spaceBottom={false}></PageHeader>
	);

	const flowConfig = <FlowConfig onChange={(conf) => setConfig(conf)} />;

	const flowNameEditor = (
		<Input.Search
			defaultValue={flow.name}
			enterButton={<CheckOutlined />}
			onSearch={(val) => {
				console.log(val);
				setFlow({ ...flow, name: val });
			}}
		/>
	);

	const flowTools = (
		<GridList col={2} style={{ padding: "0 6px 0 14px" }} itemAlign="center" itemType="space_between">
			<Breadcrumb>
				<Breadcrumb.Item href="/case">
					<HomeOutlined />
				</Breadcrumb.Item>
				<Breadcrumb.Item href={`/case/${case_slug[0]}`}>
					<span>Project name</span>
				</Breadcrumb.Item>
				<Breadcrumb.Item>
					{flow.name}
					{` `}
					<Popover ref={flowNameEditorRef} trigger="click" title="Edit flow name" content={flowNameEditor}>
						<EditOutlined style={{ verticalAlign: "middle" }} />
					</Popover>
				</Breadcrumb.Item>
			</Breadcrumb>
			<HorizontalList gutter={5} type="end" align="middle">
				<ButtonBlank onClick={() => flowToJSON()}>
					<CheckOutlined />
					{` `}
					<span>Saved draft</span>
				</ButtonBlank>
				<DashkitButton type={ButtonType.LIGHT}>Preview</DashkitButton>
				<DashkitButton>
					<CaretRightOutlined />
					{` `}
					Save & run
				</DashkitButton>
				<Popover
					// style={{ width: "400px" }}
					ref={configRef}
					overlayStyle={{ width: "100%", maxWidth: "300px" }}
					trigger="click"
					placement="bottomRight"
					title={<h3>Flow configuration</h3>}
					content={flowConfig}
				>
					<DashkitButton type={ButtonType.DANGER}>
						<SettingOutlined />
					</DashkitButton>
				</Popover>
			</HorizontalList>
		</GridList>
	);

	const autoArrangeHandler = () => {
		console.log(elements);
	};

	const flowToJSON = () => {
		// console.log(elements);
		// return;
		const steps = [];
		elements.map((stepGroup) => {
			if (isNode(stepGroup)) steps.push(...stepGroup.data.steps);
		});
		// console.log(steps);
		const flowData = {
			...flow,
			config,
			steps,
		};
		console.log(flowData);

		return flowData;
	};

	const onElementsRemove = (elementsToRemove) => setElements((els) => removeElements(elementsToRemove, els));

	const onLoad = (instance) => {
		// console.log("onLoad");
		setReactFlowInstance(instance);
		setTimeout(() => instance.fitView(), 200);
	};

	const onConnect = (params) => {
		// console.log("connected:", params);
		const sourceId = params.source;
		const targetId = params.target;
		const source = _.find(elements, (node) => node.id == sourceId);
		const target = _.find(elements, (node) => node.id == targetId);
		// console.log("connected:", source, "to", target);

		updateNode(source);
		updateNode(target);

		const edgeParams = { ...params, type: "arrow" };
		setElements((els) => addEdge(edgeParams, els));
	};
	const onConnectStart = (e, { nodeId, handleType }) => {
		// console.log("start -> source:", nodeId);
		currentSourceId = nodeId;
	};
	const onConnectStop = (e) => {
		if (currentTargetId) {
			// console.log(`Connect ${currentSourceId} to ${currentTargetId}`);
			onConnect({ source: currentSourceId, target: currentTargetId });
		}
	};
	const onNodeMouseEnter = (e, node) => {
		// console.log("mouse enter:", node);
		currentTargetId = node.id;
	};
	const onNodeMouseLeave = (e, node) => {
		currentTargetId = null;
	};

	const onElementClick = (e, element) => {
		// console.log(e);
		if (isEdge(element)) return;
		if (e.toElement.classList && e.toElement.classList.contains("hit-area")) {
			setCurrentNode(element);
		}
	};

	const connect = ({ source, target, type = "arrow" }) => {
		// {source: "start-card", sourceHandle: null, target: "step-card-2021-07-19-17-25-09-099", targetHandle: null}
		setElements((els) => addEdge({ source, target, type }, els));
	};

	const addNewCard = () => {
		const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
		const position = reactFlowInstance.project({
			x: reactFlowBounds.width / 2,
			y: reactFlowBounds.height / 2,
		});
		const newNode = {
			id: getId(),
			type: "stepCard",
			position,
			// sourcePosition: "right",
			// targetPosition: "left",
			data: {
				type: "default",
				title: "Group of steps",
				icon: <StepIcon size={20} />,
				steps: [],
			},
		};

		setElements((es) => es.concat(newNode));
	};

	const updateNode = (newNode) => {
		const newElements = elements.map((element) => {
			if (isNode(element) && element.id == newNode.id) {
				return newNode;
			} else {
				return element;
			}
		});
		/**
		 * Nếu card đã được nối input -> cập nhật id của step đầu tiên của node [target]
		 * cho "next" step của node [source]:
		 */
		const incomers = getIncomers(newNode, newElements);
		const firstStepNewNode = _.head(newNode.data.steps);
		if (firstStepNewNode && incomers && incomers.length > 0) {
			incomers.map((incomer) => {
				const lastStep = _.last(incomer.data.steps);
				if (lastStep) {
					if (!lastStep.next.includes(firstStepNewNode.id)) lastStep.next.push(firstStepNewNode.id);
				}
			});
		}
		/**
		 * Nếu card đã được nối output -> cập nhật id step đầu tiên của node [target]
		 * cho "next" step cuối cùng của node [source]:
		 */
		const outgoers = getOutgoers(newNode, elements);
		if (outgoers && outgoers.length > 0) {
			outgoers.map((outgoer) => {
				if (outgoer.data.steps.length > 0) {
					const firstTargetStepId = _.head(outgoer.data.steps).id;

					if (newNode.data.steps.length > 0) {
						const lastSourceStep = _.last(newNode.data.steps);
						if (!lastSourceStep.next.includes(firstTargetStepId)) {
							lastSourceStep.next.push(firstTargetStepId);
						}
					}
				}
			});
		}
		// const newNewElements = [...newElements, ...incomers]
		//
		setElements(newElements);
	};

	// show step content when possible;
	useEffect(() => {
		if (currentNode) {
			toggle(true);
		} else {
			toggle(false);
		}
	}, [currentNode]);

	return (
		<LayoutPage user={user} topBarContent={flowTools} fitScreen>
			<ReactFlowProvider>
				<div ref={reactFlowWrapper} style={{ width: "100%", height: "100%" }}>
					<ReactFlow
						elements={elements}
						onElementClick={onElementClick}
						onElementsRemove={onElementsRemove}
						connectionLineComponent={ArrowConnection}
						onConnect={onConnect}
						onConnectStart={onConnectStart}
						onConnectStop={onConnectStop}
						onNodeMouseEnter={onNodeMouseEnter}
						onNodeMouseLeave={onNodeMouseLeave}
						onPaneClick={() => {
							if (configRef.current) configRef.current.close();
							if (flowNameEditorRef.current) flowNameEditorRef.current.close();
						}}
						onLoad={onLoad}
						snapToGrid={true}
						snapGrid={[5, 5]}
						edgeTypes={edgeTypes}
						nodeTypes={nodeTypes}
					>
						{/* <MiniMap
							nodeStrokeColor={(n) => {
								console.log(n.type);
								if (n.style?.background) return n.style.background;
								// if (n.type === "input") return "#0041d0";
								// if (n.type === "output") return "#ff0072";
								// if (n.type === "default") return "#1a192b";
								if (n.type === "stepCard") return "#ff0072";

								return "#eee";
							}}
							nodeColor={(n) => {
								if (n.style?.background) return n.style.background;
                                // if (n.type === "stepCard") return "#0041d0";
								return "#fff";
							}}
							nodeBorderRadius={10}
							nodeStrokeWidth={5}
						/> */}
						<Controls />
						<Background color="#aaa" gap={15} />
					</ReactFlow>
				</div>

				{/* STEP CARD CONTENT - DRAWLER on the LEFT */}
				<StepContent
					// title={currentNode ? currentNode.data.title : ""}
					visible={stepContentVisible}
					data={currentNode}
					onUpdate={(node) => {
						updateNode(node);
					}}
					onClose={() => {
						setCurrentNode(undefined);
					}}
				/>

				{/* FLOW EDIT TOOLS - TOP RIGHT CORNER */}
				<FlowTools onAddClick={() => addNewCard()} onArrangeClick={() => autoArrangeHandler()} />
			</ReactFlowProvider>
		</LayoutPage>
	);
}
