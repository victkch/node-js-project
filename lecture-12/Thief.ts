import { Player } from "./Player";
class Thief implements Player {
  health: number;
  constructor() {
    this.health = 100;
  }
  setHealth(health:number){
    this.health=health;
  }
  attack(): void {
    console.log("Takes 25hp.");
  }
  ability(): void {
    console.log("Runs away.");
  }
}