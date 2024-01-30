import { describe, expect, it, vi } from 'vitest';

import { fireEvent, render, screen, within } from '@testing-library/react';

import { RadarChartDesign } from '../../api/api.gen';
import { testChartDesign } from '../../test/data/radarChartDesigns';
import ChartConfigForm from './ChartConfigForm';

describe('ChartConfigForm', () => {
	it('calls onChange with changed name value', async () => {
		let changedDesign: RadarChartDesign | undefined;
		render(
			<ChartConfigForm
				defaultDesign={testChartDesign}
				onChange={(chartDesign: RadarChartDesign) => {
					changedDesign = chartDesign;
				}}
				onSubmit={async () => testChartDesign}
			/>
		);

		const designNameInput = await screen.findByDisplayValue('New Design');
		fireEvent.change(designNameInput, { target: { value: 'Changed Design' } });

		expect(changedDesign?.name).toBe('Changed Design');
	});

	it('calls onChange with changed circularEdges value', async () => {
		let changedDesign: RadarChartDesign | undefined;
		render(
			<ChartConfigForm
				defaultDesign={testChartDesign}
				onChange={(chartDesign: RadarChartDesign) => {
					changedDesign = chartDesign;
				}}
				onSubmit={async () => testChartDesign}
			/>
		);

		const circularEdgesInput = await screen.findByTestId('Circular Edges');
		const thicknessInput = await within(circularEdgesInput).findByRole('spinbutton');
		fireEvent.change(thicknessInput, { target: { value: 5 } });

		expect(changedDesign?.circularEdges.thickness).toBe(5);
	});

	it('calls onSubmit when save button is clicked', async () => {
		const onSubmit = vi.fn(async () => testChartDesign);
		render(<ChartConfigForm defaultDesign={testChartDesign} onChange={() => {}} onSubmit={onSubmit} />);

		const saveButton = await screen.findByRole('button', { name: 'Save' });
		fireEvent.click(saveButton);

		expect(onSubmit).toHaveBeenCalledOnce();
	});
});
