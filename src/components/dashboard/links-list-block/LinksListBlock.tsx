import React from 'react';
import { useLinks } from '../../../hooks/links.hook';
import { LinksListItem } from './links-list-item/LinksListItem';
import './LinksListBlock.scss';

export const LinksListBlock: React.FC = () => {
  const { links } = useLinks();

  return (
    <div className="dashboard-links-list__wrapper">
      <ul className="dashboard-links-list">
        {links.map((link) => (
          <li className="dashboard-link-list__item" key={link.id}>
            <LinksListItem link={link} />
          </li>
        ))}
      </ul>
    </div>
  );
};
