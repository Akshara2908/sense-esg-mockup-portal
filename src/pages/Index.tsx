import React, { useState } from 'react';
import Login from '@/components/Login';
import OrganizationDetails from '@/components/OrganizationDetails';
import ESGPortal from '@/components/ESGPortal';

interface User {
  email: string;
  name: string;
}

interface OrganizationData {
  name: string;
  location: string;
  employees: string;
}

const Index = () => {
  const [currentStep, setCurrentStep] = useState<'login' | 'organization' | 'portal'>('login');
  const [user, setUser] = useState<User | null>(null);
  const [organization, setOrganization] = useState<OrganizationData | null>(null);

  const handleLogin = (credentials: { email: string; password: string }) => {
    // In a real app, you would validate credentials with an API
    setUser({
      email: credentials.email,
      name: 'Admin User'
    });
    setCurrentStep('organization');
  };

  const handleOrganizationComplete = (data: OrganizationData) => {
    setOrganization(data);
    setCurrentStep('portal');
  };

  const handleLogout = () => {
    setUser(null);
    setOrganization(null);
    setCurrentStep('login');
  };

  if (currentStep === 'login') {
    return <Login onLogin={handleLogin} />;
  }

  if (currentStep === 'organization') {
    return <OrganizationDetails onComplete={handleOrganizationComplete} />;
  }

  if (currentStep === 'portal' && user && organization) {
    return <ESGPortal user={user} organization={organization} onLogout={handleLogout} />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div>Loading...</div>
    </div>
  );
};

export default Index;
