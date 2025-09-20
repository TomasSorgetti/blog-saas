import { InvalidInputError } from "../errors/index.js";

export default class NotificationEntity {
  #userId;
  #type;
  #message;
  #read;
  #link;

  constructor({ userId, type, message, read = false, link = null }) {
    if (!userId) {
      throw new InvalidInputError("userId is required");
    }

    if (!["system", "subscription", "activity"].includes(type)) {
      throw new InvalidInputError(
        "type must be one of: system, subscription, activity"
      );
    }

    if (!message || typeof message !== "string") {
      throw new InvalidInputError("message is required and must be a string");
    }

    if (typeof read !== "boolean") {
      throw new InvalidInputError("read must be a boolean");
    }

    this.#userId = userId;
    this.#type = type;
    this.#message = message;
    this.#read = read;
    this.#link = link;
  }

  get userId() {
    return this.#userId;
  }

  get type() {
    return this.#type;
  }

  get message() {
    return this.#message;
  }

  get read() {
    return this.#read;
  }

  toObject() {
    return {
      userId: this.#userId,
      type: this.#type,
      message: this.#message,
      read: this.#read,
      link: this.#link,
    };
  }
}
