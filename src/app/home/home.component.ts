import { environment } from 'src/environments/environment.prod';
import { Component, OnInit } from '@angular/core';
import { Post } from '../model/Post';
import { Theme } from '../model/Theme';
import { User } from '../model/User';
import { Router } from '@angular/router';
import { PostService } from '../service/post.service';
import { ThemeService } from '../service/theme.service';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  post: Post = new Post()
  postList: Post[]

  theme: Theme = new Theme()
  themeList: Theme[]
  idTheme: number

  user: User = new User()
  idUser = environment.id

  constructor(
    private router: Router,
    private postService: PostService,
    private themeService: ThemeService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    if(environment.token == ''){
      this.router.navigate(['/login'])
    }

    this.getAllTheme()
    this.getAllPost()
  }

  getAllTheme(){
    this.themeService.getAllTheme().subscribe((resp: Theme[]) => {
      this.themeList = resp
    })
  }

  findByIdTheme(){
    this.themeService.getByIdTheme(this.idTheme).subscribe((resp: Theme) =>{
      this.theme = resp
    })
  }

  getAllPost(){
    this.postService.getAllPost().subscribe((resp: Post[]) => {
      this.postList = resp
    })
  }

  findByIdUser(){
    this.authService.getByIdUser(this.idUser).subscribe((resp: User) => {
      this.user = resp
    })
  }

  publish() {
    this.theme.id = this.idTheme;
    this.post.tema = this.theme;
    this.user.id = this.idUser;
    this.post.usuario = this.user;

    this.postService.postPost(this.post).subscribe((resp: Post) => {
      this.post = resp
      alert('Postagem cadastrada com sucesso!')
      this.post = new Post()
      this.getAllPost()
    })
  }

}
