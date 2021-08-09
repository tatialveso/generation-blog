import { Theme } from "./Theme";
import { User } from "./User";

export class Post {
  public id: number;
  public data: string;
  public titulo: string;
  public texto: string;
  public usuario: User;
  public tema: Theme;
}
