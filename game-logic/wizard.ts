import { Player } from "./player";
class Wizard implements Player {
  readonly name: string;
  health: number;
  constructor(name: string) {
    this.name = name;
    this.health = 80;
  }
  attack(whoGetsAttacked: Player): void {
    console.log(
      `${this.name} shot a fireball and took 100hp of ${whoGetsAttacked.name}.`
    );
  }
  ability(whoCantUseTheirsAbility: Player): void {
    console.log(
      `${this.name} put a spell on ${whoCantUseTheirsAbility.name}, now they can do nothing.`
    );
  }
}
export { Wizard };
