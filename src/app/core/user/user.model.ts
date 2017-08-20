import { Phone } from './phone.model';

export class User {
  email: string;
  firstName: string;
  lastName: string;
  username: string;
  id: string;
  isActive: boolean;
  isVerifyRequired: boolean;
  roles: Array<string>;
  phones: Array<Phone>;
  profileImage: string;
}
