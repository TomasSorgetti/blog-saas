import { getIO } from "./client.js";

export default class SocketService {
  sendNotification(userId, notification) {
    const io = getIO();
    io.to(userId.toString()).emit("notification", notification);
  }

  sendGlobalEvent(event, data) {
    const io = getIO();
    io.emit(event, data);
  }
}
