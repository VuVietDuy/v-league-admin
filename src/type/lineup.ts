import { IPlayer } from "./player";

export interface ILineup {
  id: number;
  matchId: number;
  clubId: number;
  playerId: number;
  isStarting: boolean;
  player: IPlayer;
}
