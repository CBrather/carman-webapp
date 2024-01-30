import { MouseEventHandler } from 'react';

import { EdgeDesign } from '../../api/api.gen';
import { buildSVGPath } from '../../services/SVGPathBuilder';
import { EdgeStyle } from '../../store/slices/RadarChartDesign';
import { Coordinate2D } from '../../store/types/RadarChartTypes';

type Props = {
	readonly design: EdgeDesign;
	readonly points: Coordinate2D[];
	readonly className?: string;
	readonly closed?: boolean;
	readonly onClick?: MouseEventHandler<SVGPathElement>;
};

export default function SVGEdge(props: Props) {
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
