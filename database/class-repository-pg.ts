class ClassRepository {
  public returnAllClasses(): string {
    return `SELECT id,name,health,damage,attack_type,ability FROM classes`;
  }
  public getClassInfo(): string {
    return `SELECT health,damage,attack_type,ability FROM classes WHERE id=$1`;
  }
}

export { ClassRepository };
