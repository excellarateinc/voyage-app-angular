import { Phone } from './phone.model';

export class Register {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
  phones: Array<Phone>;
}
