import { AddAccountModel } from '../../usecases/add-account';

export class Account {
  name: string;
  email: string;
  password: string;

  constructor(props: AddAccountModel) {
    this.name = props.name;
    this.email = props.email;
    this.password = props.password;
  }

  public static create(addAccountModel: AddAccountModel) {
    
  }
}
