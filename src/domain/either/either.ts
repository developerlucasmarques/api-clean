export type Either<L, R> = Left<L, R> | Rigth<L, R>;

export class Left<L, R> {
  constructor(public readonly value: L) {}

  isLeft() {
    return true;
  }
  isRigth() {
    return false;
  }
}

export class Rigth<L, R> {
  constructor(public readonly value: R) {}

  isLeft() {
    return false;
  }
  isRigth() {
    return true;
  }
}

export const left = <L, R>(l: L): Either<L, R> => {
  return new Left(l);
};

export const rigth = <L, R>(r: R): Either<L, R> => {
  return new Rigth(r);
};
