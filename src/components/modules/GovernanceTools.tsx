import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Vote,
  Users,
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Plus,
  FileText,
  BarChart3,
  Settings
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const proposals = [
  {
    id: 1,
    title: 'Dividend Distribution Policy Update',
    description: 'Proposal to increase quarterly dividend distribution from 3% to 4% of net income',
    status: 'Active',
    votesFor: 2847,
    votesAgainst: 943,
    deadline: '2024-02-15',
    proposer: 'Sarah Chen',
    quorum: 65,
    threshold: 60
  },
  {
    id: 2,
    title: 'Property Management Fee Adjustment',
    description: 'Reduce property management fees from 2.5% to 2.0% of rental income',
    status: 'Passed',
    votesFor: 3421,
    votesAgainst: 678,
    deadline: '2024-01-28',
    proposer: 'Michael Rodriguez',
    quorum: 72,
    threshold: 60
  },
  {
    id: 3,
    title: 'Capital Improvement Budget',
    description: 'Approve $500K budget for HVAC system upgrades and energy efficiency improvements',
    status: 'Draft',
    votesFor: 0,
    votesAgainst: 0,
    deadline: '2024-02-20',
    proposer: 'David Kim',
    quorum: 0,
    threshold: 60
  }
];

const governanceTemplates = [
  {
    id: 1,
    name: 'Real Estate Token Governance',
    description: 'Standard governance structure for real estate tokenization',
    features: ['Quarterly voting', '60% approval threshold', 'Token-weighted voting'],
    usageCount: 245
  },
  {
    id: 2,
    name: 'Infrastructure Fund Governance',
    description: 'Governance template for infrastructure investment tokens',
    features: ['Monthly proposals', '55% approval threshold', 'Delegate voting'],
    usageCount: 178
  },
  {
    id: 3,
    name: 'Private Equity Governance',
    description: 'Advanced governance for private equity tokenization',
    features: ['Conditional voting', '70% approval threshold', 'Vesting requirements'],
    usageCount: 89
  }
];

const participationData = [
  { month: 'Jan', participation: 68 },
  { month: 'Feb', participation: 72 },
  { month: 'Mar', participation: 65 },
  { month: 'Apr', participation: 78 },
  { month: 'May', participation: 82 },
  { month: 'Jun', participation: 75 }
];

const voteDistribution = [
  { name: 'For', value: 3421, color: '#22c55e' },
  { name: 'Against', value: 678, color: '#ef4444' },
  { name: 'Abstain', value: 156, color: '#f59e0b' }
];

const StatusBadge = ({ status }: { status: string }) => {
  const styles = {
    'Active': 'bg-blue-100 text-blue-800 border-blue-200',
    'Passed': 'bg-green-100 text-green-800 border-green-200',
    'Failed': 'bg-red-100 text-red-800 border-red-200',
    'Draft': 'bg-gray-100 text-gray-800 border-gray-200'
  };

  return (
    <Badge variant="outline" className={styles[status as keyof typeof styles]}>
      {status}
    </Badge>
  );
};

