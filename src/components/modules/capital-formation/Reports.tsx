import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
  BarChart as RechartsBarChart,
  Bar,
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
} from 'recharts';
import {
  Plus,
  Save,
  FolderOpen,
  Calendar as CalendarIcon,
  X as XIcon,
  PieChart,
  BarChart3,
  LineChart,
  Download,
  Share,
  Printer,
} from 'lucide-react';

const pieChartData = [
  { name: 'Institutional Investors', value: 45 },
  { name: 'Family Offices', value: 30 },
  { name: 'Private Equity', value: 20 },
  { name: 'Angel Investors', value: 5 },
];
const PIE_COLORS = ['#0252d7', '#2e75f8', '#689cfc', '#a1c4fd'];

const barChartData = [
  { name: 'North America', value: 45 },
  { name: 'Europe', value: 30 },
  { name: 'Asia', value: 20 },
  { name: 'Other', value: 5 },
];

const lineChartData = [
  { name: 'Jan', value: 10 },
  { name: 'Feb', value: 12 },
  { name: 'Mar', value: 15 },
  { name: 'Apr', value: 22 },
  { name: 'May', value: 28 },
  { name: 'Jun', value: 35 },
  { name: 'Jul', value: 42 },
];

export function Reports() {
  const [filters, setFilters] = React.useState([
    { id: 1, field: 'Investor Type', condition: 'is', value: 'Family Office' },
    { id: 2, field: 'Investment Size', condition: 'greater than', value: '$1,000,000' },
  ]);

  const addFilter = () => {
    setFilters([...filters, { id: Date.now(), field: 'Investor Type', condition: 'is', value: '' }]);
  };

  const removeFilter = (id: number) => {
    setFilters(filters.filter(f => f.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm text-muted-foreground mb-1">
            Capital Formation &gt; Reports
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Capital Formation Reports</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button><Plus className="mr-2 h-4 w-4" /> New Report</Button>
        </div>
      </div>

      <Card>
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle>Report Parameters</CardTitle>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm"><Save className="mr-2 h-4 w-4" /> Save Template</Button>
            <Button variant="outline" size="sm"><FolderOpen className="mr-2 h-4 w-4" /> Load Template</Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label>Report Type</Label>
              <Select defaultValue="fundraising-status">
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="fundraising-status">Fundraising Status</SelectItem>
                  <SelectItem value="investor-demographics">Investor Demographics</SelectItem>
                  <SelectItem value="capital-deployment">Capital Deployment</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Time Period</Label>
              <div className="flex items-center gap-2">
                <div className="relative w-full">
                  <Input placeholder="mm/dd/yyyy" className="pr-8" />
                  <CalendarIcon className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                </div>
                <span>to</span>
                <div className="relative w-full">
                  <Input placeholder="mm/dd/yyyy" className="pr-8" />
                  <CalendarIcon className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Project</Label>
              <Select defaultValue="all">
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Projects</SelectItem>
                  <SelectItem value="harmony-residences">Harmony Residences</SelectItem>
                  <SelectItem value="nexus-commercial">Nexus Commercial</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label className="font-medium">Advanced Filters</Label>
            <div className="mt-2 space-y-2">
              {filters.map(filter => (
                <div key={filter.id} className="flex items-center gap-2">
                  <Select defaultValue={filter.field}>
                    <SelectTrigger className="w-48"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Investor Type">Investor Type</SelectItem>
                      <SelectItem value="Investment Size">Investment Size</SelectItem>
                      <SelectItem value="Location">Location</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select defaultValue={filter.condition}>
                    <SelectTrigger className="w-32"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="is">is</SelectItem>
                      <SelectItem value="is not">is not</SelectItem>
                      <SelectItem value="greater than">greater than</SelectItem>
                      <SelectItem value="less than">less than</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input defaultValue={filter.value} className="flex-1" />
                  <Button variant="ghost" size="icon" onClick={() => removeFilter(filter.id)}>
                    <XIcon className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
            <Button variant="link" className="p-0 h-auto mt-2" onClick={addFilter}>
              <Plus className="mr-2 h-4 w-4" /> Add Filter
            </Button>
          </div>

          <div>
            <Label className="font-medium">Display Options</Label>
            <div className="grid md:grid-cols-3 gap-6 mt-2">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Chart Type</p>
                <ToggleGroup type="single" defaultValue="pie" variant="outline">
                  <ToggleGroupItem value="pie" className="w-full"><PieChart className="h-5 w-5" /></ToggleGroupItem>
                  <ToggleGroupItem value="bar" className="w-full"><BarChart3 className="h-5 w-5" /></ToggleGroupItem>
                  <ToggleGroupItem value="line" className="w-full"><LineChart className="h-5 w-5" /></ToggleGroupItem>
                </ToggleGroup>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Metrics to Display</p>
                <div className="space-y-2 pt-1">
                  <div className="flex items-center gap-2"><Checkbox id="metric1" defaultChecked /><Label htmlFor="metric1" className="font-normal">Total Capital Raised</Label></div>
                  <div className="flex items-center gap-2"><Checkbox id="metric2" defaultChecked /><Label htmlFor="metric2" className="font-normal">Investor Distribution</Label></div>
                  <div className="flex items-center gap-2"><Checkbox id="metric3" defaultChecked /><Label htmlFor="metric3" className="font-normal">Geographic Breakdown</Label></div>
                  <div className="flex items-center gap-2"><Checkbox id="metric4" /><Label htmlFor="metric4" className="font-normal">Investment Timeline</Label></div>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Data Grouping</p>
                <Select defaultValue="investor-type">
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="investor-type">By Investor Type</SelectItem>
                    <SelectItem value="geography">By Geography</SelectItem>
                    <SelectItem value="time-period">By Time Period</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button variant="outline">Reset</Button>
            <Button>Generate Report</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle>Report Preview</CardTitle>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm"><Download className="mr-2 h-4 w-4" /> Export</Button>
            <Button variant="outline" size="sm"><Share className="mr-2 h-4 w-4" /> Share</Button>
            <Button variant="outline" size="sm"><Printer className="mr-2 h-4 w-4" /> Print</Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold mb-4 text-center">Fundraising Status by Investor Type</h3>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPieChart>
                    <Pie data={pieChartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={120}>
                      {pieChartData.map((entry, index) => <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />)}
                    </Pie>
                    <Legend iconType="circle" />
                    <Tooltip />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-center">Geographic Distribution of Investors</h3>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsBarChart data={barChartData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" />
                    <YAxis unit="%" />
                    <Tooltip />
                    <Bar dataKey="value" fill="#0252d7" radius={[4, 4, 0, 0]} />
                  </RechartsBarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-4 text-center">Capital Raised Timeline</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsLineChart data={lineChartData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" />
                  <YAxis unit="M" tickFormatter={(value) => `$${value}`} />
                  <Tooltip formatter={(value) => [`$${value}M`, 'Capital Raised (Cumulative)']}/>
                  <Legend />
                  <Line type="monotone" dataKey="value" name="Capital Raised (Cumulative)" stroke="#0252d7" strokeWidth={2} />
                </RechartsLineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
