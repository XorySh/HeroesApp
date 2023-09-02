import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styles: [
  ]
})
export class LoginPageComponent {
  hide = true;

  constructor(
    private authService: AuthService,
    private router: Router,
  ){}

  onLogin():void {
    this.authService.login('melchor@gmail.com','123456')
      .subscribe( user => {
        this.router.navigate(['/']);
      })
  }
}
