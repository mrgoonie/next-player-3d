import React from "react";
import { getBezierPath, getMarkerEnd } from "react-flow-renderer";

export default function ArrowEdge({
	sourceX,
	sourceY,
	sourcePosition,
	targetX,
	targetY,
	targetPosition,
	arrowHeadType = "arrowclosed"
}) {
	const edgePath = getBezierPath({ sourceX, sourceY, sourcePosition, targetX, targetY, targetPosition });
	const markerEnd = getMarkerEnd(arrowHeadType);
	
	return (
		<g>
			<path className="react-flow__edge-path" d={edgePath} markerEnd={markerEnd} />
		</g>
	);
}
