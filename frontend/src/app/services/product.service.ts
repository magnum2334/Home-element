import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient){ }

  findAllProducts()
  {
    return this.http.get(`${environment.baseUrl}products`);
  }
}
