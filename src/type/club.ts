import { IPlayer } from "./player";

export interface IClub {
  id: number;
  name: string;
  shortName: string;
  coach: string;
  stadium: string;
  players: IPlayer[];
  logoURL: string;
  stadiumDescription: string;
  foundedYear: string;
}
