import { InvalidInputError } from "../errors/index.js";

export default class User {
  constructor({ name, email, hashedPassword }) {
    if (!email) throw new InvalidInputError("Email is required");
    this.name = name;
    this.email = email;
    this.password = hashedPassword;
    this.createdAt = new Date();
  }
}
