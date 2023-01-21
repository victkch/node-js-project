class UserQuery {
  public findUser(userName: string, email: string): string {
    return (
      `SELECT username,email,class_id FROM users ` +
      `WHERE username=${userName} AND email=${email}`
    );
  }
  public addUser(
    id: number,
    userName: string,
    email: string,
    password: string,
    classId: number
  ): string {
    return (
      `INSERT INTO users (id, username, email, password, class_id,created_at,updated_at) ` +
      `VALUES (${id},${userName},${email},${password},${classId},${new Date()},${new Date()})`
    );
  }
  public updateUser(
    id: number,
    userName: string,
    password: string,
    classId: number
  ) {
    return (
      `UPDATE users ` +
      `SET username=${userName}, password=${password}, class_id=${classId},updated_at=${new Date()} ` +
      `WHERE id='${id}`
    );
  }
}
