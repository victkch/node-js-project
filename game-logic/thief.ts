import { Player } from "./player";
class Thief implements Player {
  readonly name: string;
  health: number;
  constructor(name: string) {
    this.name = name;
    this.health = 100;
  }
  attack(whoGetsAttacked: Player): void {
    console.log(
      `${this.name} shot a bow and took 25hp of ${whoGetsAttacked.name}.`
    );
  }
  ability(): void {
    console.log(`${this.name} runs away.`);
  }
}
export { Thief };