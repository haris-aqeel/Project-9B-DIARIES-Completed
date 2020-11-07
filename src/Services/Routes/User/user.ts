import { Response, Request } from 'miragejs';
import { handleErrors } from '../../MirageServer/server';
import { User } from '../../../Interface/user.interface';
import { randomBytes } from 'crypto';

const generateToken = () => randomBytes(8).toString('hex');

export interface AuthResponse {
  token: string;
  user: User;
}

// This Function Is Connected To The Login Component

export const login = (schema: any, req: Request): AuthResponse |  Response => {
  

    const {username, password} = JSON.parse(req.requestBody);

    const users = schema.users.findBy({username});

    if (!users){

      return handleErrors(null, "Sorry! No user with the username provided exists")

    }

    if (password !== users.password){

      return handleErrors(null, "Incorrect Password! Please Re-enter the Password")

    }

    const token = generateToken();

    return {
      token,
      user: users.attrs,
    }

};


// This Function is associated with the registration of new users

export const signup = (schema: any, req: Request): AuthResponse | Response => {


  const data = JSON.parse(req.requestBody);

  const otherUsers = schema.users.findBy(data.username);

  console.log(otherUsers)

  if (otherUsers) {

    return handleErrors(null, 'A user with this username already exists.')

  }

  const user = schema.users.create(data);
  const token = generateToken();

  return {
    user: user.attrs,
    token
  }
};

