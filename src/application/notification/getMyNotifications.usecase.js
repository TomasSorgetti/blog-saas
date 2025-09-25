export default class getMyNotificationsUseCase {
  #notificationRepository;

  constructor({ notificationRepository }) {
    this.#notificationRepository = notificationRepository;
  }

  async execute({ userId }) {
    // todo => add redis
    return await this.#notificationRepository.findByUser(userId);
  }
}
