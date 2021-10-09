import React, { useState } from 'react';
import { Link } from '../../../../models/Link';
import './LinksListItem.scss';

type LinkDataProps = {
  link: Link;
};

export const LinksListItem: React.FC<LinkDataProps> = (props) => {
  const [linkCopied, setLinkCopied] = useState(false);

  const link = props.link;

  const copyHandler = async () => {
    await navigator.clipboard.writeText(link.shortUrl);

    setLinkCopied(true);

    setTimeout(() => {
      setLinkCopied(false);
    }, 5000);
  };

  return (
    <div className="link-data">
      <div className="link-action-buttons-block">
        <button
          className="copy-button link-action-button"
          onClick={copyHandler}
        >
          {linkCopied ? 'Copied!' : 'Copy'}
        </button>
        <button className="delete-button link-action-button">Delete</button>
      </div>
      <h3 className="link-name">{link.name}</h3>
      <p className="link-short-url">
        Short link: <a href={link.shortUrl}>{link.shortUrl}</a>
      </p>
      <p className="link-original-url">
        Original link: <a href={link.originalUrl}>{link.originalUrl}</a>
      </p>
      <p className="link-follow-count">Follow count: {link.followCount}</p>
      <p>
        <a className="text-secondary" href={`/link/${link.id}`}>
          More information
        </a>
      </p>
    </div>
  );
};
