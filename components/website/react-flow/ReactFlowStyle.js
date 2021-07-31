const ReactFlowStyle = () => {
	return (
		<>
			<style jsx global>{`
				.react-flow {
					.react-flow__node-default,
					.react-flow__node-input,
					.react-flow__node-output {
						text-align: left;
						border-color: #ececec;
						border-radius: 8px;

						.react-flow__handle {
							background-color: #757575;
							border-color: #757575;
						}
					}
					.react-flow__edge-path {
						stroke-width: 1.5;
					}
				}
			`}</style>
		</>
	);
};

export default ReactFlowStyle;
