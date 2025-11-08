import { InvalidInputError } from "../errors/index.js";

export default class WorkbenchEntity {
  #id;
  #name;
  #description;
  #owner;
  #members;
  #settings;
  #isArchived;
  #createdAt;
  #updatedAt;

  constructor({
    _id = null,
    name,
    description,
    owner,
    members = [],
    settings = { theme: "light", color: null, integrations: [] },
    isArchived = false,
    createdAt = new Date(),
    updatedAt = new Date(),
  }) {
    if (!name) throw new InvalidInputError("Workbench name is required");
    if (!description)
      throw new InvalidInputError("Workbench description is required");
    if (!owner) throw new InvalidInputError("Owner is required");

    this.#id = _id;
    this.#name = name;
    this.#description = description;
    this.#owner = owner;
    this.#members = members.length
      ? members
      : [{ userId: owner, role: "owner" }];
    this.#settings = settings;
    this.#isArchived = isArchived;
    this.#createdAt = createdAt;
    this.#updatedAt = updatedAt;
  }

  get id() {
    return this.#id;
  }
  get name() {
    return this.#name;
  }
  get description() {
    return this.#description;
  }
  get owner() {
    return this.#owner;
  }
  get members() {
    return this.#members;
  }
  get settings() {
    return this.#settings;
  }
  get isArchived() {
    return this.#isArchived;
  }
  get createdAt() {
    return this.#createdAt;
  }
  get updatedAt() {
    return this.#updatedAt;
  }

  addMember(userId, role = "editor") {
    if (!userId) throw new InvalidInputError("Member userId is required");
    if (
      this.#members.some((m) => m.userId === userId || m.userId?._id === userId)
    )
      return;
    this.#members.push({ userId, role });
  }

  removeMember(userId) {
    this.#members = this.#members.filter(
      (m) => m.userId !== userId && m.userId?._id !== userId
    );
  }

  toObject() {
    return {
      name: this.#name,
      description: this.#description,
      owner: this.#owner,
      members: this.#members,
      settings: this.#settings,
      isArchived: this.#isArchived,
      createdAt: this.#createdAt,
      updatedAt: this.#updatedAt,
    };
  }

  sanitized() {
    return {
      id: this.#id?.toString(),
      name: this.#name,
      description: this.#description,
      owner: this.#owner?._id
        ? {
            id: this.#owner._id.toString(),
            username: this.#owner.username,
            email: this.#owner.email,
            avatar: this.#owner.avatar,
          }
        : this.#owner,
      members: this.#members.map((m) => ({
        user: m.userId?._id
          ? {
              id: m.userId._id.toString(),
              username: m.userId.username,
              email: m.userId.email,
              avatar: m.userId.avatar,
            }
          : m.userId,
        role: m.role,
      })),
      settings: this.#settings,
      isArchived: this.#isArchived,
      createdAt: this.#createdAt,
      updatedAt: this.#updatedAt,
    };
  }
}
