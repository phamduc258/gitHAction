// Sample for bot threading test (partially fixed to test score delta)

import { Injectable, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class InventoryService implements OnDestroy {
  private items: InventoryItem[] = [];
  private sub?: Subscription;

  constructor(private http: any) {}

  loadItems() {
    this.sub = this.http.get('/api/inventory').subscribe((data: InventoryItem[]) => {
      this.items = data;
    });
  }

  getItem(id: number): InventoryItem | null {
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].id === id) {
        return this.items[i];
      }
    }
    return null;
  }

  totalValue(): number {
    let total = 0;
    this.items.forEach((item: InventoryItem) => {
      total += item.price * item.quantity;
    });
    return total;
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}

export interface InventoryItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  isInStock: boolean;
}
