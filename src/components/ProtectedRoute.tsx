'use client'

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Public routes that don't require authentication
  const publicRoutes = ['/login', '/signup'];

  // Routes that require onboarding to be completed
  const protectedRoutes = ['/', '/asset-readiness', '/community-management', '/governance-tools', '/capital-formation', '/partner-network'];

  useEffect(() => {
    const checkAuth = () => {
      const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route));

      // Allow public routes without auth check
      if (isPublicRoute) {
        setIsAuthorized(true);
        setIsLoading(false);
        return;
      }

      // Check for user authentication
      const storedUser = localStorage.getItem('simplytoken_user');

      if (!storedUser) {
        // Not logged in, redirect to login
        router.push('/login');
        return;
      }

      try {
        const user = JSON.parse(storedUser);

        // If user hasn't completed onboarding and trying to access protected route
        if (!user.hasCompletedOnboarding && protectedRoutes.some(route => pathname.startsWith(route))) {
          router.push('/onboarding');
          return;
        }

        // If user has completed onboarding and trying to access onboarding page
        if (user.hasCompletedOnboarding && pathname.startsWith('/onboarding')) {
          router.push('/');
          return;
        }

        setIsAuthorized(true);
      } catch (error) {
        console.error('Failed to parse user data:', error);
        localStorage.removeItem('simplytoken_user');
        router.push('/login');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [pathname, router]);

  // Show loading state while checking authorization
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Only render children if authorized
  return isAuthorized ? <>{children}</> : null;
}
