class ClassRepository {
  public returnAllClasses(): string {
    return `SELECT id,name,health,damage,attack_type,ability FROM classes`;
  }
}

export { ClassRepository };
