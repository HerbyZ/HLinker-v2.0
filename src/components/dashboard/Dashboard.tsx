import React from 'react';
import { CreateLinkForm } from './create-link-block/CreateLinkForm';
import { LinksListBlock } from './links-list-block/LinksListBlock';
import './Dashboard.scss';

export const Dashboard: React.FC = () => {
  return (
    <div className="dashboard__wrapper">
      <h1>Welcome back!</h1>
      <div className="dashboard">
        <div className="dashboard-block-outline create-link-block">
          <h2 className="dashboard-block__header">Create new short link</h2>
          <CreateLinkForm />
        </div>
        <div className="dashboard-block links-block">
          <a className="links-page-hint" href="/links">
            Watch all your links
          </a>
          <h2 className="dashboard-block__header">Your links</h2>
          <LinksListBlock />
        </div>
      </div>
    </div>
  );
};
