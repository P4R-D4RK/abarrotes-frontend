import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OrdersService } from '../../../services/orders.service';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css'],
})
export class OrderFormComponent implements OnInit {
  quantity = new FormControl(0, [Validators.required]);

  constructor(
    public dialogRef: MatDialogRef<OrderFormComponent>,
    @Inject(MAT_DIALOG_DATA) public info: any,
    private ordersService: OrdersService
  ) {}

  ngOnInit(): void {
    this.quantity.setValue(this.info.quantity);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  updateOrder() {
    this.ordersService
      .updateOrder(this.info.id, this.quantity.value!)
      .subscribe((res) => {
        if (res) {
          this.dialogRef.close();
          alert('Orden actualizada!');
        }
      });
  }
}
