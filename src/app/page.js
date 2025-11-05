'use client';

import { useEffect, useState } from 'react';
import LoginPage from '@/components/LoginPage';
import StudentDashboard from '@/components/StudentDashboard';
import AdminDashboard from '@/components/AdminDashboard';
import Navbar from '@/components/Navbar';
import { clearUser, getStoredUser, getToken } from '@/lib/storage';
import { isTokenExpired } from '@/lib/jwt';

export default function Home() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = getStoredUser();
    const token = getToken();
    if (storedUser && token && !isTokenExpired(token)) {
      setUser(storedUser);
    } else {
      // ensure stale data is cleared
      clearUser();
    }
  }, []);

  if (!user) {
    return <LoginPage onLogin={setUser} />;
  }

  const handleLogout = () => {
    clearUser();
    setUser(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar user={user} onLogout={handleLogout} />
      <div className="max-w-7xl mx-auto p-4 md:p-6">
        {user.role === 'student' && <StudentDashboard userId={user.id} />}
        {(user.role === 'professor' || user.role === 'admin') && (
          <AdminDashboard userId={user.id} />
        )}
      </div>
    </div>
  );
}