import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { LoginResponse } from '../../interfaces/loginResponse.interface';
import { EmployeeService } from 'src/app/services/employees.service';
import { Employee } from 'src/app/interfaces/employee.interface';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from 'src/app/interfaces/user.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  employee: Employee = {
    administrator: false,
    birthday: new Date(),
    education: '',
    email: '',
    firstLastName: '',
    maritalStatus: '',
    name: '',
    password: '',
    rfc: '',
    salary: 0,
    secondLastName: '',
  };

  user: User = {
    role: 'all',
    user: null,
  };

  userFormControl = new FormGroup({
    email: new FormControl('caro@gmail.com', [Validators.required]),
    password: new FormControl('caro123', [Validators.required]),
  });

  constructor(
    private loginService: LoginService,
    private employeeService: EmployeeService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    localStorage.setItem('token', '');
    this.authService.isLoggedIn = false;
  }

  async getUser() {
    const res = await this.authService.logged();
    if (res) {
      this.user = res;
      alert('Bienvenido ' + this.user.user?.name + '!');
    }
  }

  async login() {
    var res: LoginResponse = await this.loginService.login({
      email: this.userFormControl.controls.email.value!,
      password: this.userFormControl.controls.password.value!,
    });

    if (res) {
      localStorage.setItem('token', res.token);
      this.authService.isLoggedIn = true;
      this.getUser();
      this.router.navigateByUrl('home');
    }
  }

  async getEmployee(id: number) {
    this.employee = await this.employeeService.getEmployee(id);
  }
}
