import { Component, inject, TemplateRef, ViewChild } from '@angular/core';
import { AgGridModule } from 'ag-grid-angular';
import { ModuleRegistry, AllCommunityModule, RowClickedEvent } from 'ag-grid-community';
import { ElectronicsService } from './services/electronics.service';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { CommonModule } from '@angular/common';
import { ExportService } from './services/export.service';
import { NgbModule, NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as ElectronicsActions from './store/electronics.actions';
import * as ElectronicsSelectors from './store/electronics.selectors';

// Register all community modules
ModuleRegistry.registerModules([AllCommunityModule]);
interface ItemData {
  // Define your item properties
  name?: string;
  brand?: string;
  category?: string;
  color?: string;
  releaseYear?: number;
  modelNumber?: string;
  id?: string;
  price?: number;
  rating?: number;
  stock?: number;
  warranty?: string;
}

@Component({
  selector: 'app-root',
  imports: [CommonModule, AgGridModule, NavBarComponent, NgbModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private store = inject(Store);
  selectedExportType: 'json' | 'excel' | 'csv' | 'txt' = 'json'; // Type-safe export format
  electronics$ = this.store.select(ElectronicsSelectors.selectAllElectronics);
  selectedItem$ = this.store.select(ElectronicsSelectors.selectSelectedItem);
  loading$ = this.store.select(ElectronicsSelectors.selectElectronicsLoading);

  exportItem() {
    this.selectedItem$
      .subscribe((item) => {
        if (!item) {
          console.warn('No item selected for export');
          return;
        }

        this.store.dispatch(
          ElectronicsActions.exportItem({
            item,
            format: this.selectedExportType,
          })
        );
      })
      .unsubscribe();
  }
  private offcanvasService = inject(NgbOffcanvas);

  @ViewChild('content') offcanvasContent!: TemplateRef<any>;
  isBrowser = false;
  rowData: any[] = [];
  selectedItem: any = null;
  rowSelection = {
    mode: 'singleRow',
  };

  columnDefs = [
    { headerName: 'Category', field: 'category', sortable: true, filter: true, flex: 1 },
    { headerName: 'Brand', field: 'brand', sortable: true, filter: true, flex: 1 },
    { headerName: 'Color', field: 'color', sortable: true, filter: true, flex: 1 },
    { headerName: 'Release Year', field: 'releaseYear', sortable: true, filter: true, flex: 1 },
    //{ headerName: 'Model Number', field: 'modelNumber', sortable: true, filter: true, flex: 1 },
    //{ headerName: 'Id', field: 'id', sortable: true, filter: true, flex: 1 },
    //{ headerName: 'Name', field: 'name', sortable: true, filter: true, flex: 1 },
    //{ headerName: 'Price', field: 'price', sortable: true, filter: 'agNumberColumnFilter', flex: 1 },
    //{ headerName: 'Rating', field: 'rating', sortable: true, filter: true, flex: 1 },
    //{ headerName: 'Stock', field: 'stock', sortable: true, filter: 'agNumberColumnFilter', flex: 1 },
    //{ headerName: 'Warranty', field: 'warranty', sortable: true, filter: true, flex: 1 },
    {
      headerName: 'Actions',
      cellRenderer: this.actionCellRenderer.bind(this),
      onCellClicked: (params: any) => {
        // prevent triggering row click
        params.event.stopPropagation();

        // perform your action
        console.log('Export clicked:', params.data);
      },
      flex: 1,
    },
  ];

  constructor(private exportService: ExportService) {}

  ngOnInit() {
    this.store.dispatch(ElectronicsActions.loadElectronics());
    this.electronics$.subscribe((electronics) => {
      this.rowData = electronics;
    });
    this.isBrowser = typeof window !== 'undefined';
  }

  actionCellRenderer(params: any) {
    const div = document.createElement('div');
    div.innerHTML = `
      <button class="btn btn-sm btn-primary me-1" data-action="json">JSON</button>
      <button class="btn btn-sm btn-success me-1" data-action="xlsx">XLSX</button>
      <button class="btn btn-sm btn-warning me-1" data-action="csv">CSV</button>
      <button class="btn btn-sm btn-secondary" data-action="txt">TXT</button>
    `;
    div.addEventListener('click', (event: any) => {
      event.stopPropagation(); // Stop event from bubbling up to the row
      const action = event.target.closest('button')?.dataset.action;
      if (!action) return;
      switch (action) {
        case 'json':
          this.exportService.exportToJson([params.data], `${params.data.name}.json`);
          break;
        case 'xlsx':
          this.exportService.exportToExcel([params.data], `${params.data.name}.xlsx`);
          break;
        case 'csv':
          this.exportService.exportToCsv([params.data], `${params.data.name}.csv`);
          break;
        case 'txt':
          this.exportService.exportToText([params.data], `${params.data.name}.txt`);
          break;
      }
    });
    return div;
  }

  onRowClicked(event: RowClickedEvent<ItemData>): void {
    this.store.dispatch(
      ElectronicsActions.setSelectedItem({
        item: event.data || null,
      })
    );
    this.openCustomPanelClass(this.offcanvasContent);
  }

  openCustomPanelClass(content: TemplateRef<any>) {
    this.offcanvasService.open(content, {
      panelClass: 'custom-offcanvas bg-dark text-light',
      position: 'end',
    });
  }
}
