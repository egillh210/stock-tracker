import { createAction } from 'redux-actions'
import { KeyStats } from '../models/keyStats'

export const UPDATE_KEY_STATS = 'UPDATE_KEY_STATS';
export const updateKeyStats = createAction<KeyStats>(UPDATE_KEY_STATS)
export type UpdateKeyStatsAction = ReturnType<typeof updateKeyStats>