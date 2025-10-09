export default class DeleteOneNotificationUseCase {
  #notificationRepository;

  constructor({ notificationRepository }) {
    this.#notificationRepository = notificationRepository;
  }

  async execute({ userId, id }) {
    // todo => add redis
    const res = await this.#notificationRepository.delete(id);
    return res;
  }
}
