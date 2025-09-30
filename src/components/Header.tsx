'use client'

import { useState } from 'react';
import { toast } from 'sonner';
import { Bell, HelpCircle, Search } from 'lucide-react';
import { UserButton } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Input } from '@/components/ui/input';
import { MetricsDashboard } from './MetricsDashboard';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';

export function Header() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      toast.info(`Searching for: ${searchQuery}`);
      // In a real app, this would trigger a search
      console.log('Search query:', searchQuery);
    }
  };

  const handleNotificationsClick = () => {
    setShowNotifications(!showNotifications);
    toast.info('Opening notifications');
  };

  const handleHelpClick = () => {
    toast.info('Opening help center');
    // In a real app, this would open help documentation or support chat
  };

  // Mock notifications
  const notifications = [
    { id: 1, title: 'Proposal Vote Ending Soon', message: 'Vote on "Dividend Distribution Policy" ends in 2 hours', time: '2h ago', unread: true },
    { id: 2, title: 'Document Uploaded', message: 'New compliance document has been uploaded', time: '5h ago', unread: true },
    { id: 3, title: 'Assessment Complete', message: 'Your asset readiness assessment is ready', time: '1d ago', unread: false },
  ];

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
      <SidebarTrigger className="sm:hidden" />

      <form onSubmit={handleSearch} className="relative ml-auto flex-1 md:grow-0">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
        />
      </form>

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="ghost" size="icon" className="h-8 w-8 relative">
            <Bell className="h-5 w-5" />
            {notifications.filter(n => n.unread).length > 0 && (
              <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full" />
            )}
            <span className="sr-only">Notifications</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80" align="end">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Notifications</h3>
              <Badge variant="secondary">{notifications.filter(n => n.unread).length} new</Badge>
            </div>
            <div className="space-y-2">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-3 rounded-lg border ${notification.unread ? 'bg-blue-50 border-blue-200' : 'bg-muted/50'}`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-medium">{notification.title}</p>
                      <p className="text-xs text-muted-foreground mt-1">{notification.message}</p>
                    </div>
                    {notification.unread && (
                      <span className="h-2 w-2 bg-blue-500 rounded-full mt-1" />
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">{notification.time}</p>
                </div>
              ))}
            </div>
          </div>
        </PopoverContent>
      </Popover>

      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleHelpClick}>
        <HelpCircle className="h-5 w-5" />
        <span className="sr-only">Help</span>
      </Button>

      <MetricsDashboard />

      <UserButton
        appearance={{
          elements: {
            avatarBox: 'h-8 w-8',
          },
        }}
        afterSignOutUrl="/login"
      />
    </header>
  );
}
