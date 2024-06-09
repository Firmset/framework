import { EventEmitter } from "node:events";

import MessengerMessage, { MessengerEntityCreation } from "../database";

export interface Listener<Queue extends string> {
  // eslint-disable-next-line no-unused-vars
  (data: MessengerEntityCreation<Queue>): void;
}

export default class MessengerEvent<Queue extends string> extends EventEmitter {
  constructor() {
    super();
  }

  async emitMessage(event: Queue, data: MessengerEntityCreation<Queue>) {
    try {
      const message = new MessengerMessage();
      message.queueName = event;
      message.body = JSON.stringify(data.body);
      message.availableAt = new Date();
      message.isExecuting = false;
      await message.save();
      return this.emit(event, data);
    } catch (error) {
      return false;
    }
  }

  addListener(eventName: Queue, listener: Listener<Queue>): this {
    return super.addListener(eventName, listener);
  }
}

