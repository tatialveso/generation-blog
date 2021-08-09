import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Post } from '../model/Post';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  token = {
    headers: new HttpHeaders().set('Authorization', environment.token)
  }

  getAllPost(): Observable<Post[]> {
    return this.http.get<Post[]>('https://generation-blog.herokuapp.com/postagens', this.token)
  }

  postPost(post: Post): Observable<Post> {
    return this.http.post<Post>('https://generation-blog.herokuapp.com/postagens', post, this.token)
  }
}
