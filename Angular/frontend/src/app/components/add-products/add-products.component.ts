import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service'
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.css']
})
export class AddProductsComponent implements OnInit {

  product = {}

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  addProducts(){
    this.authService.addProducts(this.product)
      .subscribe(
        res => {
          console.log(res);
          //localStorage.setItem('token', res.token);
          this.router.navigate(['/products-to-add']);
        },
        err => console.log(err)
      )

  }


}
