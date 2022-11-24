import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product.interface';
import { HttpResponse } from '../interfaces/http-response.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  baseUrl: string = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  async getProducts(): Promise<Product[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });
    const data = await new Promise<Product[]>((resolve, reject) => {
      this.http
        .get<HttpResponse<Product[]>>(`${this.baseUrl}/api/products`, {
          headers: headers,
        })
        .subscribe({
          next: (value) => {
            if (value.error) reject(value.error);
            else if (value.data) resolve(value.data);
          },
          error: (err) => reject(err),
        });
    });
    return data ?? [];
  }

  async getProduct(id: number): Promise<Product> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });
    const data = await new Promise<Product>((resolve, reject) => {
      this.http
        .get<HttpResponse<Product>>(`${this.baseUrl}/api/products/${id}`, {
          headers: headers,
        })
        .subscribe({
          next: (value) => {
            if (value.error) reject(value.error);
            else if (value.data) resolve(value.data);
          },
          error: (err) => reject(err),
        });
    });
    return data ?? [];
  }

  createProduct(product: Product): Observable<Product> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });
    return this.http.post<Product>(`${this.baseUrl}/api/products`, product, {
      headers: headers,
    });
  }

  deleteProduct(id: number): Observable<Product> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });
    return this.http.delete<Product>(`${this.baseUrl}/api/products/${id}`, {
      headers: headers,
    });
  }

  updateProduct(id: number, product: Product): Observable<Product> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });
    return this.http.patch<Product>(
      `${this.baseUrl}/api/products/${id}`,
      product,
      { headers: headers }
    );
  }
}
