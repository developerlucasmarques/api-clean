import { Collection, MongoClient, MongoClientOptions } from 'mongodb';
import { AccountModel } from '../../../../domain/models/account';

export const MongoHelper = {
  client: null as MongoClient,
  uri: null as string,

  async connect(uri: string | undefined): Promise<void> {
    this.uri = uri;
    this.client = await MongoClient.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as MongoClientOptions);
  },

  async disconnect(): Promise<void> {
    await this.client.close();
    this.client = null;
  },

  async getCollection(name: string): Promise<Collection> {
    if (!this.client) {
      await this.connect(this.uri);
    }
    return this.client.db().collection(name);
  },

  map(collection: any): AccountModel {
    // _id é desconstruído e armazenado numa variável homônima
    // 'accountWithoutId' é um objeto com todos os atributos de 'accountById', exceto o _id, que virou variável
    const { _id, ...collectionWithoutId } = collection;
    return Object.assign({}, collectionWithoutId, { id: _id.toHexString() });
  },
};
