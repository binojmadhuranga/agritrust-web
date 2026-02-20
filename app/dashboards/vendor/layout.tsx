'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/app/components/Navbar';
import { useAppSelector } from '@/app/hooks/useAppSelector';

export default function VendorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { isAuthenticated, role } = useAppSelector((state) => state.auth);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    } else if (role && role.toLowerCase() !== 'vendor') {
      // Redirect to correct dashboard if wrong role
      router.push(`/dashboards/${role.toLowerCase()}`);
    } else {
      setIsChecking(false);
    }
  }, [isAuthenticated, role, router]);

  if (isChecking || !isAuthenticated) {
    return null;
  }

  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
