import bcrypt from "bcryptjs";

export default class HashService {
  #saltRounds;

  constructor({ saltRounds = 10 }) {
    this.#saltRounds = saltRounds;
  }

  async hash(password) {
    const salt = await bcrypt.genSalt(this.#saltRounds);
    return bcrypt.hash(password, salt);
  }

  async verify(password, hashedPassword) {
    return bcrypt.compare(password, hashedPassword);
  }
}
