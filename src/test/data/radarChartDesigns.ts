import { EdgeDesign, RadarChartDesign } from '../../api/api.gen';
import { EdgeStyle } from '../../store/slices/RadarChartDesign';

export const testEdgeDesign: EdgeDesign = {
	color: '#838383',
	style: EdgeStyle.Solid,
	thickness: 1
};

export const testChartDesign: RadarChartDesign = {
	name: 'New Design',
	circularEdges: testEdgeDesign,
	outerEdge: testEdgeDesign,
	radialEdges: testEdgeDesign,
	startingAngle: 0
};
