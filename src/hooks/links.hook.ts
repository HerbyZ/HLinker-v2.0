import { useState, useContext, useCallback, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link, LinkBackendData, LinkFactory } from '../models/Link';
import { useHttp } from './http.hook';

export const useLinks = (refreshTime: number = 5000) => {
  const [links, setLinks] = useState<Link[]>([]);
  const { request } = useHttp();
  const { accessToken, userId } = useContext(AuthContext);

  const updateLinks = useCallback(async () => {
    try {
      const response = await request(
        'links',
        'GET',
        { owner: userId },
        { Authorization: `Bearer ${accessToken}` }
      );

      const links: Link[] = response.data.map((el: LinkBackendData) =>
        LinkFactory.createFromBackendData(el)
      );

      setLinks(links);
    } catch (e) {
      // TODO: Error handling
      throw e;
    }
  }, [accessToken, userId, request]);

  // Reloads links every 5000 ms by default
  useEffect(() => {
    updateLinks();

    setInterval(async () => {
      await updateLinks();
    }, refreshTime);
  }, [updateLinks, refreshTime]);

  return { links, updateLinks };
};
