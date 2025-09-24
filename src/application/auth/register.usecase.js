import UserEntity from "../../domain/entities/user.entity.js";
import SubscriptionEntity from "../../domain/entities/subscription.entity.js";
import WorkbenchEntity from "../../domain/entities/workbench.entity.js";
import { AlreadyExistsError } from "../../domain/errors/index.js";

export default class RegisterUseCase {
  #userRepository;
  #subscriptionRepository;
  #planRepository;
  #workbenchRepository;
  #hashService;
  #jwtService;
  #emailService;
  #emailQueueService;
  #env;

  constructor({
    userRepository,
    subscriptionRepository,
    planRepository,
    workbenchRepository,
    hashService,
    jwtService,
    emailService,
    emailQueueService,
    env,
  }) {
    this.#userRepository = userRepository;
    this.#subscriptionRepository = subscriptionRepository;
    this.#planRepository = planRepository;
    this.#workbenchRepository = workbenchRepository;
    this.#hashService = hashService;
    this.#jwtService = jwtService;
    this.#emailService = emailService;
    this.#emailQueueService = emailQueueService;
    this.#env = env;
  }

  async execute({ username, email, password, preferences }) {
    // todo => si falla algo, hacer rollback y notificar al usuario del error.
    // todo => Add log.
    const existingUser = await this.#userRepository.findByEmail(email);
    if (existingUser) {
      throw new AlreadyExistsError("User allready exists");
    }

    const hashedPassword = await this.#hashService.hash(password);

    const user = new UserEntity({
      username,
      email,
      password: hashedPassword,
      role: "user",
      preferences,
      loginMethods: [{ provider: "email", addedAt: new Date() }],
    });

    const newUser = await this.#userRepository.create(user);

    const freePlan = await this.#planRepository.findByName("free");

    const verificationToken = this.#jwtService.signCode(newUser._id);
    const verificationTokenExpires = new Date(Date.now() + 60 * 60 * 1000);

    const subscription = new SubscriptionEntity({
      userId: newUser._id,
      planId: freePlan._id,
      status: "active",
    });
    const newSubscription = await this.#subscriptionRepository.create(
      subscription.toObject()
    );

    const workbenchEntity = new WorkbenchEntity({
      name: "My Workspace",
      owner: newUser._id,
      members: [{ userId: newUser._id, role: "owner" }],
    });
    await this.#workbenchRepository.create(workbenchEntity.toObject());

    await this.#userRepository.update(newUser._id, {
      subscription: newSubscription._id,
      verificationToken,
      verificationTokenExpires,
    });

    await this.#emailQueueService.addJob({
      type: "VERIFY_EMAIL",
      to: newUser.email,
      subject: "Verify your email",
      html: `
        <h1>Verify your email, token expires in 1 hour</h1>
        <h2>IMPORTANTE: Para desarrollo, copiá el token del url y envialo en el campo "token" de la query en la ruta /api/auth/verify</h2>
        <p>Token: ${verificationToken}</p>
        <a href='${
          this.#env.FRONT_URL
        }/verify-email?token=${verificationToken}'>Verify email</a>
      `,
    });

    return {
      username: newUser.username,
      email: newUser.email,
      tokenExpiresIn: verificationTokenExpires,
    };
  }
}
