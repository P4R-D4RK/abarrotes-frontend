import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ClientsService } from '../../services/clients.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  clientFormControl = new FormGroup({
    name: new FormControl('', [Validators.required]),
    firstLastName: new FormControl('', [Validators.required]),
    secondLastName: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    birthday: new FormControl<Date | undefined>(undefined, [
      Validators.required,
    ]),
    rfc: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
  });

  constructor(private clientService: ClientsService, private router: Router) {}

  ngOnInit(): void {}

  createClient() {
    if (this.clientFormControl.valid) {
      const value = this.clientFormControl.value;
      this.clientService
        .createClient({
          birthday: value.birthday!,
          email: value.email!,
          firstLastName: value.firstLastName!,
          name: value.name!,
          password: value.password!,
          rfc: value.rfc!,
          secondLastName: value.secondLastName!,
        })
        .subscribe((res) => {
          if (res) {
            alert('Cliente creado!');
            this.router.navigateByUrl('login');
          }
        });
    }
  }
}
