import { IClub } from "./club";
import { IPlayer } from "./player";

export interface IEvent {
  id: number;
  player?: IPlayer;
  assist: IPlayer;
  club?: IClub;
  eventType?: string;
  eventTime?: number;
}
