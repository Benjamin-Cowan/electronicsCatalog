import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ElectronicsState, electronicsAdapter } from './electronics.reducer';

export const selectElectronicsState = createFeatureSelector<ElectronicsState>('electronics');

const { selectAll, selectEntities } = electronicsAdapter.getSelectors();

export const selectAllElectronics = createSelector(
  selectElectronicsState,
  selectAll
);

export const selectElectronicsEntities = createSelector(
  selectElectronicsState,
  selectEntities
);

export const selectSelectedItemId = createSelector(
  selectElectronicsState,
  (state) => state.selectedItemId
);

export const selectSelectedItem = createSelector(
  selectElectronicsEntities,
  selectSelectedItemId,
  (entities, selectedId) => selectedId ? entities[selectedId] : null
);

export const selectElectronicsLoading = createSelector(
  selectElectronicsState,
  (state) => state.loading
);

export const selectElectronicsError = createSelector(
  selectElectronicsState,
  (state) => state.error
);