enum EventType {
  attack = "attack",
  ability = "ability",
  message = "message",
  restore = "restore",
}
const eventsMiddleware = (eventType: any) => {
  return new Promise((res, rej) => {
    if (Object.values(EventType).includes(eventType)) {
      res(true);
    } else
      rej(
        "No such type found. Available types: attack, ability, message, restore"
      );
  });
};
export { eventsMiddleware, EventType };
