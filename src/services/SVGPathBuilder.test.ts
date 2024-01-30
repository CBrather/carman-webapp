import { describe, it, expect } from 'vitest';
import { buildSVGPath } from './SVGPathBuilder';
import { Coordinate2D } from '../store/types/RadarChartTypes';

describe('SVGPathBuilder', () => {
	it('should build path from first to last point when closed is false', () => {
		const points: Coordinate2D[] = [
			{ x: 0, y: 0 },
			{ x: 1, y: 1 },
			{ x: 2, y: 2 }
		];

		const result = buildSVGPath(points, false);

		expect(result).toBe('\n    M0 0 \n    L1 1 L2 2\n  ');
	});

	it('should build path where the last point connects back to the first when closed is true', () => {
		const points: Coordinate2D[] = [
			{ x: 0, y: 0 },
			{ x: 1, y: 1 },
			{ x: 2, y: 2 }
		];

		const result = buildSVGPath(points, true);

		expect(result).toBe('\n    M0 0 \n    L1 1 L2 2\n   L0 0');
	});
});
