import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy  } from '@angular/core';
import {Router} from '@angular/router';
import { CarritoService } from '../../services/carrito.service';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {

  carritoService: CarritoService;

  constructor(
    private productsService: ProductsService,
    private router: Router,
    carritoService: CarritoService

  ) { this.carritoService = carritoService }

  ngOnInit() {

  }

  pendingOrders(){
      var total: number = 0.0;
      this.carritoService.orders.forEach((orders)=>{
        total += orders.cantidad * orders.precio;
        console.log(total)
      });
      return total;
  }

  pagar(){
    this.productsService.payOrder(this.carritoService.orders)
    .subscribe(
      res =>{
        console.log(res);
        this.router.navigate(['/products']);
      },
      err => console.log(err)
    )
    this.carritoService.pagarPedido();

  }


}
