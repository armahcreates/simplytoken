import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';
import {
  Users,
  LineChart as LineChartIcon,
  Clock,
  Download,
  Mail,
  ArrowUp,
  ArrowDown,
  Calendar,
  MessageSquare,
  Newspaper,
  UserPlus,
  BarChart2,
  Lightbulb,
  AlertTriangle,
  Send,
  PlusCircle,
  RefreshCw
} from 'lucide-react';

const engagementTrendData = Array.from({ length: 12 }, (_, i) => ({
  name: `Jun ${i * 3 + 1}`,
  openRate: Math.floor(Math.random() * (75 - 55 + 1) + 55),
  clickRate: Math.floor(Math.random() * (45 - 25 + 1) + 25),
}));

const communicationPerformanceData = [
  { message: 'Quarterly Update (Jun)', type: 'Email', date: 'Jun 15, 2023', recipients: 234, openRate: 76, clickRate: 42 },
  { message: 'Governance Poll', type: 'Newsletter', date: 'Jun 22, 2023', recipients: 156, openRate: 72, clickRate: 38 },
  { message: 'Town Hall Invitation', type: 'SMS', date: 'Jul 5, 2023', recipients: 78, openRate: 68, clickRate: 55 },
  { message: 'Construction Update', type: 'Email', date: 'Jul 10, 2023', recipients: 234, openRate: 65, clickRate: 36 },
];

const audienceSegmentsData = [
  { name: 'Token Holders', value: 72, color: '#3b82f6' },
  { name: 'Investors', value: 68, color: '#10b981' },
  { name: 'Property Managers', value: 54, color: '#f59e0b' },
  { name: 'Prospective Investors', value: 42, color: '#eab308' },
];

const scheduledMessages = [
    { title: 'Construction Update', time: 'Today, 10:00 AM', type: 'Email', recipients: 234, color: 'border-green-500' },
    { title: 'Quarterly Dividend Notice', time: 'Jul 12, 9:00 AM', type: 'Email', recipients: 156, color: 'border-blue-500' },
    { title: 'Town Hall Reminder', time: 'Jul 14, 3:00 PM', type: 'SMS', recipients: 78, color: 'border-purple-500' },
];

const MessageTypeBadge = ({ type }: { type: string }) => {
  const styles: { [key: string]: string } = {
    'Email': 'bg-blue-100 text-blue-800',
    'Newsletter': 'bg-green-100 text-green-800',
    'SMS': 'bg-purple-100 text-purple-800',
  };
  return <Badge variant="outline" className={`font-medium border-none ${styles[type]}`}>{type}</Badge>;
};

