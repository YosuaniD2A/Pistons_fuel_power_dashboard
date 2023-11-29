import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseUrl = "localhost:3001/api/dashboard/";

  constructor(private http: HttpClient) { }

  getCollections(): Promise<any>{
    return lastValueFrom(this.http.get<any>(`${this.baseUrl}collections/getAllCollections`));
  }
}
