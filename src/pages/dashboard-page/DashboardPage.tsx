import React from 'react';
import { useTitle } from '../../hooks/title.hook';
import { Dashboard } from './components/dashboard/Dashboard';

export const DashboardPage: React.FC = () => {
  useTitle('Dashboard - HLinker');

  return (
    <div className="dashboard-page">
      <Dashboard />
    </div>
  );
};
