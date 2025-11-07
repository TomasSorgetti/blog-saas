export class PlanRepositoryInterface {
  async findById(id) {
    throw new Error("Method 'findById' not implemented");
  }

  async findByName(name) {
    throw new Error("Method 'findByName' not implemented");
  }

  async findAllActive() {
    throw new Error("Method 'findAllActive' not implemented");
  }

  async create(planData) {
    throw new Error("Method 'create' not implemented");
  }

  async update(planId, updateData) {
    throw new Error("Method 'update' not implemented");
  }

  async deactivate(planId) {
    throw new Error("Method 'deactivate' not implemented");
  }

  async getStripePriceId(planId) {
    throw new Error("Method 'getStripePriceId' not implemented");
  }
}
