import { Injectable } from '@angular/core';
import { HttpResponse } from '../interfaces/http-response.interface';
import { Login } from '../interfaces/login.interface';
import { LoginResponse } from '../interfaces/loginResponse.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  baseUrl: string = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  async login(login: Login): Promise<LoginResponse> {
    const data = await new Promise<LoginResponse>((resolve, reject) => {
      this.http
        .post<HttpResponse<LoginResponse>>(
          `${this.baseUrl}/api/auth/log-in`,
          login
        )
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
}
