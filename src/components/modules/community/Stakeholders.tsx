import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Users, 
  Search, 
  Filter, 
  DollarSign,
  MoreHorizontal,
  UserPlus,
  Download,
  TrendingUp
} from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const stakeholderData = [
  { type: 'Institutional', count: 45, percentage: 35, color: '#0252d7' },
  { type: 'Retail', count: 127, percentage: 50, color: '#f59e0b' },
  { type: 'Strategic', count: 23, percentage: 15, color: '#22c55e' },
];

const engagementData = [
  { month: 'Jan', active: 85, engaged: 120, total: 150 },
  { month: 'Feb', active: 92, engaged: 135, total: 165 },
  { month: 'Mar', active: 108, engaged: 148, total: 180 },
  { month: 'Apr', active: 115, engaged: 162, total: 195 },
  { month: 'May', active: 128, engaged: 175, total: 210 },
  { month: 'Jun', active: 142, engaged: 188, total: 225 },
];

const stakeholders = [
  {
    id: 1,
    name: 'Sarah Chen',
    email: 'sarah.chen@blackstone.com',
    company: 'Blackstone Capital',
    type: 'Institutional',
    investment: 750000,
    shares: 15000,
    joinDate: '2024-01-15',
    status: 'Active',
    lastActivity: '2 hours ago',
    avatar: '/avatars/sarah.jpg'
  },
  {
    id: 2,
    name: 'Michael Rodriguez',
    email: 'm.rodriguez@vanguard.com',
    company: 'Vanguard Group',
    type: 'Institutional',
    investment: 1200000,
    shares: 24000,
    joinDate: '2024-02-03',
    status: 'Active',
    lastActivity: '1 day ago',
    avatar: '/avatars/michael.jpg'
  },
  {
    id: 3,
    name: 'Emily Johnson',
    email: 'emily.j@gmail.com',
    company: 'Individual',
    type: 'Retail',
    investment: 25000,
    shares: 500,
    joinDate: '2024-03-12',
    status: 'Active',
    lastActivity: '3 hours ago',
    avatar: '/avatars/emily.jpg'
  },
  {
    id: 4,
    name: 'David Kim',
    email: 'david.kim@goldmansachs.com',
    company: 'Goldman Sachs',
    type: 'Strategic',
    investment: 2000000,
    shares: 40000,
    joinDate: '2024-01-28',
    status: 'Active',
    lastActivity: '5 hours ago',
    avatar: '/avatars/david.jpg'
  },
  {
    id: 5,
    name: 'Lisa Thompson',
    email: 'lisa.thompson@outlook.com',
    company: 'Individual',
    type: 'Retail',
    investment: 50000,
    shares: 1000,
    joinDate: '2024-04-05',
    status: 'Pending',
    lastActivity: '1 week ago',
    avatar: '/avatars/lisa.jpg'
  }
];

export function Stakeholders() {
  const totalStakeholders = stakeholders.length;
  const totalInvestment = stakeholders.reduce((sum, s) => sum + s.investment, 0);
  const activeStakeholders = stakeholders.filter(s => s.status === 'Active').length;
  const avgInvestment = totalInvestment / totalStakeholders;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-sm text-muted-foreground mb-1">
            Community Management &gt; Stakeholders
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Stakeholder Management</h1>
          <p className="text-muted-foreground mt-1">Manage and engage with your token holders and investors</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="w-full sm:w-auto">
            <Download className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Export</span>
          </Button>
          <Button size="sm" className="w-full sm:w-auto">
            <UserPlus className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Activate Your Investor Whitelist</span>
            <span className="sm:hidden">Activate Whitelist</span>
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Stakeholders</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalStakeholders}</div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="mr-1 h-3 w-3" />
              +12% from last month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Stakeholders</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeStakeholders}</div>
            <div className="text-xs text-muted-foreground">
              {((activeStakeholders / totalStakeholders) * 100).toFixed(1)}% active rate
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Investment</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${(totalInvestment / 1000000).toFixed(1)}M</div>
            <div className="text-xs text-muted-foreground">
              Across all stakeholders
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Investment</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${(avgInvestment / 1000).toFixed(0)}K</div>
            <div className="text-xs text-muted-foreground">
              Per stakeholder
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Stakeholder Engagement Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={engagementData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="total" fill="#e5e7eb" name="Total" />
                  <Bar dataKey="engaged" fill="#f59e0b" name="Engaged" />
                  <Bar dataKey="active" fill="#0252d7" name="Active" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Stakeholder Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={stakeholderData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="count"
                  >
                    {stakeholderData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2 mt-4">
              {stakeholderData.map((item) => (
                <div key={item.type} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    {item.type}
                  </div>
                  <span className="font-medium">{item.count}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Stakeholder Management */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <CardTitle>Stakeholder Directory</CardTitle>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search stakeholders..." className="pl-8 w-full sm:w-[200px]" />
              </div>
              <Select defaultValue="all">
                <SelectTrigger className="w-[120px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="institutional">Institutional</SelectItem>
                  <SelectItem value="retail">Retail</SelectItem>
                  <SelectItem value="strategic">Strategic</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Stakeholder</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Investment</TableHead>
                  <TableHead>Shares</TableHead>
                  <TableHead>Join Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Activity</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {stakeholders.map((stakeholder) => (
                  <TableRow key={stakeholder.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={stakeholder.avatar} />
                          <AvatarFallback>{stakeholder.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{stakeholder.name}</p>
                          <p className="text-sm text-muted-foreground">{stakeholder.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={stakeholder.type === 'Institutional' ? 'default' : stakeholder.type === 'Strategic' ? 'secondary' : 'outline'}>
                        {stakeholder.type}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium">
                      ${(stakeholder.investment / 1000).toFixed(0)}K
                    </TableCell>
                    <TableCell>{stakeholder.shares.toLocaleString()}</TableCell>
                    <TableCell>{new Date(stakeholder.joinDate).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Badge variant={stakeholder.status === 'Active' ? 'default' : 'secondary'}>
                        {stakeholder.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {stakeholder.lastActivity}
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
