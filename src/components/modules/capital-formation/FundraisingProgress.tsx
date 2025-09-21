import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { cn } from '@/lib/utils';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { Share2, Download, Plus, ArrowUp, CheckCircle, Clock, Flag } from 'lucide-react';

const fundraisingProgressData = [
  { name: 'Jan', actual: 0.5, target: 0.4 },
  { name: 'Feb', actual: 0.9, target: 0.8 },
  { name: 'Mar', actual: 1.2, target: 1.3 },
  { name: 'Apr', actual: 1.6, target: 1.9 },
  { name: 'May', actual: 1.8, target: 2.5 },
  { name: 'Jun', actual: 2.1, target: 3.2 },
  { name: 'Jul', actual: 2.45, target: 4.0 },
  { name: 'Aug', actual: null, target: 5.0 },
];

const milestones = [
  { name: 'Seed Round', amount: '$1M', status: 'Completed', date: 'April 15, 2023', progress: 100 },
  { name: 'Series A', amount: '$2M', status: 'Completed', date: 'June 30, 2023', progress: 100 },
  { name: 'Series B', amount: '$3.5M', status: 'In Progress', date: '49% complete', progress: 49 },
  { name: 'Series C', amount: '$5M', status: 'Planned', date: 'Target: Q4 2023', progress: 0 },
];

const investorCategoryData = [
  { name: 'Family Offices', value: 400 },
  { name: 'Institutional', value: 300 },
  { name: 'Private Equity', value: 300 },
  { name: 'VC', value: 200 },
  { name: 'Angel', value: 100 },
];
const INVESTOR_COLORS = ['#0252d7', '#2e75f8', '#689cfc', '#a1c4fd', '#d1e1fe'];

const investmentSizeData = [
  { name: '<$50K', investments: 2 },
  { name: '$50K-$100K', investments: 5 },
  { name: '$100K-$250K', investments: 6 },
  { name: '$250K-$500K', investments: 3 },
  { name: '>$500K', investments: 2 },
];

export function FundraisingProgress() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm text-muted-foreground mb-1">
            Capital Formation &gt; Fundraising Progress
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Fundraising Progress Tracker</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline"><Share2 className="mr-2 h-4 w-4" /> Share</Button>
          <Button variant="outline"><Download className="mr-2 h-4 w-4" /> Export</Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex justify-between">
              Total Raised <Badge className="bg-green-100 text-green-800 hover:bg-green-200">+12% this week</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">$2.45M</p>
            <p className="text-xs text-muted-foreground">of $5M</p>
            <Progress value={(2.45 / 5) * 100} className="mt-2 h-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex justify-between">
              Investors <Badge className="bg-green-100 text-green-800 hover:bg-green-200">+3 this week</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">18</p>
            <p className="text-xs text-muted-foreground">of 25 target</p>
            <Progress value={(18 / 25) * 100} className="mt-2 h-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex justify-between">
              Average Investment <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">On target</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">$136K</p>
            <p className="text-xs text-muted-foreground">per investor</p>
            <div className="flex items-center text-xs text-green-600 mt-2">
              <ArrowUp className="h-3 w-3 mr-1" /> 5% above projections
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex justify-between">
              Time Remaining <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">45 days</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">63%</p>
            <p className="text-xs text-muted-foreground">of timeline</p>
            <Progress value={63} className="mt-2 h-2" />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Fundraising Progress Over Time</CardTitle>
          <ToggleGroup type="single" defaultValue="all-time" size="sm">
            <ToggleGroupItem value="weekly">Weekly</ToggleGroupItem>
            <ToggleGroupItem value="monthly">Monthly</ToggleGroupItem>
            <ToggleGroupItem value="all-time">All Time</ToggleGroupItem>
          </ToggleGroup>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={fundraisingProgressData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" />
              <YAxis unit="M" tickFormatter={(value) => `$${value}`} />
              <Tooltip formatter={(value, name) => [`$${value}M`, name]} />
              <Legend />
              <Line type="monotone" dataKey="actual" name="Actual Raised" stroke="#0252d7" strokeWidth={2} connectNulls={false} />
              <Line type="monotone" dataKey="target" name="Target" stroke="#a1c4fd" strokeWidth={2} strokeDasharray="5 5" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Fundraising Milestones</CardTitle>
          <Button variant="ghost"><Plus className="mr-2 h-4 w-4" /> Add Milestone</Button>
        </CardHeader>
        <CardContent>
          <div className="relative pt-8">
            <div className="absolute top-10 left-12 right-12 h-1 bg-gray-200 rounded-full">
              <div className="h-1 bg-blue-600 rounded-full" style={{ width: '50%' }}></div>
            </div>
            <div className="relative grid grid-cols-4 gap-4">
              {milestones.map((milestone, index) => {
                const isCompleted = milestone.status === 'Completed';
                const isInProgress = milestone.status === 'In Progress';
                const isPlanned = milestone.status === 'Planned';
                return (
                  <div key={index} className="flex flex-col items-center text-center">
                    <div className={cn(
                      'w-6 h-6 rounded-full flex items-center justify-center z-10',
                      isCompleted ? 'bg-blue-600 text-white' : 'bg-white border-2 border-gray-300',
                      isInProgress && 'border-blue-600'
                    )}>
                      {isCompleted && <CheckCircle className="h-4 w-4" />}
                      {isInProgress && <Clock className="h-4 w-4 text-blue-600" />}
                      {isPlanned && <Flag className="h-4 w-4 text-gray-400" />}
                    </div>
                    <Card className={cn(
                      'mt-4 w-full',
                      isCompleted && 'bg-green-50 border-green-200',
                      isInProgress && 'bg-blue-50 border-blue-200',
                    )}>
                      <CardContent className="p-4">
                        <p className="text-sm font-medium">{milestone.name}</p>
                        <p className="text-xs text-muted-foreground">{milestone.status}</p>
                        <p className="text-lg font-bold my-1">{milestone.amount}</p>
                        <p className="text-xs text-muted-foreground">{milestone.date}</p>
                        {isInProgress && <Progress value={milestone.progress} className="mt-2 h-1" />}
                      </CardContent>
                    </Card>
                  </div>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle>Investor Category Breakdown</CardTitle></CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={investorCategoryData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={80} outerRadius={110} paddingAngle={2}>
                  {investorCategoryData.map((entry, index) => <Cell key={`cell-${index}`} fill={INVESTOR_COLORS[index % INVESTOR_COLORS.length]} />)}
                </Pie>
                <Legend layout="vertical" verticalAlign="middle" align="right" iconType="circle" />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Investment Size Distribution</CardTitle></CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={investmentSizeData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis label={{ value: 'Number of Investments', angle: -90, position: 'insideLeft' }} />
                <Tooltip />
                <Bar dataKey="investments" name="Number of Investments" fill="#0252d7" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
