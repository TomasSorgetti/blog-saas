export default class MarkAllAsReadUseCase {
  #notificationRepository;

  constructor({ notificationRepository }) {
    this.#notificationRepository = notificationRepository;
  }

  async execute({ userId }) {
    // todo => add redis
    const res = await this.#notificationRepository.markAllAsRead(userId);
    return res;
  }
}
