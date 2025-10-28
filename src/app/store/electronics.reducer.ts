import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { ItemData } from '../models/item.model';
import * as ElectronicsActions from './electronics.actions';

export interface ElectronicsState extends EntityState<ItemData> {
  selectedItemId: string | null;
  loading: boolean;
  error: any;
}

export const electronicsAdapter = createEntityAdapter<ItemData>({
  selectId: (item) => item.id || '',
});

export const initialState: ElectronicsState = electronicsAdapter.getInitialState({
  selectedItemId: null,
  loading: false,
  error: null,
});

export const electronicsReducer = createReducer(
  initialState,
  
  on(ElectronicsActions.loadElectronics, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  
  on(ElectronicsActions.loadElectronicsSuccess, (state, { electronics }) => 
    electronicsAdapter.setAll(electronics, {
      ...state,
      loading: false,
    })
  ),
  
  on(ElectronicsActions.loadElectronicsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  
  on(ElectronicsActions.setSelectedItem, (state, { item }) => ({
    ...state,
    selectedItemId: item?.id || null,
  }))
);