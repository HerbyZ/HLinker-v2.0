import { useState, useContext, useCallback, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from '../models/Link';
import { LinksService } from '../services/links.service';

export const useLinks = (refreshTime: number = 5000) => {
  const [links, setLinks] = useState<Link[]>([]);
  const { accessToken, userId } = useContext(AuthContext);

  const updateLinks = useCallback(async () => {
    try {
      const links = await LinksService.getLinksByOwnerId(userId, accessToken);

      setLinks(links);
    } catch (e) {
      // TODO: Error handling
      throw e;
    }
  }, [accessToken, userId]);

  // Reloads links every 5000 ms by default
  useEffect(() => {
    updateLinks();

    setInterval(async () => {
      await updateLinks();
    }, refreshTime);
  }, [updateLinks, refreshTime]);

  return { links, updateLinks };
};
