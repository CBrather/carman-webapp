import { Coordinate2D } from '../store/types/RadarChartTypes';

export function buildSVGPath(points: Coordinate2D[], closed: boolean = false): string {
	let path = `
    M${points[0].x} ${points[0].y} 
    ${points
			.slice(1)
			.map((point) => {
				return `L${point.x} ${point.y}`;
			})
			.join(' ')}
  `;

	if (closed) path += ` L${points[0].x} ${points[0].y}`;

	return path;
}