export function GovernanceTools() {
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null);
  const [showNewProposal, setShowNewProposal] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">SimplyGovern</h1>
          <p className="text-muted-foreground mt-1">
            Establish governance structures and compliance frameworks
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Settings className="mr-2 h-4 w-4" />
            Configure
          </Button>
          <Dialog open={showNewProposal} onOpenChange={setShowNewProposal}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                New Proposal
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Governance Proposal</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Proposal Title</Label>
                  <Input id="title" placeholder="Enter proposal title" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Provide a detailed description of the proposal"
                    rows={4}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="threshold">Approval Threshold (%)</Label>
                    <Input id="threshold" type="number" defaultValue="60" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="deadline">Voting Deadline</Label>
                    <Input id="deadline" type="date" />
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setShowNewProposal(false)}>
                    Cancel
                  </Button>
                  <Button onClick={() => setShowNewProposal(false)}>
                    Create Proposal
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Tabs defaultValue="proposals" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="proposals">Proposals</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="proposals" className="space-y-6">
          {/* Active Proposals */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Vote className="h-5 w-5" />
                Active Proposals
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {proposals.map((proposal) => (
                  <Card key={proposal.id} className="border-l-4 border-l-blue-500">
                    <CardContent className="pt-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className="font-semibold">{proposal.title}</h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            {proposal.description}
                          </p>
                          <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                            <span>Proposed by {proposal.proposer}</span>
                            <span>Deadline: {proposal.deadline}</span>
                          </div>
                        </div>
                        <StatusBadge status={proposal.status} />
                      </div>

                      {proposal.status === 'Active' && (
                        <div className="space-y-3">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                              <div className="flex justify-between text-sm mb-1">
                                <span>For: {proposal.votesFor.toLocaleString()}</span>
                                <span>Against: {proposal.votesAgainst.toLocaleString()}</span>
                              </div>
                              <Progress
                                value={(proposal.votesFor / (proposal.votesFor + proposal.votesAgainst)) * 100}
                                className="h-2"
                              />
                            </div>
                            <div>
                              <div className="flex justify-between text-sm mb-1">
                                <span>Participation</span>
                                <span>{proposal.quorum}%</span>
                              </div>
                              <Progress value={proposal.quorum} className="h-2" />
                            </div>
                            <div className="flex gap-2">
                              <Button size="sm" className="flex-1">
                                <CheckCircle className="mr-2 h-4 w-4" />
                                Vote For
                              </Button>
                              <Button size="sm" variant="outline" className="flex-1">
                                <XCircle className="mr-2 h-4 w-4" />
                                Vote Against
                              </Button>
                            </div>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Governance Templates</CardTitle>
              <p className="text-muted-foreground">
                Select from proven governance structures for your tokenization project
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {governanceTemplates.map((template) => (
                  <Card
                    key={template.id}
                    className="cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => setSelectedTemplate(template)}
                  >
                    <CardHeader>
                      <CardTitle className="text-base">{template.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        {template.description}
                      </p>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 mb-4">
                        {template.features.map((feature, index) => (
                          <div key={index} className="flex items-center gap-2 text-sm">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            {feature}
                          </div>
                        ))}
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">
                          Used by {template.usageCount} projects
                        </span>
                        <Button size="sm">Use Template</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Proposals</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24</div>
                <p className="text-xs text-muted-foreground">+3 from last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg Participation</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">73%</div>
                <p className="text-xs text-muted-foreground">+5% from last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pass Rate</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">87%</div>
                <p className="text-xs text-muted-foreground">+2% from last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg Duration</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">7 days</div>
                <p className="text-xs text-muted-foreground">-1 day from last month</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Participation Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={participationData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Bar dataKey="participation" fill="#0A1F44" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Vote Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={voteDistribution}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {voteDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex justify-center gap-4 mt-4">
                  {voteDistribution.map((entry) => (
                    <div key={entry.name} className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: entry.color }}
                      />
                      <span className="text-sm">{entry.name}: {entry.value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Governance Configuration</CardTitle>
              <p className="text-muted-foreground">
                Configure voting parameters and governance rules for your tokenized asset
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="voting-threshold">Default Approval Threshold (%)</Label>
                    <Input id="voting-threshold" type="number" defaultValue="60" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="quorum">Minimum Quorum (%)</Label>
                    <Input id="quorum" type="number" defaultValue="50" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="voting-period">Voting Period (days)</Label>
                    <Input id="voting-period" type="number" defaultValue="7" />
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="proposal-threshold">Proposal Threshold (tokens)</Label>
                    <Input id="proposal-threshold" type="number" defaultValue="1000" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="voting-weight">Voting Weight Method</Label>
                    <Select defaultValue="token-weighted">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="token-weighted">Token Weighted</SelectItem>
                        <SelectItem value="one-person-one-vote">One Person One Vote</SelectItem>
                        <SelectItem value="quadratic">Quadratic Voting</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="delegation">Allow Delegation</Label>
                    <Select defaultValue="enabled">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="enabled">Enabled</SelectItem>
                        <SelectItem value="disabled">Disabled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              <div className="flex justify-end">
                <Button>Save Configuration</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}