class UserService {
  public createJWTToken(userEmail) {
    // return jwt token
    console.log(`Created JWT Token for user - ${userEmail}`);
  }
  public createUser(name) {
    // return a user
    console.log(`Created new user - ${name}`);
  }
  public updateUser(name) {
    // return updated user
    console.log(`Updated user's info - ${name}`);
  }
}
export { UserService };
