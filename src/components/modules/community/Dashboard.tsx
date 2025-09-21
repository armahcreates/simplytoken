import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { ArrowUp, ArrowDown, Download, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

const engagementTrendData = [
  { name: 'Jun 1', Activity: 65, 'Response Rate': 58 },
  { name: 'Jun 8', Activity: 72, 'Response Rate': 61 },
  { name: 'Jun 15', Activity: 68, 'Response Rate': 64 },
  { name: 'Jun 22', Activity: 75, 'Response Rate': 66 },
  { name: 'Jun 29', Activity: 82, 'Response Rate': 70 },
  { name: 'Jul 6', Activity: 80, 'Response Rate': 74 },
  { name: 'Jul 13', Activity: 85, 'Response Rate': 76 },
];

const sentimentData = [
  { name: 'Positive', value: 75 },
  { name: 'Neutral', value: 15 },
  { name: 'Negative', value: 10 },
];
const SENTIMENT_COLORS = ['#22c55e', '#f59e0b', '#ef4444'];

const communityGrowthData = [
  { name: 'Feb', 'New Members': 18 },
  { name: 'Mar', 'New Members': 22 },
  { name: 'Apr', 'New Members': 19 },
  { name: 'May', 'New Members': 24 },
  { name: 'Jun', 'New Members': 25 },
  { name: 'Jul', 'New Members': 28 },
];

const stakeholderEngagementData = [
    { name: 'Token Holders', value: 92, color: 'bg-blue-500' },
    { name: 'Investors', value: 87, color: 'bg-blue-500' },
    { name: 'Partners', value: 78, color: 'bg-purple-500' },
    { name: 'Governance Participants', value: 65, color: 'bg-amber-500' },
];

const discussionTopics = [
    { topic: 'Construction Progress', change: '+24%', sentiment: 'Positive' },
    { topic: 'Quarterly Dividends', change: '+18%', sentiment: 'Positive' },
    { topic: 'Governance Proposals', change: '+2%', sentiment: 'Neutral' },
    { topic: 'Permit Delays', change: '-8%', sentiment: 'Negative' },
];

const StatChange = ({ value, unit, direction }: { value: number; unit?: string; direction: 'up' | 'down' }) => (
    <div className={cn('text-xs flex items-center', direction === 'up' ? 'text-green-600' : 'text-red-600')}>
        {direction === 'up' ? <ArrowUp className="h-3 w-3 mr-1" /> : <ArrowDown className="h-3 w-3 mr-1" />}
        {value}{unit}
    </div>
);

export function Dashboard() {
  return (
    <div className="space-y-6 pt-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Community Health Overview</h2>
          <p className="text-muted-foreground">Monitor engagement, sentiment and growth metrics for Harmony Residences</p>
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
          <Button>
            <Download className="mr-2 h-4 w-4" /> Export Report
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Community Health Score</CardTitle>
            <Badge variant="outline" className="text-green-700 bg-green-50 border-green-200"><CheckCircle className="mr-2 h-4 w-4" />Healthy</Badge>
        </CardHeader>
        <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-center">
                <div className="flex flex-col items-center justify-center text-center p-4 border-r">
                    <div className="relative w-28 h-28">
                        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                            <circle cx="50" cy="50" r="45" stroke="#e5e7eb" strokeWidth="10" fill="none" />
                            <circle cx="50" cy="50" r="45" stroke="#22c55e" strokeWidth="10" fill="none" strokeDasharray={`${86 * 2.83} ${100 * 2.83}`} />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center text-4xl font-bold">86</div>
                    </div>
                    <p className="font-semibold mt-2">Overall Health</p>
                    <StatChange value={4.2} unit="%" direction="up" />
                </div>
                <div className="space-y-4">
                    <p className="font-semibold">Engagement</p>
                    <p className="text-3xl font-bold">82</p>
                    <div className="h-2 w-full bg-gray-200 rounded-full"><div className="h-2 bg-blue-500 rounded-full" style={{width: '82%'}}></div></div>
                    <StatChange value={3.5} unit="%" direction="up" />
                </div>
                <div className="space-y-4">
                    <p className="font-semibold">Sentiment</p>
                    <p className="text-3xl font-bold">91</p>
                    <div className="h-2 w-full bg-gray-200 rounded-full"><div className="h-2 bg-green-500 rounded-full" style={{width: '91%'}}></div></div>
                    <StatChange value={5.2} unit="%" direction="up" />
                </div>
                <div className="space-y-4">
                    <p className="font-semibold">Growth</p>
                    <p className="text-3xl font-bold">78</p>
                    <div className="h-2 w-full bg-gray-200 rounded-full"><div className="h-2 bg-amber-500 rounded-full" style={{width: '78%'}}></div></div>
                    <StatChange value={1.3} unit="%" direction="down" />
                </div>
                <div className="space-y-4">
                    <p className="font-semibold">Retention</p>
                    <p className="text-3xl font-bold">93</p>
                    <div className="h-2 w-full bg-gray-200 rounded-full"><div className="h-2 bg-purple-500 rounded-full" style={{width: '93%'}}></div></div>
                    <StatChange value={2.1} unit="%" direction="up" />
                </div>
            </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
            <Card>
                <CardHeader><CardTitle>Engagement Trends</CardTitle></CardHeader>
                <CardContent>
                    <div className="h-[250px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={engagementTrendData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="name" tickLine={false} axisLine={false} />
                                <YAxis tickLine={false} axisLine={false} />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="Activity" stroke="#3b82f6" strokeWidth={2} dot={{ r: 4 }} />
                                <Line type="monotone" dataKey="Response Rate" stroke="#f59e0b" strokeWidth={2} dot={{ r: 4 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center mt-4 pt-4 border-t">
                        <div><p className="text-muted-foreground">Active Members</p><p className="text-xl font-bold">187</p><StatChange value={12} unit="%" direction="up" /></div>
                        <div><p className="text-muted-foreground">Avg. Response Time</p><p className="text-xl font-bold">4.2h</p><StatChange value={8} unit="%" direction="down" /></div>
                        <div><p className="text-muted-foreground">Messages Sent</p><p className="text-xl font-bold">423</p><StatChange value={15} unit="%" direction="up" /></div>
                        <div><p className="text-muted-foreground">Event Attendance</p><p className="text-xl font-bold">76%</p><StatChange value={4} unit="%" direction="up" /></div>
                    </div>
                </CardContent>
            </Card>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                    <CardHeader><CardTitle>Community Growth</CardTitle></CardHeader>
                    <CardContent>
                        <div className="h-[200px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={communityGrowthData}>
                                    <XAxis dataKey="name" tickLine={false} axisLine={false} />
                                    <YAxis tickLine={false} axisLine={false} />
                                    <Tooltip cursor={{fill: 'rgba(243, 244, 246, 0.5)'}}/>
                                    <Bar dataKey="New Members" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-center mt-4 pt-4 border-t">
                            <div><p className="text-muted-foreground">New Members</p><p className="text-xl font-bold">28</p><StatChange value={12} unit="%" direction="up" /></div>
                            <div><p className="text-muted-foreground">Churn Rate</p><p className="text-xl font-bold">1.2%</p><StatChange value={0.3} unit="%" direction="down" /></div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader><CardTitle>Stakeholder Engagement</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                        {stakeholderEngagementData.map(item => (
                            <div key={item.name}>
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="font-medium">{item.name}</span>
                                    <span className="text-muted-foreground">{item.value}%</span>
                                </div>
                                <div className="h-2 w-full bg-gray-200 rounded-full"><div className={cn("h-2 rounded-full", item.color)} style={{width: `${item.value}%`}}></div></div>
                            </div>
                        ))}
                         <div className="border-t pt-4 mt-4">
                            <div className="flex justify-between font-semibold">
                                <span>Overall Engagement</span>
                                <div className="flex items-center gap-2">
                                    <span>82%</span>
                                    <StatChange value={3.5} unit="%" direction="up" />
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
        <div className="lg:col-span-1 space-y-6">
            <Card>
                <CardHeader><CardTitle>Sentiment Analysis</CardTitle></CardHeader>
                <CardContent>
                    <div className="h-[180px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie data={sentimentData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={2} labelLine={false}>
                                    {sentimentData.map((entry, index) => <Cell key={`cell-${index}`} fill={SENTIMENT_COLORS[index % SENTIMENT_COLORS.length]} />)}
                                </Pie>
                                <Legend layout="horizontal" verticalAlign="bottom" align="center" iconType="circle" />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="mt-4 pt-4 border-t">
                        <h4 className="font-semibold mb-2">Top Discussion Topics</h4>
                        <div className="space-y-2">
                            {discussionTopics.map(item => (
                                <div key={item.topic} className="flex justify-between items-center text-sm">
                                    <div className="flex items-center">
                                        <span className={cn('h-2 w-2 rounded-full mr-2', item.sentiment === 'Positive' ? 'bg-green-500' : item.sentiment === 'Negative' ? 'bg-red-500' : 'bg-amber-500')}></span>
                                        <span>{item.topic}</span>
                                    </div>
                                    <span className={cn(item.sentiment === 'Positive' ? 'text-green-600' : item.sentiment === 'Negative' ? 'text-red-600' : 'text-amber-600')}>{item.change}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader><CardTitle>Recommended Actions</CardTitle></CardHeader>
                <CardContent className="space-y-3">
                    <div className="p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg">
                        <div className="flex justify-between items-start">
                            <p className="font-semibold">Address Permit Delay Concerns</p>
                            <Badge variant="destructive">High Priority</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">Schedule a town hall to address community concerns about recent permit delays.</p>
                        <Button variant="link" className="p-0 h-auto text-primary mt-2">Schedule Now</Button>
                    </div>
                    <div className="p-4 bg-amber-50 border-l-4 border-amber-500 rounded-r-lg">
                        <div className="flex justify-between items-start">
                            <p className="font-semibold">Boost Governance Participation</p>
                            <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200">Medium Priority</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">Create educational content to increase governance participation rates.</p>
                        <Button variant="link" className="p-0 h-auto text-primary mt-2">Create Campaign</Button>
                    </div>
                    <div className="p-4 bg-green-50 border-l-4 border-green-500 rounded-r-lg">
                        <div className="flex justify-between items-start">
                            <p className="font-semibold">Highlight Construction Progress</p>
                            <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">Low Priority</Badge>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
