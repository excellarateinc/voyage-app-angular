import { Phone } from '../../core/user/phone.model';

export class Register {
  email: string;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  confirmPassword: string;
  phones: Array<Phone>;
}
