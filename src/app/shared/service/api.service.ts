import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getAllCollections(): Promise<any> {
    return lastValueFrom(this.http.get<any>(`${this.baseUrl}/collections/getAllCollections`));
  }

  getCollection(id: number): Promise<any> {
    return lastValueFrom(this.http.get<any>(`${this.baseUrl}/collections/getCollection/${id}`));
  }

  addCollection(data: any): Promise<any> {
    return lastValueFrom(this.http.post<any>(`${this.baseUrl}/collections/addCollection`, data));
  }

  updateCollection(id: number, data: any): Promise<any> {
    return lastValueFrom(this.http.put<any>(`${this.baseUrl}/collections/updateCollection/${id}`, data));
  }

  deleteCollection(id: number): Promise<any> {
    return lastValueFrom(this.http.delete<any>(`${this.baseUrl}/collections/deleteCollection/${id}`));
  }

  getAllMyProducts(id: number): Promise<any> {
    return lastValueFrom(this.http.get<any>(`${this.baseUrl}/collections/getAllMyProducts/${id}`));
  }

  //-------------------- Product section -----------------------------------------

  getAllDiscounts(): Promise<any> {
    return lastValueFrom(this.http.get<any>(`${this.baseUrl}/discounts/getAllDiscounts`));
  }

  addProduct(data: any): Promise<any> {
    return lastValueFrom(this.http.post<any>(`${this.baseUrl}/products/addProduct`, data));
  }

  //-------------------- Variant section -----------------------------------------

  addVariant(data: any): Promise<any> {
    return lastValueFrom(this.http.post<any>(`${this.baseUrl}/variants/addVariant`, data));
  }

  //-------------------- Image section -----------------------------------------

  addImage(data: any): Promise<any> {
    return lastValueFrom(this.http.post<any>(`${this.baseUrl}/images/addImage`, data));
  }

   //-------------------- Relationship Variant-Image section -----------------------------------------

   addRelationshipVariantImage(data: any): Promise<any> {
    return lastValueFrom(this.http.post<any>(`${this.baseUrl}/images/addLinkImage`, data));
  }

}
