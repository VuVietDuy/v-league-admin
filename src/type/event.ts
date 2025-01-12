import { IClub } from "./club";
import { IPlayer } from "./player";

export interface IEvent {
  player?: IPlayer;
  club?: IClub;
  eventType?: string;
  eventTime?: number;
}
