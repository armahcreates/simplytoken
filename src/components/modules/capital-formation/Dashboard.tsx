import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
  DollarSign, 
  Users, 
  Target,
  ArrowUpRight,
  ArrowDownRight,
  BarChart3,
  Activity
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Cell, Pie } from 'recharts';

const fundraisingData = [
  { month: 'Jan', raised: 500000, target: 400000 },
  { month: 'Feb', raised: 800000, target: 600000 },
  { month: 'Mar', raised: 1200000, target: 900000 },
  { month: 'Apr', raised: 1800000, target: 1300000 },
  { month: 'May', raised: 2400000, target: 1800000 },
  { month: 'Jun', raised: 3200000, target: 2500000 },
];

const investorTypeData = [
  { name: 'Institutional', value: 45, color: '#0252d7' },
  { name: 'Retail', value: 35, color: '#f59e0b' },
  { name: 'Strategic', value: 20, color: '#22c55e' },
];

const recentActivity = [
  { id: 1, type: 'investment', investor: 'Blackstone Capital', amount: 500000, time: '2 hours ago' },
  { id: 2, type: 'commitment', investor: 'Vanguard Group', amount: 750000, time: '4 hours ago' },
  { id: 3, type: 'interest', investor: 'Goldman Sachs', amount: 1000000, time: '6 hours ago' },
  { id: 4, type: 'investment', investor: 'Morgan Stanley', amount: 300000, time: '1 day ago' },
];

export function Dashboard() {
  const totalRaised = 3200000;
  const targetAmount = 5000000;
  const progressPercentage = (totalRaised / targetAmount) * 100;
  const investorCount = 127;
  const avgInvestment = totalRaised / investorCount;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-sm text-muted-foreground mb-1">
            Capital Formation &gt; Dashboard
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Capital Formation Dashboard</h1>
          <p className="text-muted-foreground mt-1">Monitor your fundraising progress and investor activity</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="w-full sm:w-auto">
            <BarChart3 className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Analytics</span>
          </Button>
          <Button size="sm" className="w-full sm:w-auto">
            <Activity className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Live Updates</span>
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Raised</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${(totalRaised / 1000000).toFixed(1)}M</div>
            <div className="flex items-center text-xs text-green-600">
              <ArrowUpRight className="mr-1 h-3 w-3" />
              +12.5% from last month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Target Progress</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{progressPercentage.toFixed(1)}%</div>
            <Progress value={progressPercentage} className="mt-2" />
            <div className="text-xs text-muted-foreground mt-1">
              ${(targetAmount / 1000000).toFixed(1)}M target
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Investors</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{investorCount}</div>
            <div className="flex items-center text-xs text-green-600">
              <ArrowUpRight className="mr-1 h-3 w-3" />
              +8 new this week
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Investment</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${(avgInvestment / 1000).toFixed(0)}K</div>
            <div className="flex items-center text-xs text-red-600">
              <ArrowDownRight className="mr-1 h-3 w-3" />
              -3.2% from last month
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Fundraising Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={fundraisingData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis tickFormatter={(value) => `$${(Number(value) / 1000000).toFixed(1)}M`} />
                  <Tooltip formatter={(value) => [`$${(Number(value) / 1000000).toFixed(2)}M`, '']} />
                  <Line type="monotone" dataKey="raised" stroke="#0252d7" strokeWidth={2} name="Raised" />
                  <Line type="monotone" dataKey="target" stroke="#f59e0b" strokeWidth={2} strokeDasharray="5 5" name="Target" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Investor Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie
                    data={investorTypeData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {investorTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value}%`, '']} />
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2 mt-4">
              {investorTypeData.map((item) => (
                <div key={item.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    {item.name}
                  </div>
                  <span className="font-medium">{item.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Recent Activity</CardTitle>
          <Button variant="outline" size="sm">
            View All
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between p-3 rounded-lg border">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${
                    activity.type === 'investment' ? 'bg-green-500' :
                    activity.type === 'commitment' ? 'bg-blue-500' : 'bg-yellow-500'
                  }`} />
                  <div>
                    <p className="font-medium">{activity.investor}</p>
                    <p className="text-sm text-muted-foreground capitalize">
                      {activity.type} • {activity.time}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">${(activity.amount / 1000).toFixed(0)}K</p>
                  <Badge variant={activity.type === 'investment' ? 'default' : 'secondary'} className="text-xs">
                    {activity.type}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
