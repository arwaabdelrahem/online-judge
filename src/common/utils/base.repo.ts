import { ChangeStream, ChangeStreamOptions } from 'mongodb';
import { Document, FilterQuery, Model, UpdateQuery } from 'mongoose';

export type IdType = string | number;

export interface HasId {
  _id?: IdType;
}

export class BaseRepo<
  T extends HasId = { _id: string },
  K extends IdType = T['_id'],
> {
  constructor(private _model: Model<T & Document<K>>) {}

  async create(createBodyDto) {
    const document = await this._model.create(createBodyDto);

    return document;
  }

  async find(filter: FilterQuery<T & Document<K>>) {
    const documents = await this._model.find(filter);

    return documents;
  }

  async findById(id) {
    const document = await this._model.findById(id);

    return document;
  }

  async findOne(filter: FilterQuery<T & Document<K>>) {
    const document = await this._model.findOne(filter);

    return document;
  }

  async findOneAndUpdate(
    filter: FilterQuery<T & Document<K>>,
    updateQuery: UpdateQuery<T & Document<K>>,
    options?,
  ) {
    const document = await this._model.findOneAndUpdate(
      filter,
      updateQuery,
      options,
    );

    return document;
  }

  watch(
    pipeline?: Array<Record<string, unknown>>,
    options?: ChangeStreamOptions,
  ): ChangeStream<any> {
    return this._model.watch(pipeline, options);
  }
}
