import { isEmail, isString } from 'class-validator';

export class RegisterDto {
  @isString()
  fname: string;

  @isString()
  lname: string;

  @isEmail()
  email: string;
  
  @isString()
  password: string;
}
