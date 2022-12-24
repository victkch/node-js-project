import { Player } from "./Player";
class Wizard implements Player {
  health: number;
  constructor() {
    this.health = 80;
  }
  setHealth(health:number){
    this.health=health;
  }
  attack(): void {
    console.log("Takes 100hp.");
  }
  ability(): void {
    console.log("Chosen opponent can do nothing.");
  }
}
