import { Model } from "sequelize";

interface TBasicAttributes {
  id: number | string;
}

interface Constructor<T, D> {
  // eslint-disable-next-line no-unused-vars
  new (model: D): T;
  // eslint-disable-next-line no-unused-vars
  findByPk(id: string | number): Promise<T>;
  findAll(): Promise<T[]>;
}

export default class Resource<
  TModelAttributes extends TBasicAttributes,
  TCreationAttributes extends TBasicAttributes = TModelAttributes
> {
  Model: Constructor<
    Model<TModelAttributes, TCreationAttributes>,
    TCreationAttributes
  >;
  constructor(
    model: Constructor<
      Model<TModelAttributes, TCreationAttributes>,
      TCreationAttributes
    >
  ) {
    this.Model = model;
  }
  index() {
    return this.Model.findAll();
  }
  async create(data: TCreationAttributes) {
    const instance = new this.Model(data);
    return await instance.save();
  }
  async get(id: string | number) {
    return await this.Model.findByPk(id);
  }
  async update(data: TModelAttributes) {
    const instance = await this.Model.findByPk(data.id);
    instance.update(data);
  }
  async destroy(id: TModelAttributes["id"]) {
    const instance = await this.Model.findByPk(id);
    await instance.destroy();
  }
}

