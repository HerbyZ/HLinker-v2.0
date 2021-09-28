export interface Link {
  id: string;
  name: string;
  originalUrl: string;
  shortUrl: string;
  followCount: number;
  owner: string;
}

// Data from backend
export interface LinkBackendData extends Link {
  _id: string;
}

export class LinkFactory {
  static createFromBackendData(linkData: LinkBackendData): Link {
    linkData.shortUrl = `http://localhost:3232/l/${linkData.shortUrl}`;
    linkData.id = linkData._id;
    return linkData;
  }
}
