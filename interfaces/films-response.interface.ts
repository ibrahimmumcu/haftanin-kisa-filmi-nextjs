import { Film } from "./film.interface";

export interface FilmsResponse {
  counter: number;
  data: Film[];
}
