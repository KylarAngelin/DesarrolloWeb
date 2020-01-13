import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-private-products',
  templateUrl: './private-products.component.html',
  styleUrls: ['./private-products.component.css']
})
export class PrivateProductsComponent implements OnInit {

  data = [];

  constructor(
    private productsService: ProductsService,

  ) { }

  ngOnInit() {
    this.productsService.getPrivateProducts()
    .subscribe(
      res => {
        //console.log(res)
        this.data = res
        console.log(this.data)
      },
      err => console.log(err)
    )

  }

}
