import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { productsElement } from '../home/home.component';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private items: productsElement[] = [];
  constructor(private http:HttpClient){ }

  findAllProducts()
  {
    return this.http.get(`${environment.baseUrl}products`);
  }

  findProduct(code:any)

  {
    return this.http.get(`${environment.baseUrl}products/${code}`);
  }

  public getItems(): productsElement[] {
    return this.items;
  }
  
  public addProducto(item: productsElement): void {
    this.items.push(item);
  }

  public CountProductsCard() {
   return this.items.length
  }
  
  public clearCart(): void {
    this.items = [];
  }
}
