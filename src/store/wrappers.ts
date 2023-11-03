import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { AnyAction, CombinedState, Dispatch, EmptyObject, ThunkDispatch, createAsyncThunk } from '@reduxjs/toolkit';
import { Auth0Client } from '@auth0/auth0-spa-js';
import { ChartDesignState, SLICE_NAME as CHART_DESIGN_SLICE_NAME } from './slices/RadarChartDesign';
import { DataSetState, SLICE_NAME as DATA_SET_SLICE_NAME } from './slices/DataSet';

type DispatchFunc = () => AppDispatch;

// Re-exported variants of the standard hooks with typing based on our actual store
export const useAppDispatch: DispatchFunc = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export type ThunkExtra = {
	authClient: Auth0Client;
};

export const createAppAsyncThunk = createAsyncThunk.withTypes<{ extra: ThunkExtra; rejectValue: string }>();

export type RootState = EmptyObject & {
	[DATA_SET_SLICE_NAME]: DataSetState;
	[CHART_DESIGN_SLICE_NAME]: ChartDesignState;
};

export type AppDispatch = ThunkDispatch<CombinedState<RootState>, ThunkExtra, AnyAction> & Dispatch<AnyAction>;
