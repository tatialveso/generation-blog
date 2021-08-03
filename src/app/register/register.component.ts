import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/User';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user: User = new User;
  confirmPass: string;
  userAdmin: boolean;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    window.scroll(0, 0);
  }

  confirmPassword(event: any) {
    this.confirmPass = event.target.value
  }

  userType(event: any) {
    this.userAdmin = event.target.value
  }

  register() {
    this.user.admin = this.userAdmin

    if(this.user.senha != this.confirmPass) {
      alert('A senha está incorreta!');
    } else {
      this.authService.register(this.user).subscribe((resp: User) => {
        this.user = resp;
        this.router.navigate(['/login']);
        alert('Usuário cadastrado com sucesso!');
      })
    }
  }

}
