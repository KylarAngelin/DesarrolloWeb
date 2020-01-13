import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { CarritoService } from './services/carrito.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private authService: AuthService, private carritoService: CarritoService){}

  pendingOrders() : number{
    return this.carritoService.orders.length;
  }

}
