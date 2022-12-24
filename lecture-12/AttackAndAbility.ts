import { Player } from "./Player";
import { ReturnAPlayer } from "./ReturnAPlayer";

class GameMethods {
  static createAPlayer(playerType: number, playerName: string): Player {
    return ReturnAPlayer.returnAPlayer(playerType, playerName);
  }
  static makeAnAttack(whoAttacks: Player, whoGetsAttacked: Player): void {
    whoAttacks.attack(whoGetsAttacked);
  }
  static useAbility(whoUsesAbility: Player, whoGetsHurt?: Player) {
    whoUsesAbility.ability(whoGetsHurt);
  }
}
