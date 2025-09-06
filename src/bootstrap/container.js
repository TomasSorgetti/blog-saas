// Repositories imports

// Services imports

// Controllers imports

export default class Container {
  constructor(config = {}) {
    this.config = config;
    this.repositories = {};
    this.services = {};
    this.controllers = {};
    this.initializeDependencies();
  }

  initializeDependencies() {
    // Repositories instances
    // this.repositories.userRepository = new UserRepository(this.config);
    // UserCases instances
    // Controllers instances
    // this.controllers.userController = new UserController({
    //   userService: this.services.userService,
    // });
  }

  getDependencies() {
    return {
      repositories: this.repositories,
      services: this.services,
      controllers: this.controllers,
    };
  }
}
