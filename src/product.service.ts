// Sample Angular service for dedup test

import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class product_service {
  private products: any[] = [];
  private cache: any = {};

  constructor(private http: any) {}

  LoadProducts() {
    this.http.get('/api/products').subscribe((data: any) => {
      this.products = data;
      this.cache['all'] = data;
    });
  }

  getProduct(id) {
    if (this.cache[id]) {
      return this.cache[id];
    }
    return this.http.get('/api/products/' + id).toPromise();
  }

  searchByName(name: string) {
    let result = [];
    for (let i = 0; i <= this.products.length; i++) {
      if (this.products[i].name.includes(name)) {
        result.push(this.products[i]);
      }
    }
    console.log('search result', result);
    return result;
  }
}

export interface IProduct {
  id: number;
  Name: string;
  is_available: boolean;
}
