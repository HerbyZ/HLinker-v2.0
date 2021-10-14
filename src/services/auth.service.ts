import axios from 'axios';

export interface AuthData {
  accessToken: string;
  userId: number;
}

export class AuthService {
  static async login(email: string, password: string): Promise<AuthData> {
    const response = await axios({
      url: 'auth/login',
      method: 'post',
      data: { email, password },
    }).catch((error) => {
      if (error.response.data.error === 'Unauthorized') {
        throw new Error('Invalid email or password');
      }

      throw error;
    });

    return response.data as AuthData;
  }

  static async register(email: string, password: string): Promise<AuthData> {
    const response = await axios({
      url: 'auth/register',
      method: 'post',
      data: { email, password },
    }).catch((error) => {
      if (error.response.data.statusCode === 400) {
        let message: string = error.response.data.message[0];

        // Capitalize first letter
        message = message.charAt(0).toUpperCase() + message.slice(1);

        throw new Error(message);
      }

      throw error;
    });

    return response.data as AuthData;
  }
}