export function Analytics() {
  return (
    <div className="space-y-6 pt-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Community Analytics</h2>
          <p className="text-muted-foreground">Track engagement and performance metrics for your community</p>
        </div>
        <div className="flex items-center gap-2">
          <Select defaultValue="30-days">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7-days">Last 7 days</SelectItem>
              <SelectItem value="30-days">Last 30 days</SelectItem>
              <SelectItem value="90-days">Last 90 days</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="mr-2" /> Export
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Members</CardTitle>
                <Users className="h-5 w-5 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">876</div>
                <p className="text-xs text-green-600 flex items-center gap-1">
                  <ArrowUp className="h-3 w-3" /> +8.2% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Engagement Rate</CardTitle>
                <LineChartIcon className="h-5 w-5 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">42.3%</div>
                <p className="text-xs text-green-600 flex items-center gap-1">
                    <ArrowUp className="h-3 w-3" /> +3.5% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Message Open Rate</CardTitle>
                    <Mail className="h-5 w-5 text-purple-500" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">68.4%</div>
                    <p className="text-xs text-green-600 flex items-center gap-1">
                        <ArrowUp className="h-3 w-3" /> +4.2% from last month
                    </p>
                </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg. Response Time</CardTitle>
                <Clock className="h-5 w-5 text-orange-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">4.2h</div>
                <p className="text-xs text-red-600 flex items-center gap-1">
                    <ArrowDown className="h-3 w-3" /> 1.5h from last month
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Engagement Trends</CardTitle>
              <ToggleGroup type="single" defaultValue="all" className="h-8">
                <ToggleGroupItem value="all" className="text-xs px-3 py-1 h-auto">All</ToggleGroupItem>
                <ToggleGroupItem value="email" className="text-xs px-3 py-1 h-auto">Email</ToggleGroupItem>
                <ToggleGroupItem value="sms" className="text-xs px-3 py-1 h-auto">SMS</ToggleGroupItem>
                <ToggleGroupItem value="newsletter" className="text-xs px-3 py-1 h-auto">Newsletter</ToggleGroupItem>
              </ToggleGroup>
            </CardHeader>
            <CardContent className="h-[250px] w-full">
              <ResponsiveContainer>
                <LineChart data={engagementTrendData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" tickLine={false} axisLine={false} />
                  <YAxis tickLine={false} axisLine={false} unit="%" />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="openRate" name="Open Rate" stroke="#3b82f6" strokeWidth={2} dot={{ r: 4 }} />
                  <Line type="monotone" dataKey="clickRate" name="Click Rate" stroke="#10b981" strokeWidth={2} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Communication Performance</CardTitle>
                <Button variant="link" className="p-0 h-auto">View All</Button>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>MESSAGE</TableHead>
                            <TableHead>TYPE</TableHead>
                            <TableHead>DATE</TableHead>
                            <TableHead>RECIPIENTS</TableHead>
                            <TableHead>OPEN RATE</TableHead>
                            <TableHead>CLICK RATE</TableHead>
                            <TableHead>ACTIONS</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {communicationPerformanceData.map(item => (
                            <TableRow key={item.message}>
                                <TableCell className="font-medium">{item.message}</TableCell>
                                <TableCell><MessageTypeBadge type={item.type} /></TableCell>
                                <TableCell>{item.date}</TableCell>
                                <TableCell>{item.recipients}</TableCell>
                                <TableCell>{item.openRate}%</TableCell>
                                <TableCell>{item.clickRate}%</TableCell>
                                <TableCell><Button variant="link" className="p-0 h-auto">View</Button></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Audience Segments</CardTitle>
                <Button variant="link" className="p-0 h-auto">View Details</Button>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-6 items-center">
                <div className="h-[200px] w-full">
                    <ResponsiveContainer>
                        <PieChart>
                            <Pie data={audienceSegmentsData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={2}>
                                {audienceSegmentsData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                            </Pie>
                            <Legend layout="vertical" verticalAlign="middle" align="right" iconType="circle" />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                <div className="space-y-4">
                    <h3 className="font-semibold">Segment Performance</h3>
                    {audienceSegmentsData.map(item => (
                        <div key={item.name}>
                            <div className="flex justify-between text-sm mb-1">
                                <span className="font-medium">{item.name}</span>
                                <span className="text-muted-foreground">{item.value}% engagement</span>
                            </div>
                            <Progress value={item.value} className="h-2" style={{'--progress-color': item.color} as React.CSSProperties} />
                        </div>
                    ))}
                </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Sidebar */}
        <div className="lg:col-span-1 space-y-6">
            <Card>
                <CardHeader><CardTitle>Quick Actions</CardTitle></CardHeader>
                <CardContent className="grid grid-cols-2 gap-4">
                    <Button variant="outline" className="h-20 flex-col gap-1"><Mail className="h-6 w-6" />Create Message</Button>
                    <Button variant="outline" className="h-20 flex-col gap-1"><Calendar className="h-6 w-6" />Schedule Event</Button>
                    <Button variant="outline" className="h-20 flex-col gap-1"><Users className="h-6 w-6" />View Stakeholders</Button>
                    <Button variant="outline" className="h-20 flex-col gap-1"><Download className="h-6 w-6" />Export Report</Button>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Communication Insights</CardTitle>
                    <Button variant="ghost" size="sm"><RefreshCw className="mr-2 h-4 w-4" />Refresh</Button>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Alert className="bg-blue-50 border-blue-200 text-blue-800 [&>svg]:text-blue-500">
                        <Lightbulb className="h-4 w-4" />
                        <AlertTitle className="font-semibold">Best Time to Send</AlertTitle>
                        <AlertDescription>Based on your audience's engagement patterns, Tuesday and Thursday mornings (9-11 AM) show the highest open rates.</AlertDescription>
                    </Alert>
                    <Alert className="bg-green-50 border-green-200 text-green-800 [&>svg]:text-green-500">
                        <BarChart2 className="h-4 w-4" />
                        <AlertTitle className="font-semibold">Content Performance</AlertTitle>
                        <AlertDescription>Messages with project updates and financial performance data receive 35% more engagement than general announcements.</AlertDescription>
                    </Alert>
                    <Alert variant="destructive" className="bg-orange-50 border-orange-200 text-orange-800 [&>svg]:text-orange-500">
                        <AlertTriangle className="h-4 w-4" />
                        <AlertTitle className="font-semibold">Attention Required</AlertTitle>
                        <AlertDescription>Response time for investor inquiries has increased by 2.5 hours in the last week. Consider allocating more resources.</AlertDescription>
                    </Alert>
                </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Upcoming Communications</CardTitle>
                <Button variant="link" className="p-0 h-auto text-sm flex items-center gap-1"><Calendar className="h-4 w-4"/>View Calendar</Button>
              </CardHeader>
              <CardContent className="relative space-y-4">
                  {scheduledMessages.map((msg, index) => (
                    <div key={index} className="flex gap-3 relative">
                      {index < scheduledMessages.length - 1 && <div className={`absolute left-1.5 top-5 -bottom-0 w-0.5 bg-border`}></div>}
                      <div className={`h-4 w-4 rounded-full z-10 mt-1 flex-shrink-0 border-2 ${msg.color}`}></div>
                      <div className="flex-1">
                        <p className="font-medium text-sm">{msg.title}</p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          <span>{msg.time}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          {msg.type === 'Email' ? <Mail className="h-3 w-3" /> : <MessageSquare className="h-3 w-3" />}
                          <span>{msg.recipients} recipients</span>
                        </div>
                      </div>
                    </div>
                  ))}
              </CardContent>
            </Card>
            <Card>
                <CardHeader><CardTitle>Recommended Actions</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 rounded-full"><Send className="h-5 w-5 text-blue-600" /></div>
                        <div className="flex-1">
                            <p className="font-medium text-sm">Send follow-up to non-openers</p>
                            <p className="text-xs text-muted-foreground">82 stakeholders didn't open last update</p>
                        </div>
                        <Button variant="secondary" size="sm">Do it</Button>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-green-100 rounded-full"><PlusCircle className="h-5 w-5 text-green-600" /></div>
                        <div className="flex-1">
                            <p className="font-medium text-sm">Segment inactive stakeholders</p>
                            <p className="text-xs text-muted-foreground">Create a re-engagement campaign</p>
                        </div>
                        <Button variant="secondary" size="sm">Do it</Button>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-purple-100 rounded-full"><BarChart2 className="h-5 w-5 text-purple-600" /></div>
                        <div className="flex-1">
                            <p className="font-medium text-sm">Review Q2 analytics report</p>
                            <p className="text-xs text-muted-foreground">Report ready for your review</p>
                        </div>
                        <Button variant="secondary" size="sm">View</Button>
                    </div>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
