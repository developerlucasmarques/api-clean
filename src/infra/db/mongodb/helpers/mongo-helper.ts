import { MongoClient, MongoClientOptions } from 'mongodb';
import { disconnect } from 'process';

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
};
