import request from 'supertest';
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper';
import app from '../config/app';

describe('SignUp Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL);
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  beforeEach(async () => {
    const accountColletion = await MongoHelper.getCollection('accounts');
    await accountColletion.deleteMany({});
  });

  test('Should return an account on succes', async () => {
    await request(app)
      .post('/api/signup')
      .send({
        name: 'Lucas',
        email: 'lucas@mail.com',
        password: '123',
        passwordConfirmation: '123',
      })
      .expect(201);
  });
});
