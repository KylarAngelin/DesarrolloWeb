import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { CarritoService } from '../../services/carrito.service';
import {Producto} from "../modelos/Producto";
import {Pedido} from "./Pedido";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  data = [];
  dataVisible = [];
  order = [];

  @Input() producto: Producto;
  @Output() addProductoCarrito: EventEmitter<Pedido> = new EventEmitter<Pedido>();



  constructor(
    private productsService: ProductsService,
    private carritoService: CarritoService

  ) { }

  ngOnInit() {
    this.productsService.getProducts()
    .subscribe(
      res => {
        //console.log(res)
        this.data = res
        this.dataVisible = this.data
        console.log(this.data)
      },
      err => console.log(err)
    )
  }

  addProducto(cantidad: number, nombre: string, precio: number, cdisponible: number){

      if(cantidad <= cdisponible){
      cdisponible = cdisponible - cantidad;
      console.log(nombre, cantidad, precio, cdisponible)
      //this.order.push({nombre, cantidad, precio})
      //console.log(this.order)
      this.carritoService.agregarPedido(nombre, cantidad, precio, cdisponible)

    } else {
      alert("No se dispone de unidades suficientes")
    }

  }

  actualizarProductos(event, valor){
    console.log(event, valor);
    this.dataVisible = this.data.filter(p => p.nombre.toLowerCase().indexOf(valor.toLowerCase()) !== -1);
  }

}
