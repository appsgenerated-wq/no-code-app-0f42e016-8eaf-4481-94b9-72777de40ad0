import React, { useState, useEffect } from 'react';
import Manifest from '@mnfst/sdk';
import LandingPage from './screens/LandingPage';
import DashboardPage from './screens/DashboardPage';
import { testBackendConnection } from './services/apiService';
import './index.css';

function App() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [backendConnected, setBackendConnected] = useState(false);
  const manifest = new Manifest();

  useEffect(() => {
    const checkConnectionAndSession = async () => {
      console.log('🚀 [APP] Starting backend connection test...');
      const connectionResult = await testBackendConnection();
      setBackendConnected(connectionResult.success);

      if (connectionResult.success) {
        console.log('✅ [APP] Backend connection successful.');
        try {
          const currentUser = await manifest.from('User').me();
          if (currentUser) {
            setUser(currentUser);
            console.log('✅ [APP] User session found.', currentUser);
          }
        } catch (error) {
          console.log('ℹ️ [APP] No active user session.');
          setUser(null);
        } finally {
          setIsLoading(false);
        }
      } else {
        console.error('❌ [APP] Backend connection failed.');
        setIsLoading(false);
      }
    };

    checkConnectionAndSession();
  }, []);

  const handleLogin = async (email, password) => {
    try {
      await manifest.login(email, password);
      const currentUser = await manifest.from('User').me();
      setUser(currentUser);
    } catch (error) {
      console.error('Login failed:', error);
      alert('Login failed. Please check your credentials.');
    }
  };

  const handleLogout = async () => {
    await manifest.logout();
    setUser(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
      <div className="fixed top-4 right-4 z-50 flex items-center space-x-2 bg-white px-3 py-1 rounded-full shadow-md">
        <div className={`w-3 h-3 rounded-full ${backendConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
        <span className="text-sm text-gray-600 font-medium">{backendConnected ? 'API Connected' : 'API Error'}</span>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center min-h-screen">
           <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-orange-500"></div>
        </div>
      ) : user ? (
        <DashboardPage user={user} onLogout={handleLogout} />
      ) : (
        <LandingPage onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;
