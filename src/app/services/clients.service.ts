import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpResponse } from '../interfaces/http-response.interface';
import { Employee } from '../interfaces/employee.interface';
import { Observable } from 'rxjs';
import { Client } from '../interfaces/client.interface';

@Injectable({
  providedIn: 'root',
})
export class ClientsService {
  baseUrl: string = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  async getClients(): Promise<Client[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });
    const data = await new Promise<Client[]>((resolve, reject) => {
      this.http
        .get<HttpResponse<Client[]>>(`${this.baseUrl}/api/clients`, {
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

  async getClient(id: number): Promise<Client> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });
    const data = await new Promise<Client>((resolve, reject) => {
      this.http
        .get<HttpResponse<Employee>>(`${this.baseUrl}/api/clients/${id}`, {
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

  createClient(client: Client): Observable<Client> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });
    return this.http.post<Client>(`${this.baseUrl}/api/clients`, client, {
      headers: headers,
    });
  }

  deleteClient(id: number): Observable<Client> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });
    return this.http.delete<Client>(`${this.baseUrl}/api/clients/${id}`, {
      headers: headers,
    });
  }

  updateClient(id: number, client: Client): Observable<Client> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });
    return this.http.patch<Client>(
      `${this.baseUrl}/api/clients/${id}`,
      client,
      {
        headers: headers,
      }
    );
  }
}
