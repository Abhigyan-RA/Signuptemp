import React from 'react';
import { useUser } from '@clerk/clerk-react';

function Dashboard() {
  const { user } = useUser();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Welcome to the  Lagoon's Dashboard</h1>
      {user && <p>Hello, {user.username || user.emailAddresses[0].emailAddress}!</p>}
    </div>
  );
}

export default Dashboard;
