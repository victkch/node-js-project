import { jwt, jwtKey } from "../../Services/UserService";

const isTokenProvided = (token: string) => {
  return new Promise((res, rej) => {
    if (token && token !== null) {
      res(true);
    } else rej(false);
  });
};
const tokenValidation = (jwtToken: string) => {
  return new Promise((res, rej) => {
    jwt.verify(jwtToken, jwtKey, function (err: Error) {
      if (err) {
        rej(false);
      } else res(true);
    });
  });
};

export { isTokenProvided, tokenValidation };
