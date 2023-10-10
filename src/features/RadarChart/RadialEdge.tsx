import { MouseEventHandler } from 'react';
import { buildSVGPath } from '../../services/SVGPathBuilder';
import { EdgeDesign, EdgeStyle } from '../../store/slices/RadarChartDesign';
import { Coordinate2D } from '../../store/types/RadarChartTypes';

type RadialEdgeProps = {
	points: Coordinate2D[];
	design: EdgeDesign;
	onClick?: MouseEventHandler<SVGPathElement>;
};

export default function RadialEdge(props: RadialEdgeProps) {
	const { design, points } = props;

	if (!points || points.length === 0) return;

	const path = buildSVGPath(points, false);

	return (
		<path
			strokeDasharray={design.style == EdgeStyle.Dashed ? 5 : 0}
			stroke={design.color}
			strokeWidth={design.thickness}
			className="radar-axis"
			d={path}
			onClick={props.onClick}
		/>
	);
}
