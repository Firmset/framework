import { DataTypes, Model, Sequelize } from "sequelize";
import config from "../config/database";

const sequelize = new Sequelize(config);

export interface MessengerEntityCreation<Queue extends string> {
  body:
    | { [key: string | number]: string | number | boolean | Date }
    | string
    | number
    | boolean;
  queueName: Queue;
}

export interface MessengerEntity<Queue extends string>
  extends MessengerEntityCreation<Queue> {
  id: string;
  isExecuting: boolean;
  availableAt: Date;
  deliveredAt: Date;
}

class MessengerMessage<Queue extends string> extends Model<
  MessengerEntity<Queue>,
  MessengerEntityCreation<Queue>
> {
  public id!: number;
  public body!: string;
  public queueName!: Queue;
  public isExecuting!: boolean;
  public availableAt!: Date;
  public deliveredAt!: Date;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

MessengerMessage.init(
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true
    },
    body: DataTypes.TEXT,
    queueName: DataTypes.STRING,
    isExecuting: DataTypes.BOOLEAN,
    availableAt: DataTypes.DATE,
    deliveredAt: DataTypes.DATE
  },
  {
    sequelize,
    modelName: "MessengerMessage",
    tableName: "messenger_messages"
  }
);

MessengerMessage.sync();

export default MessengerMessage;

