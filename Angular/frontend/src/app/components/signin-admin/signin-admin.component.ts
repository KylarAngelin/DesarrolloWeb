import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service'
import {Router} from '@angular/router';


@Component({
  selector: 'app-signin-admin',
  templateUrl: './signin-admin.component.html',
  styleUrls: ['./signin-admin.component.css']
})
export class SigninAdminComponent implements OnInit {


    userAdmin = {}

    constructor(
      private authService: AuthService,
      private router: Router
    ) { }

    ngOnInit() {
    }

    signInAdmin(){
      this.authService.signinAdmin(this.userAdmin)
        .subscribe(
          res => {
            console.log(res);
            localStorage.setItem('token', res.token);
            this.router.navigate(['/products-to-add']);
          },
          err => console.log(err)
        )

    }


}
