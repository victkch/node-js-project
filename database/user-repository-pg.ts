class UserRepository {
  public findUser(): string {
    return (
      `SELECT id,username,email,password,class_id ` +
      `FROM users WHERE email=$1 AND password=$2`
    );
  }
  public findUserByName(): string {
    return `SELECT username FROM users WHERE username=$1`;
  }
  public addUser(): string {
    return (
      `INSERT INTO users (id, username, email, password, class_id,created_at,updated_at) ` +
      `VALUES ((select max(id) from users)+1,$1,$2,$3,$4,$5,$6) ` +
      `RETURNING *`
    );
  }
  public updateUser(): string {
    return (
      `UPDATE users ` +
      `SET username=$1, password=$2, class_id=$3,updated_at=$4 ` +
      `WHERE id=$5 ` +
      `RETURNING *`
    );
  }
}

export { UserRepository };
