import { createContext } from 'react';

export type AuthContextProps = {
  accessToken: string;
  userId: number;
  login: (accessToken: string, userId: number) => void;
  logout: () => void;
  isAuthenticated: boolean;
};

export const AuthContext = createContext<AuthContextProps>({
  accessToken: '',
  userId: NaN,
  login: () => {
    throw new Error('Auth login is unset');
  },
  logout: () => {
    throw new Error('Auth logout is unset');
  },
  isAuthenticated: false,
});
