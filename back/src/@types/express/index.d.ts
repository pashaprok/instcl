declare namespace Express {
  import { UserID } from '../../types/user.types';

  export interface User {
    id: UserID;
  }

  export interface Request {
    user: User;
  }
}
