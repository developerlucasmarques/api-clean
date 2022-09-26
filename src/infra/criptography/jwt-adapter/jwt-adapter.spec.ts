import jwt from 'jsonwebtoken';
import { JwtAdapter } from './jwt-adapter';

jest.mock('jsonwebtoken', () => ({
  async sign(): Promise<string> {
    return Promise.resolve('any_token');
  },
}));

const makeSut = (): JwtAdapter => {
  return new JwtAdapter('secret');
};

describe('Jwt Adapater', () => {
  test('Should call sign with correct values', async () => {
    const sut = makeSut();
    const signSpy = jest.spyOn(jwt, 'sign');
    await sut.hash('any_id');
    expect(signSpy).toHaveBeenCalledWith({ id: 'any_id' }, 'secret');
  });

  test('Should return a token on sign succees', async () => {
    const sut = makeSut();
    const accessToken = await sut.hash('any_id');
    expect(accessToken).toBe('any_token');
  });

  test('Should throw if sign throws', async () => {
    const sut = makeSut();
    jest.spyOn(jwt, 'sign').mockImplementationOnce(() => {
      throw new Error();
    });

    const promise = sut.hash('any_id');
    expect(promise).rejects.toThrow();
  });
});