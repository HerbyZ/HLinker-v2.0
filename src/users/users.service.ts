import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { FindUserDto } from './dto/find-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    return await this.userModel.create(createUserDto);
  }

  async findAll(): Promise<User[]> {
    return await this.userModel.find().exec();
  }

  async findOne(findUserDto: FindUserDto): Promise<User> {
    return await this.userModel.findOne(findUserDto);
  }

  async update(
    findUserDto: FindUserDto,
    updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return await this.userModel.findOneAndUpdate(findUserDto, updateUserDto);
  }

  async delete(findUserDto: FindUserDto): Promise<User> {
    return await this.userModel.findOneAndDelete(findUserDto);
  }
}
