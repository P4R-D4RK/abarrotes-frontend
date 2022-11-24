import { Employee } from 'src/app/interfaces/employee.interface';
import { Client } from './client.interface';
export interface User {
  role: 'administrator' | 'employee' | 'client' | 'all';
  user: Employee | Client | null;
}
