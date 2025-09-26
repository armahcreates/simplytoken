'use client'

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const navigationItems = [
  { name: 'Asset Readiness', href: '/asset-readiness' },
  { name: 'Community Management', href: '/community-management' },
  { name: 'Governance Tools', href: '/governance-tools' },
  { name: 'Capital Formation', href: '/capital-formation' },
  { name: 'Partner Network', href: '/partner-network' },
];

export function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex space-x-8">
          {navigationItems.map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'relative py-4 px-1 text-sm font-medium transition-colors',
                  isActive
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-700 hover:text-blue-600'
                )}
              >
                {item.name}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
