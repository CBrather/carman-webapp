import { api } from './api';
const injectedRtkApi = api.injectEndpoints({
	endpoints: (build) => ({
		getChartsDesignsRadarByDesignId: build.query<
			GetChartsDesignsRadarByDesignIdApiResponse,
			GetChartsDesignsRadarByDesignIdApiArg
		>({
			query: (queryArg) => ({ url: `/charts/designs/radar/${queryArg.designId}` })
		}),
		getChartsDesignsRadar: build.query<GetChartsDesignsRadarApiResponse, GetChartsDesignsRadarApiArg>({
			query: () => ({ url: `/charts/designs/radar` })
		}),
		postChartsDesignsRadar: build.mutation<PostChartsDesignsRadarApiResponse, PostChartsDesignsRadarApiArg>({
			query: (queryArg) => ({ url: `/charts/designs/radar`, method: 'POST', body: queryArg.radarChartDesign })
		})
	}),
	overrideExisting: false
});
export { injectedRtkApi as api };
export type GetChartsDesignsRadarByDesignIdApiResponse = /** status 200 A radar chart design */ RadarChartDesign;
export type GetChartsDesignsRadarByDesignIdApiArg = {
	/** The unique identifier of the chart design */
	designId: Id;
};
export type GetChartsDesignsRadarApiResponse = /** status 200 A list of radar chart designs */ {
	items: RadarChartDesign[];
};
export type GetChartsDesignsRadarApiArg = void;
export type PostChartsDesignsRadarApiResponse = /** status 201 A radar chart design */ RadarChartDesign;
export type PostChartsDesignsRadarApiArg = {
	radarChartDesign: RadarChartDesign;
};
export type Id = string;
export type EdgeDesign = {
	color: string;
	style: 'solid' | 'dashed';
	thickness: number;
};
export type RadarChartDesign = {
	id?: Id;
	name: string;
	circularEdges: EdgeDesign;
	outerEdge: EdgeDesign;
	radialEdges: EdgeDesign;
	startingAngle: number;
};
export const {
	useGetChartsDesignsRadarByDesignIdQuery,
	useGetChartsDesignsRadarQuery,
	usePostChartsDesignsRadarMutation
} = injectedRtkApi;
