import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { DayPicker, type DayContentProps } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { format, addMonths, subMonths } from 'date-fns';
import { faker } from '@faker-js/faker';
import {
  ChevronLeft,
  ChevronRight,
  Filter,
  Plus,
  Mail,
  UserPlus,
  QrCode,
  Download,
  MoreVertical,
  ArrowUp,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const events = [
  { date: new Date(2023, 6, 11), title: 'Project Update', color: 'bg-blue-500' },
  { date: new Date(2023, 6, 15), title: 'Town Hall', color: 'bg-green-500' },
  { date: new Date(2023, 6, 22), title: 'Investor Mixer', color: 'bg-purple-500' },
];

const upcomingEvents = [
    { name: 'Town Hall Meeting', type: 'Community Update', date: 'Jul 15, 2023', time: '2:00 PM - 3:30 PM', location: 'Virtual (Zoom)', registered: 78, total: 150 },
    { name: 'Investor Mixer', type: 'Networking', date: 'Jul 22, 2023', time: '6:30 PM - 8:30 PM', location: 'The Grand Hotel', registered: 45, total: 75 },
    { name: 'Governance Workshop', type: 'Education', date: 'Aug 5, 2023', time: '10:00 AM - 12:00 PM', location: 'Virtual (Zoom)', registered: 32, total: 100 },
];

const recentRegistrations = [
    { name: 'Michael Chen', time: 'Registered 2 hours ago', status: 'Confirmed' },
    { name: 'Sarah Johnson', time: 'Registered 3 hours ago', status: 'Confirmed' },
    { name: 'Robert Kim', time: 'Registered 5 hours ago', status: 'Pending' },
    { name: 'Jennifer Lopez', time: 'Registered yesterday', status: 'Confirmed' },
];

const eventTypeDistribution = [
    { name: 'Community Updates', value: 42, color: 'bg-blue-500' },
    { name: 'Networking', value: 28, color: 'bg-purple-500' },
    { name: 'Education', value: 18, color: 'bg-green-500' },
    { name: 'Governance', value: 12, color: 'bg-yellow-500' },
];

const StatusBadge = ({ status }: { status: string }) => {
    const isConfirmed = status === 'Confirmed';
    return (
        <Badge variant="outline" className={cn(
            'font-medium text-xs',
            isConfirmed ? 'bg-green-100 text-green-800 border-green-200' : 'bg-yellow-100 text-yellow-800 border-yellow-200'
        )}>
            {status}
        </Badge>
    );
};

export function Events() {
  const [month, setMonth] = React.useState(new Date(2023, 6, 1));

  const CustomDayContent = (props: DayContentProps) => {
    const dayEvents = events.filter(e => e.date.toDateString() === props.date.toDateString());

    return (
        <div className="relative">
            <span>{props.date.getDate()}</span>
            {dayEvents.length > 0 && (
                <div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex gap-1">
                    {dayEvents.map(event => (
                        <div key={event.title} className={cn("h-1.5 w-1.5 rounded-full", event.color)}></div>
                    ))}
                </div>
            )}
        </div>
    );
  };
  
  return (
    <div className="space-y-6 pt-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Event Calendar</CardTitle>
                <p className="text-sm text-muted-foreground">Create, manage, and track community events</p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" onClick={() => setMonth(subMonths(month, 1))}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="text-sm font-medium">{format(month, 'MMMM yyyy')}</span>
                <Button variant="ghost" size="icon" onClick={() => setMonth(addMonths(month, 1))}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
                <ToggleGroup type="single" defaultValue="month" className="ml-4">
                    <ToggleGroupItem value="month" className="h-8 px-3">Month</ToggleGroupItem>
                    <ToggleGroupItem value="week" className="h-8 px-3">Week</ToggleGroupItem>
                    <ToggleGroupItem value="day" className="h-8 px-3">Day</ToggleGroupItem>
                </ToggleGroup>
              </div>
            </CardHeader>
            <CardContent>
              <style>{`
                .rdp-day { position: relative; }
                .rdp-day_selected { background-color: hsl(var(--primary)) !important; color: hsl(var(--primary-foreground)) !important; }
                .rdp-button:hover:not([disabled]):not(.rdp-day_selected) { background-color: hsl(var(--accent)); }
              `}</style>
              <DayPicker
                month={month}
                onMonthChange={setMonth}
                mode="single"
                showOutsideDays
                fixedWeeks
                className="w-full"
                components={{
                    DayContent: CustomDayContent
                }}
              />
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Upcoming Events</CardTitle>
                <Button variant="link" className="p-0 h-auto">View All</Button>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>EVENT NAME</TableHead>
                            <TableHead>DATE & TIME</TableHead>
                            <TableHead>LOCATION</TableHead>
                            <TableHead>REGISTRATIONS</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {upcomingEvents.map(event => (
                            <TableRow key={event.name}>
                                <TableCell>
                                    <p className="font-medium">{event.name}</p>
                                    <p className="text-xs text-muted-foreground">{event.type}</p>
                                </TableCell>
                                <TableCell>
                                    <p>{event.date}</p>
                                    <p className="text-xs text-muted-foreground">{event.time}</p>
                                </TableCell>
                                <TableCell>{event.location}</TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-2">
                                        <Progress value={(event.registered / event.total) * 100} className="w-24 h-2" />
                                        <span className="text-sm font-medium">{event.registered} / {event.total}</span>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Registration Management</CardTitle>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm"><Filter className="mr-2 h-4 w-4" />Filter</Button>
                    <Button size="sm"><Plus className="mr-2 h-4 w-4" />Create Event</Button>
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                <div>
                    <label className="text-sm font-medium">Select Event</label>
                    <Select defaultValue="town-hall">
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="town-hall">Town Hall Meeting - Jul 15</SelectItem>
                            <SelectItem value="investor-mixer">Investor Mixer - Jul 22</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div>
                    <div className="flex justify-between items-center mb-2">
                        <h4 className="text-sm font-medium">Recent Registrations</h4>
                        <Button variant="link" className="p-0 h-auto text-xs">Export List</Button>
                    </div>
                    <div className="space-y-3">
                        {recentRegistrations.map((reg, i) => (
                            <div key={i} className="flex items-center gap-3">
                                <Avatar className="h-9 w-9">
                                    <AvatarImage src={`https://i.pravatar.cc/40?u=${reg.name}`} />
                                    <AvatarFallback>{reg.name.substring(0,2)}</AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                    <p className="font-medium text-sm">{reg.name}</p>
                                    <p className="text-xs text-muted-foreground">{reg.time}</p>
                                </div>
                                <StatusBadge status={reg.status} />
                                <Button variant="ghost" size="icon" className="h-8 w-8"><MoreVertical className="h-4 w-4" /></Button>
                            </div>
                        ))}
                    </div>
                </div>
                <div>
                    <h4 className="text-sm font-medium mb-2">Registration Actions</h4>
                    <div className="grid grid-cols-2 gap-3">
                        <Button variant="outline"><Mail className="mr-2 h-4 w-4" />Send Reminder</Button>
                        <Button variant="outline"><UserPlus className="mr-2 h-4 w-4" />Add Attendee</Button>
                        <Button variant="outline"><QrCode className="mr-2 h-4 w-4" />Generate QR</Button>
                        <Button variant="outline"><Download className="mr-2 h-4 w-4" />Export Attendees</Button>
                    </div>
                </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>Event Analytics</CardTitle></CardHeader>
            <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 rounded-lg bg-gray-50">
                        <p className="text-sm text-muted-foreground">Total Events</p>
                        <p className="text-2xl font-bold">12</p>
                        <p className="text-xs text-green-600 flex items-center gap-1"><ArrowUp className="h-3 w-3" /> 3 from last month</p>
                    </div>
                    <div className="p-3 rounded-lg bg-gray-50">
                        <p className="text-sm text-muted-foreground">Total Registrations</p>
                        <p className="text-2xl font-bold">324</p>
                        <p className="text-xs text-green-600 flex items-center gap-1"><ArrowUp className="h-3 w-3" /> 18% from last month</p>
                    </div>
                </div>
                <div>
                    <h4 className="text-sm font-medium mb-1">Attendance Rate</h4>
                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                        <span>Average</span>
                        <span>78%</span>
                    </div>
                    <Progress value={78} className="h-2" />
                    <p className="text-xs text-muted-foreground text-right mt-1">Target: 80%</p>
                </div>
                <div>
                    <h4 className="text-sm font-medium mb-2">Event Type Distribution</h4>
                    <div className="space-y-2">
                        {eventTypeDistribution.map(item => (
                            <div key={item.name} className="flex items-center justify-between text-sm">
                                <div className="flex items-center gap-2">
                                    <div className={cn("h-2.5 w-2.5 rounded-full", item.color)}></div>
                                    <span>{item.name}</span>
                                </div>
                                <span>{item.value}%</span>
                            </div>
                        ))}
                    </div>
                </div>
                <Button variant="outline" className="w-full">View Detailed Analytics</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
