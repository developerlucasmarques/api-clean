import { Collection, MongoClient, MongoClientOptions } from 'mongodb';
import { AccountModel } from '../../../../domain/models/account';

export const MongoHelper = {
  client: null as MongoClient,

  async connect(url: string): Promise<void> {
    this.client = await MongoClient.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as MongoClientOptions);
  },

  async disconnect(): Promise<void> {
    await this.client.close();
  },

  getCollection(name: string): Collection {
    return this.client.db().collection(name);
  },

  map(collection: any): AccountModel {
    // _id é desconstruído e armazenado numa variável homônima
    // 'accountWithoutId' é um objetos com todos os atributos de 'accountById', exceto o _id, que virou variável
    const { _id, ...collectionWithoutId } = collection;
    return Object.assign({}, collectionWithoutId, { id: _id.toHexString() });
  },
};
