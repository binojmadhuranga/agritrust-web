'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FaLeaf, FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';
import { useAppSelector } from '@/app/hooks/useAppSelector';
import { useAppDispatch } from '@/app/hooks/useAppDispatch';
import { logoutUser } from '@/app/features/authThunks';

export default function Navbar() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogout = async () => {
    await dispatch(logoutUser()).unwrap();
    router.push('/login');
  };

  return (
    <nav className="bg-green-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <FaLeaf className="text-2xl" />
            <span className="font-bold text-xl">AgriTrust</span>
          </Link>

          {/* Auth Button */}
          {mounted && isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-6 py-2 bg-white text-green-600 rounded-md hover:bg-green-50 transition-colors font-medium"
            >
              <FaSignOutAlt />
              <span>Logout</span>
            </button>
          ) : (
            <Link 
              href="/login" 
              className="flex items-center space-x-2 px-6 py-2 bg-white text-green-600 rounded-md hover:bg-green-50 transition-colors font-medium"
            >
              <FaSignInAlt />
              <span>Login</span>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
