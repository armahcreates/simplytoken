'use client'

import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
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
import { ProgressBreadcrumb } from './ProgressBreadcrumb';
import { OnboardingOverlay } from './OnboardingOverlay';
import { useJourney } from '@/contexts/JourneyContext';
import {
  Building2,
  Users,
  TrendingUp,
  Settings,
  LogOut,
  LayoutDashboard,
  Circle,
  Archive,
  Shield
} from 'lucide-react';

// Four-phase journey configuration
const phases = [
  {
    id: 'simply-ready',
    name: 'SimplyReady',
    href: '/asset-readiness',
    icon: Building2,
    description: 'Assess asset readiness to ensure your token launch meets investor standards.',
    completed: false
  },
  {
    id: 'simply-engage',
    name: 'SimplyEngage',
    href: '/community-management',
    icon: Users,
    description: 'Build and manage your community whitelist for targeted investor outreach.',
    completed: false
  },
  {
    id: 'simply-govern',
    name: 'SimplyGovern',
    href: '/governance-tools',
    icon: Shield,
    description: 'Establish governance structures and compliance frameworks.',
    completed: false
  },
  {
    id: 'simply-raise',
    name: 'SimplyRaise',
    href: '/capital-formation',
    icon: TrendingUp,
    description: 'Execute your capital formation strategy and manage investor relations.',
    completed: false
  },
];

const navigationItems = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Partner Network', href: '/partner-network', icon: Users },
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
  const pathname = usePathname();
  const { journeyState, dismissFirstLogin, getVisiblePhases, getArchivedPhases } = useJourney();

  const visiblePhases = getVisiblePhases();
  const archivedPhases = getArchivedPhases();

  return (
    <SidebarProvider>
      <OnboardingOverlay isFirstLogin={journeyState.isFirstLogin} onDismiss={dismissFirstLogin} />
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center justify-center py-4">
            <h1 className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-[#0A1F44] via-[#D4AF37] to-[#0A1F44] bg-clip-text text-transparent">
              SimplyToken™
            </h1>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {navigationItems.map((item) => {
              const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
              return (
                <SidebarMenuItem key={item.name}>
                  <Link href={item.href} className="w-full">
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

          {/* Four-Phase Journey */}
          <SidebarGroup>
            <SidebarGroupLabel>Journey Phases</SidebarGroupLabel>
            <SidebarMenu>
              {visiblePhases.map((phase) => {
                const phaseConfig = phases.find(p => p.id === phase.id);
                if (!phaseConfig) return null;

                const isActive = pathname.startsWith(phaseConfig.href);
                const isCompleted = phase.completed;
                return (
                  <SidebarMenuItem key={phase.id}>
                    <Link href={phaseConfig.href} className="w-full">
                      <SidebarMenuButton
                        isActive={isActive}
                        tooltip={{children: `${phaseConfig.name}: ${phaseConfig.description}`}}
                        className={isCompleted ? 'bg-green-50 text-green-700' : ''}
                      >
                        <phaseConfig.icon className={isCompleted ? 'text-green-500' : ''} />
                        <span className="flex items-center gap-2">
                          {phaseConfig.name}
                          {isCompleted && <Circle className="w-2 h-2 fill-current text-green-500" />}
                        </span>
                      </SidebarMenuButton>
                    </Link>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroup>

          {/* Archive Dropdown for Completed Phases */}
          {archivedPhases.length > 0 && (
            <>
              <SidebarSeparator />
              <SidebarGroup>
                <SidebarGroupLabel>Archive</SidebarGroupLabel>
                <SidebarMenu>
                  {archivedPhases.map((phase) => {
                    const phaseConfig = phases.find(p => p.id === phase.id);
                    if (!phaseConfig) return null;

                    return (
                      <SidebarMenuItem key={`archived-${phase.id}`}>
                        <Link href={phaseConfig.href} className="w-full">
                          <SidebarMenuButton tooltip={{children: `${phaseConfig.name}: ${phaseConfig.description}`}}>
                            <Archive className="w-4 h-4" />
                            <span>{phaseConfig.name}</span>
                          </SidebarMenuButton>
                        </Link>
                      </SidebarMenuItem>
                    );
                  })}
                </SidebarMenu>
              </SidebarGroup>
            </>
          )}

          <SidebarSeparator />
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
                <SidebarMenuButton tooltip={{children: "Logout"}} asChild>
                  <a href="/login">
                    <LogOut />
                    <span>Logout</span>
                  </a>
                </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <ProgressBreadcrumb />
        <Header />
        <main className="flex-1 p-4 sm:px-6 sm:py-0 gap-4">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
