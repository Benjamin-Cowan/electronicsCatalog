import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class ExportService {

  // ✅ Export as JSON
  exportToJson(data: any[], filename: string): void {
    const blob = new Blob(
      [JSON.stringify(this.excludeImages(data), null, 2)],
      { type: 'application/json;charset=utf-8' }
    );
    saveAs(blob, filename.endsWith('.json') ? filename : `${filename}.json`);
  }

  // ✅ Export as Excel (.xlsx)
  exportToExcel(data: any[], filename: string): void {
    const worksheet = XLSX.utils.json_to_sheet(this.excludeImages(data));
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Electronics');
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(blob, filename.endsWith('.xlsx') ? filename : `${filename}.xlsx`);
  }

  // ✅ Export as CSV
  exportToCsv(data: any[], filename: string): void {
    const worksheet = XLSX.utils.json_to_sheet(this.excludeImages(data));
    const csvOutput = XLSX.utils.sheet_to_csv(worksheet);
    const blob = new Blob([csvOutput], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, filename.endsWith('.csv') ? filename : `${filename}.csv`);
  }

  // ✅ Export as Text file
  exportToText(data: any[], filename: string): void {
    const text = this.excludeImages(data)
      .map(item => Object.values(item).join('\t'))
      .join('\n');
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    saveAs(blob, filename.endsWith('.txt') ? filename : `${filename}.txt`);
  }

  // 🧹 Helper: remove image URLs from objects
  private excludeImages(data: any[]): any[] {
    return data.map(({ image, imageUrl, ...rest }) => rest);
  }
}
