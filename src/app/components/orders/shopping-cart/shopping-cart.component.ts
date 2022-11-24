import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../../../services/orders.service';
import { Order } from '../../../interfaces/order.interface';
import { Product } from 'src/app/interfaces/product.interface';
import { MatDialog } from '@angular/material/dialog';
import { OrderFormComponent } from '../order-form/order-form.component';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css'],
})
export class ShoppingCartComponent implements OnInit {
  orders: Order[] = [];

  product: Product = {
    name: '',
    description: '',
    presentation: '',
    expiration: new Date(),
    providerPrice: 0,
    unitPrice: 0,
    existence: 0,
    date: new Date(),
    brand: '',
  };

  displayedColumns = [
    'product',
    'quantity',
    'price',
    'amount',
    'edit',
    'delete',
  ];

  total: number = 0;

  constructor(
    private ordersService: OrdersService,
    private dialog: MatDialog
  ) {}

  async ngOnInit() {
    await this.getOrders();
  }

  async getOrders() {
    this.orders = await this.ordersService.getOrders();
    this.orders.forEach((order) => {
      let product = order.product as Product;
      this.total += order.quantity * product.unitPrice;
    });
  }

  buyShoppingCart() {
    if (this.orders.length == 0) {
      alert('Carrito vacío, agrega productos!');
    }
    this.orders.forEach((order) => {
      console.log(order.id);
      this.ordersService.buyOrder(order.id!).subscribe((res) => {
        if (res) {
          console.log(res);
        }
      });
    });
  }

  deleteOrder(id: number) {
    //console.log(id)
    this.ordersService.deleteOrder(id).subscribe((res) => {
      alert('Orden eliminada!');
      this.total = 0;
      this.getOrders();
    });
  }

  openDialog(id: number, quantity: number): void {
    const dialogRef = this.dialog.open(OrderFormComponent, {
      width: '400px',
      data: { id, quantity },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.total = 0;
      this.getOrders();
    });
  }
}
