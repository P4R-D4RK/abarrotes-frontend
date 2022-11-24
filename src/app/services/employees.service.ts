import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpResponse } from '../interfaces/http-response.interface';
import { Employee } from '../interfaces/employee.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  baseUrl: string = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  async getEmployees(): Promise<Employee[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });
    const data = await new Promise<Employee[]>((resolve, reject) => {
      this.http
        .get<HttpResponse<Employee[]>>(`${this.baseUrl}/api/employees`, {
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

  async getEmployee(id: number): Promise<Employee> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });
    const data = await new Promise<Employee>((resolve, reject) => {
      this.http
        .get<HttpResponse<Employee>>(`${this.baseUrl}/api/employees/${id}`, {
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

  createEmployee(employee: Employee): Observable<Employee> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });
    return this.http.post<Employee>(`${this.baseUrl}/api/employees`, employee, {
      headers: headers,
    });
  }

  deleteEmployee(id: number): Observable<Employee> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });
    return this.http.delete<Employee>(`${this.baseUrl}/api/employees/${id}`, {
      headers: headers,
    });
  }

  updateEmployee(id: number, employee: Employee): Observable<Employee> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });
    return this.http.patch<Employee>(
      `${this.baseUrl}/api/employees/${id}`,
      employee,
      {
        headers: headers,
      }
    );
  }
}
