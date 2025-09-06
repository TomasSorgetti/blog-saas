class UserRepository {
  constructor(config = {}) {
    this.model = config.db?.models.User;
    if (!this.model) throw new Error("User model not provided");
  }

  async findById(id) {
    try {
      const user = await this.model.findById(id).lean();
      if (!user) throw new Error("User not found");
      return user;
    } catch (error) {
      throw new Error(`Error finding user: ${error.message}`);
    }
  }

  async findAll() {
    try {
      return await this.model.find().lean();
    } catch (error) {
      throw new Error(`Error fetching users: ${error.message}`);
    }
  }

  async create(data) {
    try {
      const user = new this.model(data);
      return await user.save();
    } catch (error) {
      throw new Error(`Error creating user: ${error.message}`);
    }
  }

  async update(id, data) {
    try {
      const user = await this.model
        .findByIdAndUpdate(id, data, {
          new: true,
          runValidators: true,
        })
        .lean();
      if (!user) throw new Error("User not found");
      return user;
    } catch (error) {
      throw new Error(`Error updating user: ${error.message}`);
    }
  }

  async delete(id) {
    try {
      const user = await this.model.findByIdAndDelete(id).lean();
      if (!user) throw new Error("User not found");
      return { id };
    } catch (error) {
      throw new Error(`Error deleting user: ${error.message}`);
    }
  }
}

export default UserRepository;
