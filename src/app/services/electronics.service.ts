import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ElectronicsItem {
  name: string;
  brand: string;
  category: string;
  price: number;
  stock: number;
  image?: string; // optional
}

@Injectable({
  providedIn: 'root', // singleton service
})
export class ElectronicsService {

isBrowser = false;

  private dataUrl = 'assets/data/electronics.json'; // path to your JSON file

  constructor(private http: HttpClient) {}

  // Fetch all electronics
  getElectronics(): Observable<ElectronicsItem[]> {
    return this.http.get<ElectronicsItem[]>(this.dataUrl);
  }

  // Optional: fetch a single electronic by name
  getElectronicByName(name: string): Observable<ElectronicsItem | undefined> {
    return new Observable(observer => {
      this.getElectronics().subscribe(items => {
        const item = items.find(i => i.name === name);
        observer.next(item);
        observer.complete();
      });
    });
  }
}
