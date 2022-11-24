import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Client } from '../../../interfaces/client.interface';
import { ClientsService } from '../../../services/clients.service';
import { ClientsFormComponent } from '../clients-form/clients-form.component';

@Component({
  selector: 'app-clients-list',
  templateUrl: './clients-list.component.html',
  styleUrls: ['./clients-list.component.css'],
})
export class ClientsListComponent implements OnInit {
  clients: Client[] = [];
  displayedColumns = [
    'name',
    'firstLastName',
    'secondLastName',
    'email',
    'edit',
    'delete',
  ];

  constructor(
    private clientsService: ClientsService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getClients();
  }

  async getClients() {
    this.clients = await this.clientsService.getClients();
  }

  openDialognew(): void {
    const dialogRef = this.dialog.open(ClientsFormComponent, {
      width: '400px',
      data: undefined,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.getClients();
    });
  }

  openDialog(id: number): void {
    const dialogRef = this.dialog.open(ClientsFormComponent, {
      width: '400px',
      data: id,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.getClients();
    });
  }

  deleteClient(id: number) {
    this.clientsService.deleteClient(id).subscribe((res) => {
      alert('Cliente eliminado!');
      this.getClients();
    });
  }
}
