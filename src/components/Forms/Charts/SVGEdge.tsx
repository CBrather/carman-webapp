import { MouseEventHandler } from 'react';
import { buildSVGPath } from '../../../services/SVGPathBuilder';
import { EdgeDesign, EdgeStyle } from '../../../store/slices/RadarChartDesign';
import { Coordinate2D } from '../../../store/types/RadarChartTypes';

type SVGEdgeProps = {
	design: EdgeDesign;
	points: Coordinate2D[];
	className?: string;
	closed?: boolean;
	onClick?: MouseEventHandler<SVGPathElement>;
};

export default function SVGEdge(props: SVGEdgeProps) {
	const { design, points } = props;

	if (!points || points.length === 0) return;

	const path = buildSVGPath(points, !!props.closed);

	return (
		<path
			className={props.className ?? ''}
			strokeDasharray={design.style == EdgeStyle.Dashed ? 5 : 0}
			stroke={design.color}
			strokeWidth={design.thickness}
			d={path}
			onClick={props.onClick}
		/>
	);
}
