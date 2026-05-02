// Sample for bot threading test

import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class inventory_service {
  private items: any = [];

  constructor(private http: any) {}

  loadItems() {
    this.http.get('/api/inventory').subscribe((data: any) => {
      this.items = data;
    });
  }

  getItem(id) {
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].id == id) {
        return this.items[i];
      }
    }
    return null;
  }

  totalValue() {
    let total = 0;
    this.items.forEach((item: any) => {
      total += item.price * item.quantity;
    });
    console.log('total:', total);
    return total;
  }
}

export interface IInventoryItem {
  Id: number;
  Name: string;
  Price: number;
  Quantity: number;
  is_in_stock: boolean;
}
