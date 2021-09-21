import axios, { AxiosResponse, Method } from 'axios';
import { useCallback, useState } from 'react';

export const useHttp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const request = useCallback(
    async (
      url: string,
      method: Method = 'GET',
      body = null,
      headers = {}
    ): Promise<AxiosResponse> => {
      setLoading(true);
      try {
        const response = await axios({
          url,
          data: body,
          method,
          headers,
        });

        setLoading(false);

        return response;
      } catch (e) {
        setLoading(false);
        setError(e.message);
        throw e;
      }
    },
    []
  );

  const clearError = useCallback(() => setError(''), []);

  return { loading, request, error, clearError };
};
