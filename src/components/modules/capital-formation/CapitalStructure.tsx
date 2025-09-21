import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid
} from 'recharts';
import { Save, Share, Info, Plus } from 'lucide-react';

const OWNERSHIP_COLORS = ['#0252d7', '#f59e0b', '#22c55e']; // Founders, Investors, ESOP

const scenarios = [
  { name: 'Series A Funding', preMoney: 10000000, raise: 2500000, equity: 20, founderOwnership: 70 },
  { name: 'Conservative', preMoney: 8000000, raise: 2000000, equity: 20, founderOwnership: 70 },
  { name: 'Aggressive', preMoney: 12000000, raise: 3000000, equity: 20, founderOwnership: 70 },
];

const dilutionData = [
    { name: 'Pre-Seed', Founder: 100, Investor: 0, ESOP: 0 },
    { name: 'Seed', Founder: 80, Investor: 15, ESOP: 5 },
    { name: 'Series A', Founder: 64, Investor: 28, ESOP: 8 },
    { name: 'Series B', Founder: 51.2, Investor: 38.4, ESOP: 10.4 },
];

export function CapitalStructure() {
  const [preMoney, setPreMoney] = React.useState(10000000);
  const [raiseAmount, setRaiseAmount] = React.useState(2500000);
  const [esopPool, setEsopPool] = React.useState(10);
  const [equityOffered, setEquityOffered] = React.useState(20);

  const postMoney = preMoney + raiseAmount;
  const pricePerToken = postMoney / 10000000; // Assuming 10M total shares for calculation
  const founderDilution = equityOffered;

  const ownershipData = {
    preMoney: [{ name: 'Founders', value: 100 }],
    postMoney: [
      { name: 'Founders', value: 100 - equityOffered },
      { name: 'Investors', value: equityOffered },
    ],
    fullyDiluted: [
      { name: 'Founders', value: (100 - equityOffered) * (1 - esopPool / 100) },
      { name: 'Investors', value: equityOffered * (1 - esopPool / 100) },
      { name: 'ESOP', value: esopPool },
    ],
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm text-muted-foreground mb-1">
            Capital Formation &gt; Capital Structure
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Capital Structure Modeling</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline"><Save className="mr-2 h-4 w-4" /> Save Model</Button>
          <Button><Share className="mr-2 h-4 w-4" /> Share</Button>
        </div>
      </div>

      <Alert className="bg-blue-50 border-blue-200 text-blue-800 [&>svg]:text-blue-500">
        <Info className="h-4 w-4" />
        <AlertDescription>
          This tool helps you model different capital structure scenarios for your tokenized asset. Adjust parameters to visualize potential outcomes and optimize your fundraising strategy. All models are for planning purposes only.
        </AlertDescription>
      </Alert>

      <div className="grid lg:grid-cols-5 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader><CardTitle>Model Parameters</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="scenario-name">Scenario Name</Label>
              <Input id="scenario-name" defaultValue="Series A Funding" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="valuation">Valuation (Pre-Money)</Label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">$</span>
                <Input id="valuation" value={preMoney.toLocaleString('en-US')} onChange={(e) => setPreMoney(Number(e.target.value.replace(/,/g, '')))} className="pl-7" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="raise-amount">Target Raise Amount</Label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">$</span>
                <Input id="raise-amount" value={raiseAmount.toLocaleString('en-US')} onChange={(e) => setRaiseAmount(Number(e.target.value.replace(/,/g, '')))} className="pl-7" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="equity-offered">Equity Offered (%)</Label>
              <div className="relative">
                <Input id="equity-offered" type="number" value={equityOffered} onChange={(e) => setEquityOffered(Number(e.target.value))} className="pr-8" />
                <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground">%</span>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="esop-pool">ESOP Pool</Label>
              <div className="relative">
                <Input id="esop-pool" type="number" value={esopPool} onChange={(e) => setEsopPool(Number(e.target.value))} className="pr-8" />
                <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground">%</span>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="token-type">Token Type</Label>
              <Select defaultValue="equity">
                <SelectTrigger id="token-type"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="equity">Equity Token</SelectItem>
                  <SelectItem value="utility">Utility Token</SelectItem>
                  <SelectItem value="security">Security Token</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button className="w-full">Update Model</Button>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3">
          <Tabs defaultValue="post-money">
            <CardHeader className="flex-row items-center justify-between">
              <CardTitle>Ownership Structure</CardTitle>
              <TabsList>
                <TabsTrigger value="pre-money">Pre-Money</TabsTrigger>
                <TabsTrigger value="post-money">Post-Money</TabsTrigger>
                <TabsTrigger value="fully-diluted">Fully Diluted</TabsTrigger>
              </TabsList>
            </CardHeader>
            <CardContent>
              <TabsContent value="pre-money" className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={ownershipData.preMoney} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={80} outerRadius={110} paddingAngle={2}>
                      <Cell fill={OWNERSHIP_COLORS[0]} />
                    </Pie>
                    <Legend iconType="circle" />
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </TabsContent>
              <TabsContent value="post-money" className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={ownershipData.postMoney} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={80} outerRadius={110} paddingAngle={2}>
                      {ownershipData.postMoney.map((entry, index) => <Cell key={`cell-${index}`} fill={OWNERSHIP_COLORS[index]} />)}
                    </Pie>
                    <Legend iconType="circle" />
                    <Tooltip formatter={(value) => `${Number(value).toFixed(2)}%`} />
                  </PieChart>
                </ResponsiveContainer>
              </TabsContent>
              <TabsContent value="fully-diluted" className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={ownershipData.fullyDiluted} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={80} outerRadius={110} paddingAngle={2}>
                      {ownershipData.fullyDiluted.map((entry, index) => <Cell key={`cell-${index}`} fill={OWNERSHIP_COLORS[index]} />)}
                    </Pie>
                    <Legend iconType="circle" />
                    <Tooltip formatter={(value) => `${Number(value).toFixed(2)}%`} />
                  </PieChart>
                </ResponsiveContainer>
              </TabsContent>
              <div className="grid grid-cols-3 gap-4 text-center mt-4 pt-4 border-t">
                <div>
                  <p className="text-sm text-muted-foreground">Post-Money Valuation</p>
                  <p className="text-xl font-bold">{formatCurrency(postMoney)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Price Per Token</p>
                  <p className="text-xl font-bold">${pricePerToken.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Founder Dilution</p>
                  <p className="text-xl font-bold">{founderDilution}%</p>
                </div>
              </div>
            </CardContent>
          </Tabs>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Scenario Comparison</CardTitle>
          <Button variant="outline" size="sm"><Plus className="mr-2 h-4 w-4" /> Add Scenario</Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>SCENARIO</TableHead>
                <TableHead>PRE-MONEY</TableHead>
                <TableHead>RAISE AMOUNT</TableHead>
                <TableHead>EQUITY OFFERED</TableHead>
                <TableHead>POST-MONEY</TableHead>
                <TableHead>FOUNDER OWNERSHIP</TableHead>
                <TableHead>ACTIONS</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {scenarios.map(scenario => (
                <TableRow key={scenario.name} className={scenario.name === 'Series A Funding' ? 'bg-blue-50' : ''}>
                  <TableCell className="font-medium flex items-center gap-2">
                    <div className="h-2.5 w-2.5 rounded-full bg-blue-600"></div>
                    {scenario.name}
                  </TableCell>
                  <TableCell>{formatCurrency(scenario.preMoney)}</TableCell>
                  <TableCell>{formatCurrency(scenario.raise)}</TableCell>
                  <TableCell>{scenario.equity}%</TableCell>
                  <TableCell>{formatCurrency(scenario.preMoney + scenario.raise)}</TableCell>
                  <TableCell>{scenario.founderOwnership}%</TableCell>
                  <TableCell><Button variant="link" className="p-0 h-auto">Edit</Button></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Dilution Impact Analysis</CardTitle></CardHeader>
        <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={dilutionData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" />
                    <YAxis unit="%" />
                    <Tooltip formatter={(value) => `${value}%`} />
                    <Legend />
                    <Line type="monotone" dataKey="Founder" name="Founder Ownership" stroke={OWNERSHIP_COLORS[0]} strokeWidth={2} />
                    <Line type="monotone" dataKey="Investor" name="Investor Ownership" stroke={OWNERSHIP_COLORS[1]} strokeWidth={2} />
                    <Line type="monotone" dataKey="ESOP" name="ESOP" stroke={OWNERSHIP_COLORS[2]} strokeWidth={2} />
                </LineChart>
            </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
