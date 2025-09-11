import UserEntity from "../../domain/entities/user.entity.js";
import SubscriptionEntity from "../../domain/entities/subscription.entity.js";
import { AlreadyExistsError } from "../../domain/errors/index.js";

export default class RegisterUseCase {
  #userRepository;
  #subscriptionRepository;
  #hashService;
  #jwtService;

  constructor({
    userRepository,
    subscriptionRepository,
    hashService,
    jwtService,
  }) {
    this.#userRepository = userRepository;
    this.#subscriptionRepository = subscriptionRepository;
    this.#hashService = hashService;
    this.#jwtService = jwtService;
  }

  async execute({ username, email, password, preferences }) {
    // todo => use a queue to create an user

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

    const verificationToken = this.#jwtService.signCode(newUser._id);
    const verificationTokenExpires = new Date(Date.now() + 60 * 60 * 1000);

    const subscription = new SubscriptionEntity({
      userId: newUser._id,
      plan: "free",
      status: "active",
    });

    const newSubscription = await this.#subscriptionRepository.create(
      subscription
    );

    await this.#userRepository.update(newUser._id, {
      subscription: newSubscription._id,
      verificationToken,
      verificationTokenExpires,
    });

    // todo => send verification email with the link with token
    console.log(verificationToken);

    return {
      username: newUser.username,
      email: newUser.email,
    };
  }
}
