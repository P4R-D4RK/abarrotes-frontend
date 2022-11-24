import { Product } from './product.interface';
import { Client } from './client.interface';
export interface Order {
    id?: number;
    cart: Date;
    placed: Date;
    quantity: number;
    client: number | Client;
    product: number | Product;
  }
  