import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { Product } from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  http = inject(HttpClient);

  public add(product: Partial<Product>): Observable<Product> {
    return this.http.post<Product>(`${environment.baseUrl}products/add`, product);
  }
}
