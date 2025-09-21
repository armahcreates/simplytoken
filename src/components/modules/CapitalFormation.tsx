import { Link, useLocation } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FundraisingProgress } from '@/components/modules/capital-formation/FundraisingProgress';
import { CapitalStructure } from '@/components/modules/capital-formation/CapitalStructure';
import { InvestorMatching } from '@/components/modules/capital-formation/InvestorMatching';
import { Reports } from '@/components/modules/capital-formation/Reports';
import { Settings } from '@/components/modules/capital-formation/Settings';
import { Dashboard } from '@/components/modules/capital-formation/Dashboard';
import { cn } from '@/lib/utils';
import { BarChart3, Users, TrendingUp, FileText, Settings as SettingsIcon, Lightbulb, LayoutDashboard } from 'lucide-react';

const subNavigation = [
  { name: 'Dashboard', href: '/capital-formation', icon: LayoutDashboard },
  { name: 'Capital Structure', href: '/capital-formation/capital-structure', icon: BarChart3 },
  { name: 'Investor Matching', href: '/capital-formation/investor-matching', icon: Users },
  { name: 'Fundraising Progress', href: '/capital-formation/fundraising-progress', icon: TrendingUp },
  { name: 'Reports', href: '/capital-formation/reports', icon: FileText },
  { name: 'Settings', href: '/capital-formation/settings', icon: SettingsIcon },
];

export function CapitalFormation() {
  const location = useLocation();
  const currentPath = location.pathname;

  let content;
  switch (currentPath) {
    case '/capital-formation/capital-structure':
      content = <CapitalStructure />;
      break;
    case '/capital-formation/investor-matching':
      content = <InvestorMatching />;
      break;
    case '/capital-formation/fundraising-progress':
      content = <FundraisingProgress />;
      break;
    case '/capital-formation/reports':
      content = <Reports />;
      break;
    case '/capital-formation/settings':
      content = <Settings />;
      break;
    default:
      content = <Dashboard />;
      break;
  }

  return (
    <div className="space-y-6">
      {/* Mobile Navigation */}
      <div className="md:hidden">
        <nav className="flex overflow-x-auto gap-2 pb-2">
          {subNavigation.map(item => {
            const isActive = item.href === currentPath || (item.href === '/capital-formation' && currentPath === '/capital-formation');
            return (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  'flex items-center gap-2 rounded-lg px-3 py-2 text-sm whitespace-nowrap transition-all hover:text-primary',
                  isActive && 'bg-muted text-primary'
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.name}
              </Link>
            )
          })}
        </nav>
      </div>
      
      {/* Desktop Layout */}
      <div className="hidden md:grid md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr] gap-6">
        <div className="flex flex-col gap-6">
          <nav className="grid gap-1 text-sm text-muted-foreground">
          {subNavigation.map(item => {
            const isActive = item.href === currentPath || (item.href === '/capital-formation' && currentPath === '/capital-formation');
            return (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary',
                  isActive && 'bg-muted text-primary'
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.name}
              </Link>
            )
          })}
        </nav>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-yellow-500" />
              Fundraising Tips
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground space-y-2">
            <p>Update your investor profile to improve matching accuracy.</p>
            <p>Complete all required documentation for faster processing.</p>
            <Button variant="link" className="p-0 h-auto mt-2">View all tips</Button>
          </CardContent>
        </Card>
        </div>
        <div className="flex-1">
          {content}
        </div>
      </div>
      
      {/* Mobile Content */}
      <div className="md:hidden">
        {content}
      </div>
    </div>
  );
}
