import axios from 'axios';
import { Link, LinkBackendData, LinkFactory } from '../models/Link';

export class LinksService {
  // TODO: LinksService.getLinksByOnwerId() request error handling
  static async getLinksByOwnerId(
    ownerId: number,
    accessToken: string
  ): Promise<Link[]> {
    const response = await axios({
      url: 'links',
      method: 'GET',
      params: { ownerId },
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    const links: Link[] = response.data.map((link: LinkBackendData) =>
      LinkFactory.createFromBackendData(link)
    );

    return links;
  }

  // TODO: LinksService.create() request error handling
  static async create(
    name: string,
    url: string,
    ownerId: number,
    accessToken: string
  ): Promise<Link> {
    const response = await axios({
      url: 'links',
      method: 'POST',
      data: {
        name,
        originalUrl: url,
        owner: ownerId,
      },
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    const link = LinkFactory.createFromBackendData(response.data);
    return link;
  }
}
