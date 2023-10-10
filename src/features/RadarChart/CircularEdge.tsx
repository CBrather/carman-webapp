import { buildSVGPath } from '../../services/SVGPathBuilder';
import { EdgeDesign, EdgeStyle } from '../../store/slices/RadarChartDesign';
import { Coordinate2D } from '../../store/types/RadarChartTypes';

type CircularEdgeProps = {
	points: Coordinate2D[];
	design: EdgeDesign;
};

export default function CircularEdge(props: CircularEdgeProps) {
	const { design, points } = props;

	if (!points || points.length === 0) return;

	const path = buildSVGPath(points, true);

	return (
		<path
			strokeDasharray={design.style == EdgeStyle.Dashed ? 5 : 0}
			stroke={design.color}
			strokeWidth={design.thickness}
			d={path}
		/>
	);
}
