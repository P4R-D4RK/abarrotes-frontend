import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Employee } from '../../../interfaces/employee.interface';
import { EmployeeService } from '../../../services/employees.service';

@Component({
  selector: 'app-employees-form',
  templateUrl: './employees-form.component.html',
  styleUrls: ['./employees-form.component.css'],
})
export class EmployeesFormComponent implements OnInit {
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

  employeeFormControl = new FormGroup({
    name: new FormControl('', [Validators.required]),
    firstLastName: new FormControl('', [Validators.required]),
    secondLastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    birthday: new FormControl<Date | undefined>(undefined, [
      Validators.required,
    ]),
    rfc: new FormControl('', [Validators.required]),
    salary: new FormControl(0, [Validators.required]),
    maritalStatus: new FormControl('', [Validators.required]),
    education: new FormControl('', [Validators.required]),
    administrator: new FormControl<boolean>(false, [Validators.required]),
  });

  newEmployee: boolean = false;

  constructor(
    private employeeService: EmployeeService,
    public dialogRef: MatDialogRef<EmployeesFormComponent>,
    @Inject(MAT_DIALOG_DATA) public id: number
  ) {}

  ngOnInit(): void {
    if (this.id == null) {
      this.newEmployee = true;
    } else {
      this.getEmployee(this.id);
    }
    // console.log(this.newEmployee)
    // console.log(this.id)
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  async getEmployee(id: number) {
    this.employee = await this.employeeService.getEmployee(id);
    this.employeeFormControl.setValue({
      administrator: this.employee.administrator,
      birthday: this.employee.birthday,
      education: this.employee.education,
      email: this.employee.email,
      firstLastName: this.employee.firstLastName,
      maritalStatus: this.employee.maritalStatus,
      name: this.employee.name,
      password: '',
      rfc: this.employee.rfc,
      salary: this.employee.salary,
      secondLastName: this.employee.secondLastName,
    });
  }

  submitEmployee() {
    if (this.employeeFormControl.valid) {
      //console.log(this.employeeFormControl.value)
      const value = this.employeeFormControl.value;
      this.employeeService
        .createEmployee({
          administrator: value.administrator!,
          birthday: value.birthday!,
          education: value.education!,
          email: value.email!,
          firstLastName: value.firstLastName!,
          maritalStatus: value.maritalStatus!,
          name: value.name!,
          password: value.password!,
          rfc: value.rfc!,
          salary: value.salary!,
          secondLastName: value.secondLastName!,
        })
        .subscribe((res) => {
          if (res) {
            this.dialogRef.close();
            alert('Empleado creado!');
          }
        });
    }
  }

  updateEmployee() {
    this.employeeService
      .updateEmployee(this.id, {
        administrator: this.employeeFormControl.controls.administrator.value!,
        birthday: this.employeeFormControl.controls.birthday.value!,
        education: this.employeeFormControl.controls.education.value!,
        email: this.employeeFormControl.controls.email.value!,
        firstLastName: this.employeeFormControl.controls.firstLastName.value!,
        maritalStatus: this.employeeFormControl.controls.maritalStatus.value!,
        name: this.employeeFormControl.controls.name.value!,
        password: this.employeeFormControl.controls.password.value!,
        rfc: this.employeeFormControl.controls.rfc.value!,
        salary: this.employeeFormControl.controls.salary.value!,
        secondLastName: this.employeeFormControl.controls.secondLastName.value!,
      })
      .subscribe((res) => {
        if (res) {
          this.dialogRef.close();
          alert('Empleado actualizado!');
        }
      });
  }
}
