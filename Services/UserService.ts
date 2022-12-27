class UserService {
  static createJWTToken(userEmail) {
    // return jwt token
    console.log(`Created JWT Token for user - ${userEmail}`);
  }
  static createUser(name) {
    // return a user
    console.log(`Created new user - ${name}`);
  }
  static updateUser(name) {
    // return updated user
    console.log(`Updated user's info - ${name}`);
  }
}
export { UserService };
