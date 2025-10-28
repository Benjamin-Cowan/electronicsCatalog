import { createAction, props } from '@ngrx/store';
import { ItemData } from '../models/item.model';

export const loadElectronics = createAction(
  '[Electronics] Load Electronics'
);

export const loadElectronicsSuccess = createAction(
  '[Electronics] Load Electronics Success',
  props<{ electronics: ItemData[] }>()
);

export const loadElectronicsFailure = createAction(
  '[Electronics] Load Electronics Failure',
  props<{ error: any }>()
);

export const setSelectedItem = createAction(
  '[Electronics] Set Selected Item',
  props<{ item: ItemData | null }>()
);

export const exportItem = createAction(
  '[Electronics] Export Item',
  props<{ item: ItemData; format: 'json' | 'excel' | 'csv' | 'txt' }>()
);

export const exportItemSuccess = createAction(
  '[Electronics] Export Item Success'
);

export const exportItemFailure = createAction(
  '[Electronics] Export Item Failure',
  props<{ error: any }>()
);