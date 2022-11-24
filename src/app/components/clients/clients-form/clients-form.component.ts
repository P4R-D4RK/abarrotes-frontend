import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ClientsService } from '../../../services/clients.service';
import { Client } from '../../../interfaces/client.interface';

@Component({
  selector: 'app-clients-form',
  templateUrl: './clients-form.component.html',
  styleUrls: ['./clients-form.component.css'],
})
export class ClientsFormComponent implements OnInit {
  client: Client = {
    birthday: new Date(),
    email: '',
    firstLastName: '',
    name: '',
    password: '',
    rfc: '',
    secondLastName: '',
  };

  clientFormControl = new FormGroup({
    name: new FormControl('', [Validators.required]),
    firstLastName: new FormControl('', [Validators.required]),
    secondLastName: new FormControl('', [Validators.required]),
    birthday: new FormControl<Date | undefined>(undefined, [
      Validators.required,
    ]),
    rfc: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  newClient: boolean = false;

  constructor(
    private clientService: ClientsService,
    public dialogRef: MatDialogRef<ClientsFormComponent>,
    @Inject(MAT_DIALOG_DATA) public id: number
  ) {}

  ngOnInit(): void {
    if (this.id == null) {
      this.newClient = true;
    } else {
      this.getClient(this.id);
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  async getClient(id: number) {
    this.client = await this.clientService.getClient(id);
    this.clientFormControl.setValue({
      birthday: this.client.birthday,
      email: this.client.email,
      firstLastName: this.client.firstLastName,
      name: this.client.name,
      password: '',
      rfc: this.client.rfc,
      secondLastName: this.client.secondLastName,
    });
  }

  submitClient() {
    if (this.clientFormControl.valid) {
      //console.log(this.clientFormControl.value)
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
            this.dialogRef.close();
            alert('Cliente creado!');
          }
        });
    }
  }

  updateClient() {
    this.clientService
      .updateClient(this.id, {
        birthday: this.clientFormControl.controls.birthday.value!,
        email: this.clientFormControl.controls.email.value!,
        firstLastName: this.clientFormControl.controls.firstLastName.value!,
        name: this.clientFormControl.controls.name.value!,
        password: this.clientFormControl.controls.password.value!,
        rfc: this.clientFormControl.controls.rfc.value!,
        secondLastName: this.clientFormControl.controls.secondLastName.value!,
      })
      .subscribe((res) => {
        if (res) {
          this.dialogRef.close();
          alert('Cliente actualizado!');
        }
      });
  }
}
