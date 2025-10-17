import UserEntity from "../../domain/entities/user.entity.js";
import { NotFoundError } from "../../domain/errors/index.js";

export default class UpdateProfileUseCase {
  #userRepository;
  #redisService;
  #storageService;

  constructor({ userRepository, redisService, storageService }) {
    this.#userRepository = userRepository;
    this.#redisService = redisService;
    this.#storageService = storageService;
  }

  async execute(userId, userData, file) {
    let avatarUrl = null;
    let storedFilename = null;

    try {
      const validatedData = UserEntity.validateUpdate(userData);

      if (file) {
        storedFilename = `${Date.now()}-${file.originalname}`;
        await this.#storageService.upload(file, storedFilename);
        avatarUrl = this.#storageService.getUrl(storedFilename);
      }

      const updateData = {
        ...validatedData,
        ...(avatarUrl && { avatar: avatarUrl }),
      };

      const updatedUser = await this.#userRepository.update(userId, updateData);
      if (!updatedUser) {
        throw new NotFoundError("User not found");
      }

      await this.#redisService.del(`user:${userId}`);

      return new UserEntity(updatedUser).sanitized();
    } catch (error) {
      if (storedFilename) {
        await this.#storageService.delete(storedFilename).catch((err) => {
          console.error("Failed to delete image after update failure:", err);
        });
      }
      throw error;
    }
  }
}
