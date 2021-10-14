import axios from 'axios';

export interface AuthData {
  accessToken: string;
  userId: number;
}

export class AuthService {
  // TODO: AuthService.login() error handling
  static async login(email: string, password: string): Promise<AuthData> {
    const response = await axios({
      url: 'auth/login',
      method: 'post',
      data: { email, password },
    });

    return response.data as AuthData;
  }

  // TODO: AuthService.register() error handling
  static async register(email: string, password: string): Promise<AuthData> {
    const response = await axios({
      url: 'auth/register',
      method: 'post',
      data: { email, password },
    });

    return response.data as AuthData;
  }
}
