export default class getMyNotificationsUseCase {
  #notificationRepository;

  constructor({ notificationRepository }) {
    this.#notificationRepository = notificationRepository;
  }

  async execute({ userId }) {
    return await this.#notificationRepository.findByUser(userId);
  }
}
