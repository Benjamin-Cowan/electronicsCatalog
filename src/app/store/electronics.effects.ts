import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError, tap } from 'rxjs/operators';
import { ElectronicsService } from '../services/electronics.service';
import { ExportService } from '../services/export.service';
import * as ElectronicsActions from './electronics.actions';
import { ItemData } from '../models/item.model';

@Injectable()
export class ElectronicsEffects {
  private actions$ = inject(Actions);
  private electronicsService = inject(ElectronicsService);
  private exportService = inject(ExportService);

  loadElectronics$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ElectronicsActions.loadElectronics),
      mergeMap(() =>
        this.electronicsService.getElectronics().pipe(
          map((electronics: ItemData[]) =>
            ElectronicsActions.loadElectronicsSuccess({ electronics })
          ),
          catchError((error) =>
            of(ElectronicsActions.loadElectronicsFailure({ error }))
          )
        )
      )
    )
  );

  exportItem$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ElectronicsActions.exportItem),
      tap(({ item, format }) => {
        switch (format) {
          case 'json':
            this.exportService.exportToJson([item], `${item.name}.json`);
            break;
          case 'excel':
            this.exportService.exportToExcel([item], `${item.name}.xlsx`);
            break;
          case 'csv':
            this.exportService.exportToCsv([item], `${item.name}.csv`);
            break;
          case 'txt':
            this.exportService.exportToText([item], `${item.name}.txt`);
            break;
        }
      }),
      map(() => ElectronicsActions.exportItemSuccess()),
      catchError((error) => of(ElectronicsActions.exportItemFailure({ error })))
    )
  );
}