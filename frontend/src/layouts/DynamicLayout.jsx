import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { userService } from '../services/userService';

import MainLayout from './MainLayout';
import AdminLayout from './AdminLayout';
// import CoferarLayout from './CoferarLayout'; soon

export const DynamicLayout = ({ children }) => {
  // State to hold the user data once loaded
  const [user, setUser] = useState(null);
  // State to track if we're still loading
  const [loading, setLoading] = useState(true);
  
  // This allows us to use DynamicLayout both directly with children
  // and in router configuration with <Outlet />
  const content = children || <Outlet />;
  
  // Load user data when the component mounts
  useEffect(() => {
    const loadUser = async () => {
      try {
        // Call the async function and await its result
        const userData = await userService.getCurrentUser();
        console.log('User data loaded:', userData);
        setUser(userData);
      } catch (error) {
        console.error('Error loading user:', error);
      } finally {
        // Always set loading to false when done
        setLoading(false);
      }
    };
    
    loadUser();
  }, []);
  
  // Show loading indicator while fetching user data
  if (loading) {
    return (
      <MainLayout>
        <div className="flex justify-center items-center p-4">
          <p>Loading...</p>
        </div>
      </MainLayout>
    );
  }
  
  // If no user found after loading, use MainLayout
  if (!user) {
    console.log('No user found, using MainLayout');
    return (
      <MainLayout>
        {content}
      </MainLayout>
    );
  }
  
  // Check the role from the loaded user data
  console.log('User role:', user.role);
  
  // Convert to string and lowercase to ensure matching works
  const role = String(user.role || '').toLowerCase().trim();
  
  // Simply check if normalized role is exactly 'admin'
  if (role === 'admin') {
    console.log('Using AdminLayout for admin user');
    return (
      <AdminLayout>
        {content}
      </AdminLayout>
    );
  }
  
  // Default to MainLayout for any other role
  console.log('Using MainLayout for non-admin user');
  return (
    <MainLayout>
      {content}
    </MainLayout>
  );
};

export default DynamicLayout;