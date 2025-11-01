export default class Container {
  constructor() {
    this.dependencies = {};
  }

  register(name, dependency) {
    this.dependencies[name] = dependency;
  }

  registerModule(registerFn, config) {
    registerFn(this, config);
  }

  resolve(name) {
    if (!this.dependencies[name]) {
      throw new Error(`Dependency '${name}' not found`);
    }
    return this.dependencies[name];
  }

  getDependencies() {
    return this.dependencies;
  }
}
