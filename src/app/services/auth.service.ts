import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SERVER_PATH } from '../constants/endopoints.constant';
import { User } from '../interfaces/user.interface';
import { HttpResponse } from '../interfaces/http-response.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
  isLoggedIn = false;

  isAuthenticadted() {
    return this.isLoggedIn;
  }

  async logged(): Promise<User | null> {
    return new Promise<any>(async (resolve, reject) => {
      this.http
        .get<HttpResponse<User>>(`${SERVER_PATH}/api/auth/logged`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        .subscribe({
          next: (res) => {
            if (res.error) reject(null);
            else resolve(res.data!);
          },
          error: (err) => {
            reject(err);
          },
        });
    });
  }
}
