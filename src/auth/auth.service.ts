import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { User } from '../users/schemas/user.schema';
import { UsersService } from '../users/users.service';
import { RegisterUserDto } from './dto/register-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<User> {
    let user;

    try {
      user = await this.usersService.findOne({ email });
    } catch (e) {
      throw new HttpException(
        'Invalid email or password',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (passwordMatch) {
      return user;
    }

    throw new Error('Invalid password or email');
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user._id };

    return {
      accessToken: this.jwtService.sign(payload),
      userId: payload.sub,
    };
  }

  async register(registerUserDto: RegisterUserDto) {
    const salt = await bcrypt.genSalt();
    registerUserDto.password = await bcrypt.hash(
      registerUserDto.password,
      salt,
    );

    const user = await this.usersService.create(registerUserDto);
    return await this.login(user);
  }
}
