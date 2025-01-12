import { IClub } from "./club";
import { IEvent } from "./event";

export interface IMatch {
  id?: number;
  homeClub?: IClub;
  awayClub?: IClub;
  stadium?: string;
  date?: string;
  time?: string;
  events?: IEvent[];
}
