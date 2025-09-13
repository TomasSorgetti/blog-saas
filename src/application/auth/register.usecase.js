import UserEntity from "../../domain/entities/user.entity.js";
import SubscriptionEntity from "../../domain/entities/subscription.entity.js";
import { AlreadyExistsError } from "../../domain/errors/index.js";

export default class RegisterUseCase {
  #userRepository;
  #subscriptionRepository;
  #hashService;
  #jwtService;
  // #emailService;
  #rabbitService;
  #env;

  constructor({
    userRepository,
    subscriptionRepository,
    hashService,
    jwtService,
    // emailService,
    rabbitService,
    env,
  }) {
    this.#userRepository = userRepository;
    this.#subscriptionRepository = subscriptionRepository;
    this.#hashService = hashService;
    this.#jwtService = jwtService;
    // this.#emailService = emailService;
    this.#rabbitService = rabbitService;
    this.#env = env;
  }

  async execute({ username, email, password, preferences }) {
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

    // const emailSent = await this.#emailService.sendEmail({
    //   to: newUser.email,
    //   subject: "Verify your email",
    //   html: `
    //     <h1>Verify your email</h1>
    //     <a href='http://localhost:4321/verify-email&token=${verificationToken}'>Verify email</a>
    //   `,
    // });

    await this.#rabbitService.publish("email_queue", {
      type: "VERIFY_EMAIL",
      to: newUser.email,
      subject: "Verify your email",
      html: `
        <h1>Verify your email</h1>
        <a href='${
          this.#env.FRONT_URL
        }/verify-email&token=${verificationToken}'>Verify email</a>
      `,
    });

    return {
      username: newUser.username,
      email: newUser.email,
      tokenExpiresIn: verificationTokenExpires,
    };
  }
}
