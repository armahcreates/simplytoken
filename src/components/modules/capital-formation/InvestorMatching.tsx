import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import {
  Filter,
  Download,
  Info,
  Building2,
  Users,
  Sprout,
  Rocket,
  Briefcase,
  FileText,
  Settings,
  BarChart2,
} from 'lucide-react';

const investorCategoriesData = [
  { name: 'Family Offices', value: 88 },
  { name: 'Institutional', value: 82 },
  { name: 'Private Equity', value: 75 },
  { name: 'VC', value: 68 },
  { name: 'Angel', value: 60 },
];

const geographicDistributionData = [
  { name: 'North America', value: 65 },
  { name: 'Europe', value: 20 },
  { name: 'Asia', value: 10 },
  { name: 'Other', value: 5 },
];
const GEO_COLORS = ['#0252d7', '#689cfc', '#a1c4fd', '#d1e1fe'];

const compatibilityFactors = {
  project: [
    { name: 'Asset Type Match', value: 85 },
    { name: 'Investment Size', value: 72 },
    { name: 'Risk Profile', value: 68 },
  ],
  investor: [
    { name: 'Industry Focus', value: 91 },
    { name: 'Stage Preference', value: 78 },
    { name: 'Historical Returns', value: 65 },
  ],
};

const categoryAnalysisData = [
  { icon: Building2, category: 'Institutional Investors', compatibility: 85, investment: '$5M - $25M', horizon: '5-7 years', risk: 'Medium' },
  { icon: Briefcase, category: 'Private Equity', compatibility: 78, investment: '$10M - $50M', horizon: '3-5 years', risk: 'Medium-High' },
  { icon: Users, category: 'Family Offices', compatibility: 92, investment: '$1M - $10M', horizon: '7-10 years', risk: 'Medium' },
  { icon: Sprout, category: 'Angel Investors', compatibility: 65, investment: '$50K - $500K', horizon: '3-5 years', risk: 'High' },
  { icon: Rocket, category: 'Venture Capital', compatibility: 71, investment: '$1M - $5M', horizon: '5-7 years', risk: 'High' },
];

