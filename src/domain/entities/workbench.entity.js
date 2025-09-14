import { InvalidInputError } from "../errors/index.js";

export default class WorkbenchEntity {
  #id;
  #name;
  #owner;
  #members;
  #createdAt;

  constructor({
    id = null,
    name,
    owner,
    members = [],
    createdAt = new Date(),
  }) {
    if (!name) throw new InvalidInputError("Workbench name is required");
    if (!owner) throw new InvalidInputError("Owner is required");

    this.#id = id;
    this.#name = name;
    this.#owner = owner;
    this.#members = members.length
      ? members
      : [{ userId: owner, role: "owner" }];
    this.#createdAt = createdAt;
  }

  get id() {
    return this.#id;
  }
  get name() {
    return this.#name;
  }
  get owner() {
    return this.#owner;
  }
  get members() {
    return this.#members;
  }
  get createdAt() {
    return this.#createdAt;
  }

  addMember(userId, role = "editor") {
    if (!userId) throw new InvalidInputError("Member userId is required");
    if (this.#members.some((m) => m.userId === userId)) return;
    this.#members.push({ userId, role });
  }

  removeMember(userId) {
    this.#members = this.#members.filter((m) => m.userId !== userId);
  }

  toObject() {
    return {
      name: this.#name,
      owner: this.#owner,
      members: this.#members,
      createdAt: this.#createdAt,
    };
  }
}
