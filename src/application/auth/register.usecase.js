import UserEntity from "../../domain/entities/user.entity.js";
import SubscriptionEntity from "../../domain/entities/subscription.entity.js";

export default class RegisterUseCase {
  #userRepository;
  #subscriptionRepository;
  #hashService;

  constructor({ userRepository, subscriptionRepository, hashService }) {
    this.#userRepository = userRepository;
    this.#subscriptionRepository = subscriptionRepository;
    this.#hashService = hashService;
  }

  async execute({ username, email, password, preferences, plan = "free" }) {
    // todo => use a queue to create an user
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

    const subscription = new SubscriptionEntity({
      userId: newUser._id,
      plan,
      status: "active",
    });

    const newSubscription = await this.#subscriptionRepository.create(
      subscription
    );

    await this.#userRepository.update(newUser._id, {
      subscription: newSubscription._id,
    });

    // todo => generate verification token / code
    // todo => send verification email

    return {
      username: newUser.username,
      email: newUser.email,
    };
  }
}
