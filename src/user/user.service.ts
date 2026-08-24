import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { RegisterDto } from 'src/auth/dto/registerUser.dto';
import { Model, QueryFilter } from 'mongoose';
import { User } from './schemas/user.schema';
import { LoginDto } from 'src/auth/dto/loginUser.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}
  async createUser(registerUserDto: RegisterDto) {
    try {
      return await this.userModel.create({
        fname: registerUserDto.fname,
        lname: registerUserDto.lname,
        email: registerUserDto.email,
        password: registerUserDto.password,
      });
    } catch (err: unknown) {
      const DUPLICATE_KEY_CODE = 11000;
      const e = err as { code?: number };
      if (e.code == DUPLICATE_KEY_CODE) {
        throw new ConflictException('Email is already taken!');
      }
      throw err;
    }
  }
async findOne(filter: QueryFilter<User>) {
  // Mongoose queries MongoDB under the hood using this object filter
  return await this.userModel.findOne(filter);
}
  async getUserById(id: string){
    return await this.userModel.findOne({_id: id})
  }
}
