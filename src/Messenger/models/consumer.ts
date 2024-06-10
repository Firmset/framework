import _ from "lodash";
import MessengerMessage, { MessengerEntity } from "../database";
import Logger from "../../utils/logger";

abstract class Consumer<Queue extends string> {
  queueNames: Array<Queue>;
  constructor(queueNames: Array<Queue> = []) {
    this.queueNames = queueNames;
  }

  // eslint-disable-next-line no-unused-vars
  abstract consume(data: MessengerEntity<Queue>): Promise<void>;

  async run() {
    while (1) {
      const message = _.head(
        await MessengerMessage.findAll({
          where: {
            isExecuting: false,
            queueName: this.queueNames
          },
          order: [["id", "ASC"]],
          limit: 1
        })
      ) as MessengerMessage<Queue> | undefined;

      if (message) {
        try {
          message.isExecuting = true;
          await message.save();
          await this.consume(JSON.parse(message.body));
        } catch (error) {
          Logger.errorMsg(error);
        } finally {
          await message.destroy();
        }
      } else {
      }
    }
  }
}
export default Consumer;

