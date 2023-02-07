import { jwt, jwtKey } from "../../services/user-service";

const isTokenProvided = (token: string) => {
  return new Promise((res, rej) => {
    if (token && token !== null) {
      res(true);
    } else rej(false);
  });
};
const tokenValidation = (jwtToken: string) => {
  return new Promise((res, rej) => {
    jwt.verify(jwtToken, jwtKey, function (err: Error, decoded: any) {
      if (err) {
        rej(false);
      } else {
        res([decoded["id"], decoded["name"], decoded["class_id"]]);
      }
    });
  });
};

export { isTokenProvided, tokenValidation };
