import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/product.interface';
import { ProductService } from '../../../services/product.service';
import { MatDialog } from '@angular/material/dialog';
import { ProductsFormComponent } from '../products-form/products-form.component';
import { FormControl, Validators } from '@angular/forms';
import { User } from 'src/app/interfaces/user.interface';
import { AuthService } from '../../../services/auth.service';
import { OrdersService } from '../../../services/orders.service';
import { Order } from '../../../interfaces/order.interface';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css'],
})
export class ProductsListComponent implements OnInit {
  admin: boolean = false;
  user: User = {
    role: 'all',
    user: null,
  };

  order: Order = {
    cart: new Date(),
    client: 0,
    placed: new Date(),
    product: 0,
    quantity: 0,
  };

  products: Product[] = [];
  displayedColumns = [
    'name',
    'brand',
    'unitPrice',
    'existence',
    'edit',
    'delete',
  ];

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

  quantity = new FormControl<number>(0, [
    Validators.required,
    Validators.min(1),
  ]);

  constructor(
    private productService: ProductService,
    public dialog: MatDialog,
    private authService: AuthService,
    private ordersService: OrdersService
  ) {}

  async ngOnInit() {
    this.getProducts();
    const res = await this.authService.logged();
    if (res) {
      this.user = res;
      if (this.user.role == 'administrator') this.admin = true;
    }
    //console.log(this.user);
    //console.log(this.admin);
  }

  async getProducts() {
    this.products = await this.productService.getProducts();
  }

  openDialognew(): void {
    const dialogRef = this.dialog.open(ProductsFormComponent, {
      width: '400px',
      data: undefined,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.getProducts();
    });
  }

  openDialog(id: number): void {
    const dialogRef = this.dialog.open(ProductsFormComponent, {
      width: '400px',
      data: id,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.getProducts();
    });
  }

  deleteProduct(id: number) {
    //console.log(id)
    this.productService.deleteProduct(id).subscribe((res) => {
      alert('Producto eliminado!');
      this.getProducts();
    });
  }

  async addProduct(id: number) {
    if (!this.quantity.valid) {
      alert('Ingrese una cantidad valida!');
      return;
    }

    this.product = await this.productService.getProduct(id);
    if (this.product.existence < this.quantity.getRawValue()!) {
      alert('Inventario insuficiente');
      this.quantity.setValue(0);
      return;
    }
    this.order = {
      cart: new Date(),
      client: this.user.user?.id!,
      placed: new Date(),
      product: id,
      quantity: this.quantity.getRawValue()!,
    };
    //console.log(this.order)
    this.createOrder();
    alert(
      'Se agregaron ' + this.quantity.getRawValue() + ' ' + this.product.name
    );
    this.quantity.setValue(0);
  }

  createOrder() {
    this.ordersService.createOrder(this.order).subscribe((res) => {
      if (res) {
        //console.log(res)
      }
    });
  }

  async directBuyOrder(id: number) {
    if (!this.quantity.valid) {
      alert('Ingrese una cantidad valida!');
      return;
    }

    this.product = await this.productService.getProduct(id);
    if (this.product.existence < this.quantity.getRawValue()!) {
      alert('Inventario insuficiente');
      this.quantity.setValue(0);
      return;
    }
    this.order = {
      cart: new Date(),
      client: this.user.user?.id!,
      placed: new Date(),
      product: id,
      quantity: this.quantity.getRawValue()!,
    };

    this.ordersService.directBuyOrder(this.order).subscribe((res) => {
      if (res) {
        console.log(res);
      }
    });

    this.quantity.setValue(0);
  }
}
