import { describe, expect, it } from 'vitest';

import { render } from '@testing-library/react';

import { testDataset } from '../../test/data/datasets';
import { testChartDesign } from '../../test/data/radarChartDesigns';
import RadarChartLayout from './Layout';

describe('RadarChartLayout', () => {
	it('renders RadarChartLayout component with respective SVG paths', async () => {
		const { container } = render(<RadarChartLayout datasets={testDataset()} design={testChartDesign} />);

		const axisPaths = container.getElementsByClassName('axis');

		expect(axisPaths.length).toBe(10);
	});
});

describe('calculateCircularEdgesPoints', () => {
	it('returns correct circular edges points', () => {
		// Test case here
	});
});

describe('calculateRadialAxes', () => {
	it('returns correct radial axes', () => {
		// Test case here
	});
});

describe('calculateAxisTicks', () => {
	it('returns correct axis ticks', () => {
		// Test case here
	});
});

describe('degrees2Radians', () => {
	it('converts degrees to radians correctly', () => {
		// Test case here
	});
});
