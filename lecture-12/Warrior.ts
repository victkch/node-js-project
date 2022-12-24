import { Player } from "./Player";
class Warrior implements Player {
  health: number;
  constructor() {
    this.health = 200;
  }
  setHealth(health:number){
    this.health=health;
  }
  attack(): void {
    console.log("Takes 50hp.");
  }
  ability(): void {
    console.log("Protect yourself with a shield.");
  }
}
