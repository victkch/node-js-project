const jwt = require("jsonwebtoken");
const jwtKey = "my-super-duper-secure-jwt-signing-key-ha-ha-ha";

class UserService {
  public createJWTtoken(userEmail: string): string {
    console.log(`Created JWT Token for user - ${userEmail}`);
    return jwt.sign({ userEmail }, jwtKey, { expiresIn: "12h" });
  }
  public createUser(name: string) {
    // create user in mongo db
    console.log(`Created new user - ${name}`);
    //return user
  }
  public updateUser(name: string) {
    //update in db
    console.log(`Updated user's info - ${name}`);
    // return updated user
  }
}
export { UserService, jwt, jwtKey };
