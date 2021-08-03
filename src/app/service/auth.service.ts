import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { User } from '../model/User';
import { UserLogin } from '../model/UserLogin';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  register(user: User): Observable<User> {
    return this.http.post<User>('https://generation-blog.herokuapp.com/usuarios/cadastrar', user);
  }

  login(userLogin: UserLogin): Observable<UserLogin> {
    return this.http.post<UserLogin>('https://generation-blog.herokuapp.com/usuarios/logar', userLogin);
  }
}
