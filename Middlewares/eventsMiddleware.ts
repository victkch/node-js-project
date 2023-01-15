enum ActionType {
  attack = "attack",
  ability = "ability",
  message = "message",
  restore = "restore",
}

const actionTypeMiddleware = (actionType: string) => {
  return new Promise((res, rej) => {
    if (Object.values(ActionType).includes(ActionType[actionType])) {
      res(true);
    } else rej(new Error());
  });
};

export { actionTypeMiddleware, ActionType };
