import { createAction } from 'redux-actions'
import { ChartSingleDataPoint, Range } from 'features/charts/models'

export const UPDATE_CHART_RANGE = 'UPDATE_CHART_RANGE';
export const updateChartRange = createAction<Range>(UPDATE_CHART_RANGE)
export type UpdateChartRangeAction = ReturnType<typeof updateChartRange>

export const UPDATE_CHART_DATA = 'UPDATE_CHART_DATA';
export const updateChartData = createAction<ChartSingleDataPoint[]>(UPDATE_CHART_DATA)
export type UpdateChartDataAction = ReturnType<typeof updateChartData>