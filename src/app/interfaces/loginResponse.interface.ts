export interface LoginResponse {
  role: 'administrator' | 'employee' | 'client';
  id: number;
  token: string;
}
