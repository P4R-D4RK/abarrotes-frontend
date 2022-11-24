import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeService } from 'src/app/services/employees.service';
import { Employee } from '../../../interfaces/employee.interface';
import { EmployeesFormComponent } from '../employees-form/employees-form.component';

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.css'],
})
export class EmployeesListComponent implements OnInit {
  employees: Employee[] = [];
  displayedColumns = [
    'name',
    'firstLastName',
    'secondLastName',
    'salary',
    'administrator',
    'edit',
    'delete',
  ];

  constructor(
    private employeeService: EmployeeService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getEmployees();
  }

  async getEmployees() {
    this.employees = await this.employeeService.getEmployees();
  }

  openDialognew(): void {
    const dialogRef = this.dialog.open(EmployeesFormComponent, {
      width: '400px',
      data: undefined,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.getEmployees();
    });
  }

  openDialog(id: number): void {
    const dialogRef = this.dialog.open(EmployeesFormComponent, {
      width: '400px',
      data: id,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.getEmployees();
    });
  }

  deleteEmployee(id: number) {
    this.employeeService.deleteEmployee(id).subscribe((res) => {
      alert('Empleado eliminado!');
      this.getEmployees();
    });
  }
}
