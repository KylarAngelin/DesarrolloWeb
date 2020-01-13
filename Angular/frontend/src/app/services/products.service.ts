import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private URL = 'http://localhost:3000/api'

  constructor( private http: HttpClient ) { }

  getProducts(){
    return this.http.get<any>(this.URL + '/products');
  }

  getPrivateProducts(){
    return this.http.get<any>(this.URL + '/private-products');
  }

  payOrder(order){
    console.log(order)
    return this.http.post<any>(this.URL + '/pay-order', order);
  }

}
