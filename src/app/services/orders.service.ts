import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpResponse } from '../interfaces/http-response.interface';
import { Order } from '../interfaces/order.interface';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  baseUrl: string = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  async getOrders(): Promise<Order[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });
    const data = await new Promise<Order[]>((resolve, reject) => {
      this.http
        .get<HttpResponse<Order[]>>(`${this.baseUrl}/api/orders/cart`, {
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

  createOrder(order: Order): Observable<Order> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });
    return this.http.post<Order>(`${this.baseUrl}/api/orders/cart`, order, {
      headers: headers,
    });
  }
  
  buyOrder(id: number): Observable<Order> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });
    return this.http.patch<Order>(`${this.baseUrl}/api/orders/buy/${id}`, undefined, {
      headers: headers,
    });
  }
  
  directBuyOrder(order: Order): Observable<Order> {
    console.log('AAAAAA',order)
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });
    return this.http.post<Order>(`${this.baseUrl}/api/orders/buy`, order, {
      headers: headers,
    });
  }
  
  deleteOrder(id: number): Observable<Order> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });
    return this.http.delete<Order>(`${this.baseUrl}/api/orders/${id}`, {
      headers: headers,
    });
  }
  
  updateOrder(id: number, quantity: number): Observable<Order> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });
    return this.http.patch<Order>(
      `${this.baseUrl}/api/orders/${id}`,{
      quantity},
      { headers: headers }
    );
  }

}