export function InvestorMatching() {
  const compatibilityScore = 78;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-sm text-muted-foreground mb-1">
            Capital Formation &gt; Investor Matching
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Investor Matching Tool</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="flex-1 sm:flex-none">
            <Filter className="mr-2 h-4 w-4" /> 
            <span className="hidden sm:inline">Filter</span>
          </Button>
          <Button variant="outline" size="sm" className="flex-1 sm:flex-none">
            <Download className="mr-2 h-4 w-4" /> 
            <span className="hidden sm:inline">Export</span>
          </Button>
        </div>
      </div>

      <Alert className="bg-blue-50 border-blue-200 text-blue-800 [&>svg]:text-blue-500">
        <Info className="h-4 w-4" />
        <AlertDescription>
          This tool analyzes potential investor compatibility based on your project parameters and historical investment patterns. This is not a recommendation or solicitation and should be used for informational purposes only.
        </AlertDescription>
      </Alert>

      {/* Mobile Layout */}
      <div className="grid grid-cols-1 gap-6 lg:hidden">
        <Card>
          <CardHeader>
            <CardTitle className="text-center">Compatibility Score</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center">
            <div className="relative w-32 h-32">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" stroke="#e5e7eb" strokeWidth="10" fill="none" />
                <circle cx="50" cy="50" r="45" stroke="#f59e0b" strokeWidth="10" fill="none" strokeDasharray={`${compatibilityScore * 2.83} ${100 * 2.83}`} />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center text-3xl font-bold">{compatibilityScore}%</div>
            </div>
            <p className="text-sm text-muted-foreground mt-2 text-center">Based on your project parameters</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader><CardTitle>Investor Categories</CardTitle></CardHeader>
          <CardContent className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={investorCategoriesData} margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
                <XAxis dataKey="name" tick={{ fontSize: 10 }} angle={-45} textAnchor="end" height={60} />
                <YAxis unit="%" />
                <Tooltip />
                <Bar dataKey="value" fill="#0252d7" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader><CardTitle>Geographic Distribution</CardTitle></CardHeader>
          <CardContent className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={geographicDistributionData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={70}>
                  {geographicDistributionData.map((_, index) => <Cell key={`cell-${index}`} fill={GEO_COLORS[index % GEO_COLORS.length]} />)}
                </Pie>
                <Legend layout="horizontal" verticalAlign="bottom" align="center" iconType="circle" />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      
      {/* Desktop Layout */}
      <div className="hidden lg:grid lg:grid-cols-5 gap-6">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-center">Compatibility Score</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center">
            <div className="relative w-32 h-32">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" stroke="#e5e7eb" strokeWidth="10" fill="none" />
                <circle cx="50" cy="50" r="45" stroke="#f59e0b" strokeWidth="10" fill="none" strokeDasharray={`${compatibilityScore * 2.83} ${100 * 2.83}`} />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center text-3xl font-bold">{compatibilityScore}%</div>
            </div>
            <p className="text-sm text-muted-foreground mt-2 text-center">Based on your project parameters</p>
          </CardContent>
        </Card>
        <Card className="lg:col-span-2">
          <CardHeader><CardTitle>Investor Categories</CardTitle></CardHeader>
          <CardContent className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={investorCategoriesData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis unit="%" />
                <Tooltip />
                <Bar dataKey="value" fill="#0252d7" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card className="lg:col-span-2">
          <CardHeader><CardTitle>Geographic Distribution</CardTitle></CardHeader>
          <CardContent className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={geographicDistributionData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80}>
                  {geographicDistributionData.map((_, index) => <Cell key={`cell-${index}`} fill={GEO_COLORS[index % GEO_COLORS.length]} />)}
                </Pie>
                <Legend layout="vertical" verticalAlign="middle" align="right" iconType="circle" />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader><CardTitle>Key Compatibility Factors</CardTitle></CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-3">Project Parameters</h3>
            <div className="space-y-4">
              {compatibilityFactors.project.map(factor => (
                <div key={factor.name}>
                  <div className="flex justify-between text-sm mb-1">
                    <span>{factor.name}</span>
                    <span className="font-medium">{factor.value}%</span>
                  </div>
                  <Progress value={factor.value} />
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-3">Investor Preferences</h3>
            <div className="space-y-4">
              {compatibilityFactors.investor.map(factor => (
                <div key={factor.name}>
                  <div className="flex justify-between text-sm mb-1">
                    <span>{factor.name}</span>
                    <span className="font-medium">{factor.value}%</span>
                  </div>
                  <Progress value={factor.value} />
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Investor Category Analysis</CardTitle></CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
            <TableHeader>
              <TableRow>
                <TableHead>CATEGORY</TableHead>
                <TableHead>COMPATIBILITY</TableHead>
                <TableHead>TYPICAL INVESTMENT</TableHead>
                <TableHead>INVESTMENT HORIZON</TableHead>
                <TableHead>RISK TOLERANCE</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categoryAnalysisData.map(item => (
                <TableRow key={item.category}>
                  <TableCell className="font-medium flex items-center gap-3">
                    <item.icon className="h-5 w-5 text-primary" />
                    {item.category}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Progress value={item.compatibility} className="w-24" />
                      <span>{item.compatibility}%</span>
                    </div>
                  </TableCell>
                  <TableCell>{item.investment}</TableCell>
                  <TableCell>{item.horizon}</TableCell>
                  <TableCell>{item.risk}</TableCell>
                </TableRow>
              ))}
             </TableBody>
            </Table>
          </div>
         </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Recommended Next Steps</CardTitle></CardHeader>
        <CardContent className="grid md:grid-cols-3 gap-4">
          <Button variant="outline" className="h-24 flex-col gap-2">
            <FileText className="h-8 w-8 text-primary" />
            <span>Prepare Documentation</span>
          </Button>
          <Button variant="outline" className="h-24 flex-col gap-2">
            <Settings className="h-8 w-8 text-primary" />
            <span>Refine Parameters</span>
          </Button>
          <Button variant="outline" className="h-24 flex-col gap-2">
            <BarChart2 className="h-8 w-8 text-primary" />
            <span>Generate Report</span>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
