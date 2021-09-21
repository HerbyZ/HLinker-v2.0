import { useState, useCallback, useEffect } from 'react';

const storageName = 'userData';

export const useAuth = () => {
  const [accessToken, setAccessToken] = useState('');
  const [userId, setUserId] = useState(NaN);

  const login = useCallback((accessToken: string, id: number) => {
    setAccessToken(accessToken);
    setUserId(id);

    localStorage.setItem(
      storageName,
      JSON.stringify({
        userId: id,
        accessToken,
      })
    );
  }, []);

  const logout = useCallback(() => {
    setAccessToken('');
    setUserId(NaN);
    localStorage.removeItem(storageName);
  }, []);

  useEffect(() => {
    const item = localStorage.getItem(storageName);
    if (!item) {
      return;
    }

    const data = JSON.parse(item);
    if (data && data.accessToken) {
      login(data.accessToken, data.userId);
    }
  }, [login]);

  return { login, logout, accessToken, userId };
};
