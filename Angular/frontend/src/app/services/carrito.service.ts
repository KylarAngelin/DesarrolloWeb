import { Injectable } from '@angular/core';
//import { Pedido } from "../components/products/Pedido";

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  //pedidos: Array<Pedido>;
  orders = [];


  constructor() {
    this.orders = [];
   }

   agregarPedido(nombre, cantidad, precio, cdisponible){
    this.orders.push({nombre, cantidad, precio, cdisponible});
    console.log(this.orders)
  }

  pagarPedido(){
    this.orders = [];
  }
}
