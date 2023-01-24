class ClassQuery {
  public returnAllClasses(): string {
    return `SELECT name,health,damage,attack_type,ability FROM classes`;
  }
}
