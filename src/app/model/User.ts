import { Post } from "./Post";

export class User {
  public id: number;
  public nome: string;
  public login: string;
  public dataAniversario: string;
  public senha: string;
  public foto: string;
  public admin: boolean;
  public postagem: Post;
}
