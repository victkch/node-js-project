import { Player } from "./player";
import { Thief } from "./thief";
import { Warrior } from "./warrior";
import { Wizard } from "./wizard";
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