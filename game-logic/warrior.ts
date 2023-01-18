import { Player } from "./player";
class Warrior implements Player {
  readonly name: string;
  health: number;
  constructor(name: string) {
    this.name = name;
    this.health = 200;
  }
  attack(whoGetsAttacked: Player): void {
    console.log(
      `${this.name} hit with a sword and took 50hp of ${whoGetsAttacked.name}.`
    );
  }
  ability(): void {
    console.log(`${this.name} protects themselves with a shield.`);
  }
}
export { Warrior };
