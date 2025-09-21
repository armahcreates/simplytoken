import { ReactNode } from 'react';
import { useLocation, Link } from 'react-router-dom';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarInset,
  SidebarSeparator,
  SidebarGroup,
  SidebarGroupLabel,
} from '@/components/ui/sidebar';
import { Header } from './Header';
import {
  Building2,
  Users,
  TrendingUp,
  Settings,
  LogOut,
  LayoutDashboard,
  Circle
} from 'lucide-react';

const navigationItems = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Asset Readiness', href: '/asset-readiness', icon: Building2 },
  { name: 'Community Management', href: '/community-management', icon: Users },
  { name: 'Capital Formation', href: '/capital-formation', icon: TrendingUp },
];

const currentProjects = [
    { name: 'Harmony Residences', active: true },
    { name: 'Nexus Commercial', active: false },
    { name: 'Terra Fund III', active: false },
]

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const location = useLocation();

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center justify-center py-4">
            <h1 className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
              Simply Token
            </h1>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {navigationItems.map((item) => {
              const isActive = location.pathname === item.href || (item.href !== '/' && location.pathname.startsWith(item.href));
              return (
                <SidebarMenuItem key={item.name}>
                  <Link to={item.href} className="w-full">
                    <SidebarMenuButton isActive={isActive} tooltip={{children: item.name}}>
                      <item.icon />
                      <span>{item.name}</span>
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
          <SidebarSeparator />
          <SidebarGroup>
            <SidebarGroupLabel>Current Projects</SidebarGroupLabel>
            <SidebarMenu>
                {currentProjects.map((project) => (
                    <SidebarMenuItem key={project.name}>
                        <SidebarMenuButton tooltip={{children: project.name}}>
                            <Circle className={project.active ? 'text-green-500 fill-current' : 'text-muted-foreground'}/>
                            <span>{project.name}</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                ))}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
                <SidebarMenuButton tooltip={{children: "Settings"}}>
                    <Settings />
                    <span>Settings</span>
                </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
                <SidebarMenuButton tooltip={{children: "Logout"}}>
                    <LogOut />
                    <span>Logout</span>
                </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <Header />
        <main className="flex-1 p-4 sm:px-6 sm:py-0 gap-4">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
