import { IClub } from "./club";
import { IEvent } from "./event";

export interface IMatch {
  id: number;
  homeClubId: number;
  awayClubId: number;
  homeScore: number;
  awayScore: number;
  homeClub?: IClub;
  awayClub?: IClub;
  stadium?: string;
  status?: string;
  date: string;
  time?: string;
  events?: IEvent[];
}
