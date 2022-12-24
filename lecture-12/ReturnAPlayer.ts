import { Player } from "./Player";
import { Thief } from "./Thief";
import { Warrior } from "./Warrior";
import { Wizard } from "./Wizard";
enum PlayerType {
  Thief = 1,
  Warrior,
  Wizard,
}
class ReturnAPlayer {
  static returnAPlayer(playerTeam: number, playerName: string): Player {
    switch (playerTeam) {
      case PlayerType.Thief:
        return new Thief(playerName);
      case PlayerType.Warrior:
        return new Warrior(playerName);
      default:
        return new Wizard(playerName);
    }
  }
}
export { ReturnAPlayer };