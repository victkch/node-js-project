interface Player {
  readonly name: string;
  health: number;
  attack(whoGetsAttacked: Player): void;
  ability(whoCantUseTheirsAbility?: Player): void;
}
export { Player };