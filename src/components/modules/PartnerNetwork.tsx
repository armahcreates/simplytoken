import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Search,
  Filter,
  Star,
  MapPin,
  Briefcase,
  Users,
  Award,
  MessageSquare,
  FileText,
  Calendar,
  DollarSign,
  TrendingUp,
  Clock
} from 'lucide-react';

const serviceProviders = [
  {
    id: 1,
    name: 'Tokenization Legal LLP',
    expertise: ['Securities Law', 'Regulatory Compliance', 'Smart Contracts'],
    jurisdiction: 'United States',
    rating: 4.8,
    reviews: 127,
    caseStudies: 15,
    completedProjects: 89,
    location: 'New York, NY',
    hourlyRate: '$450-650',
    verified: true,
    premium: true
  },
  {
    id: 2,
    name: 'Digital Asset Advisors',
    expertise: ['Token Economics', 'Market Analysis', 'Investment Strategy'],
    jurisdiction: 'European Union',
    rating: 4.6,
    reviews: 84,
    caseStudies: 12,
    completedProjects: 67,
    location: 'London, UK',
    hourlyRate: '$350-500',
    verified: true,
    premium: false
  },
  {
    id: 3,
    name: 'BlockChain Tech Solutions',
    expertise: ['Smart Contract Development', 'Security Audits', 'Platform Integration'],
    jurisdiction: 'Singapore',
    rating: 4.9,
    reviews: 156,
    caseStudies: 23,
    completedProjects: 134,
    location: 'Singapore',
    hourlyRate: '$200-350',
    verified: true,
    premium: true
  },
  {
    id: 4,
    name: 'Real Estate Token Partners',
    expertise: ['Real Estate Tokenization', 'Asset Valuation', 'Property Management'],
    jurisdiction: 'United States',
    rating: 4.5,
    reviews: 93,
    caseStudies: 18,
    completedProjects: 76,
    location: 'Los Angeles, CA',
    hourlyRate: '$300-450',
    verified: true,
    premium: false
  }
];

const projectTasks = [
  {
    id: 1,
    title: 'Legal Structure Review',
    assignee: 'Tokenization Legal LLP',
    status: 'In Progress',
    dueDate: '2024-02-15',
    progress: 65
  },
  {
    id: 2,
    title: 'Smart Contract Development',
    assignee: 'BlockChain Tech Solutions',
    status: 'Completed',
    dueDate: '2024-01-30',
    progress: 100
  },
  {
    id: 3,
    title: 'Market Analysis Report',
    assignee: 'Digital Asset Advisors',
    status: 'Pending',
    dueDate: '2024-02-20',
    progress: 0
  },
  {
    id: 4,
    title: 'Asset Valuation',
    assignee: 'Real Estate Token Partners',
    status: 'In Progress',
    dueDate: '2024-02-10',
    progress: 45
  }
];

const performanceMetrics = [
  {
    provider: 'Tokenization Legal LLP',
    onTimeDelivery: 95,
    qualityScore: 4.8,
    communicationRating: 4.9,
    totalBilled: '$145,000',
    projectsCompleted: 8
  },
  {
    provider: 'BlockChain Tech Solutions',
    onTimeDelivery: 98,
    qualityScore: 4.9,
    communicationRating: 4.7,
    totalBilled: '$89,000',
    projectsCompleted: 12
  }
];

const StatusBadge = ({ status }: { status: string }) => {
  const styles = {
    'In Progress': 'bg-blue-100 text-blue-800 border-blue-200',
    'Completed': 'bg-green-100 text-green-800 border-green-200',
    'Pending': 'bg-yellow-100 text-yellow-800 border-yellow-200',
    'Overdue': 'bg-red-100 text-red-800 border-red-200'
  };

  return (
    <Badge variant="outline" className={styles[status as keyof typeof styles]}>
      {status}
    </Badge>
  );
};

export function PartnerNetwork() {
  const [selectedProvider, setSelectedProvider] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterExpertise, setFilterExpertise] = useState('all');

  const filteredProviders = serviceProviders.filter(provider => {
    const matchesSearch = provider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         provider.expertise.some(exp => exp.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesExpertise = filterExpertise === 'all' || provider.expertise.includes(filterExpertise);
    return matchesSearch && matchesExpertise;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Partner Network</h1>
          <p className="text-muted-foreground mt-1">
            Find qualified service providers and manage your tokenization team
          </p>
        </div>
        <Button>
          <Users className="mr-2 h-4 w-4" />
          Join Network
        </Button>
      </div>

      <Tabs defaultValue="directory" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="directory">Service Directory</TabsTrigger>
          <TabsTrigger value="collaboration">Project Collaboration</TabsTrigger>
          <TabsTrigger value="management">Vendor Management</TabsTrigger>
        </TabsList>

        <TabsContent value="directory" className="space-y-6">
          {/* Search and Filters */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by name, expertise, or location..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex gap-2">
                  <Select value={filterExpertise} onValueChange={setFilterExpertise}>
                    <SelectTrigger className="w-[200px]">
                      <SelectValue placeholder="Filter by expertise" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Expertise</SelectItem>
                      <SelectItem value="Securities Law">Securities Law</SelectItem>
                      <SelectItem value="Smart Contracts">Smart Contracts</SelectItem>
                      <SelectItem value="Token Economics">Token Economics</SelectItem>
                      <SelectItem value="Real Estate Tokenization">Real Estate</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Service Providers Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProviders.map((provider) => (
              <Card
                key={provider.id}
                className="cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => setSelectedProvider(provider)}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={`https://ui-avatars.com/api/?name=${provider.name}&background=0A1F44&color=fff`} />
                        <AvatarFallback>{provider.name.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-base">{provider.name}</CardTitle>
                        <div className="flex items-center gap-1 mt-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium">{provider.rating}</span>
                          <span className="text-sm text-muted-foreground">
                            ({provider.reviews} reviews)
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      {provider.verified && (
                        <Badge variant="outline" className="text-xs bg-green-100 text-green-800">
                          Verified
                        </Badge>
                      )}
                      {provider.premium && (
                        <Badge variant="outline" className="text-xs bg-purple-100 text-purple-800">
                          Premium
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      {provider.location} • {provider.jurisdiction}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <DollarSign className="h-4 w-4" />
                      {provider.hourlyRate} per hour
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {provider.expertise.slice(0, 2).map((skill, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                      {provider.expertise.length > 2 && (
                        <Badge variant="secondary" className="text-xs">
                          +{provider.expertise.length - 2} more
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">
                        {provider.completedProjects} projects completed
                      </span>
                      <span className="text-muted-foreground">
                        {provider.caseStudies} case studies
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="collaboration" className="space-y-6">
          {/* Project Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Tasks</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">3 due this week</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Team Members</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8</div>
                <p className="text-xs text-muted-foreground">4 external partners</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Project Progress</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">68%</div>
                <p className="text-xs text-muted-foreground">On track for Q2 launch</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Budget Used</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$234K</div>
                <p className="text-xs text-muted-foreground">of $350K total</p>
              </CardContent>
            </Card>
          </div>

          {/* Task Management */}
          <Card>
            <CardHeader>
              <CardTitle>Project Tasks</CardTitle>
              <p className="text-muted-foreground">
                Track progress across all team members and service providers
              </p>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Task</TableHead>
                    <TableHead>Assignee</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Progress</TableHead>
                    <TableHead>Due Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {projectTasks.map((task) => (
                    <TableRow key={task.id}>
                      <TableCell className="font-medium">{task.title}</TableCell>
                      <TableCell>{task.assignee}</TableCell>
                      <TableCell>
                        <StatusBadge status={task.status} />
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress value={task.progress} className="w-20 h-2" />
                          <span className="text-sm">{task.progress}%</span>
                        </div>
                      </TableCell>
                      <TableCell>{task.dueDate}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="management" className="space-y-6">
          {/* Performance Overview */}
          <Card>
            <CardHeader>
              <CardTitle>Vendor Performance Metrics</CardTitle>
              <p className="text-muted-foreground">
                Track service provider performance and value delivery
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {performanceMetrics.map((metric, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold">{metric.provider}</h3>
                      <div className="flex items-center gap-2">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{metric.qualityScore}</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">On-Time Delivery</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Progress value={metric.onTimeDelivery} className="flex-1 h-2" />
                          <span className="text-sm font-medium">{metric.onTimeDelivery}%</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Communication</p>
                        <div className="flex items-center gap-1 mt-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium">{metric.communicationRating}</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Total Billed</p>
                        <p className="text-sm font-medium mt-1">{metric.totalBilled}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Projects Completed</p>
                        <p className="text-sm font-medium mt-1">{metric.projectsCompleted}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Contract Management */}
          <Card>
            <CardHeader>
              <CardTitle>Contract & Payment Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">Active Contracts</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">6</div>
                    <p className="text-sm text-muted-foreground">3 renewals due this quarter</p>
                    <Button variant="outline" size="sm" className="mt-3 w-full">
                      View Contracts
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">Pending Payments</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">$47K</div>
                    <p className="text-sm text-muted-foreground">4 invoices awaiting approval</p>
                    <Button variant="outline" size="sm" className="mt-3 w-full">
                      Review Payments
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">Vendor Feedback</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">4.7</div>
                    <p className="text-sm text-muted-foreground">Average rating given</p>
                    <Button variant="outline" size="sm" className="mt-3 w-full">
                      Submit Feedback
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Service Provider Detail Modal */}
      <Dialog open={!!selectedProvider} onOpenChange={() => setSelectedProvider(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedProvider && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={`https://ui-avatars.com/api/?name=${selectedProvider.name}&background=0A1F44&color=fff`} />
                    <AvatarFallback>{selectedProvider.name.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="text-xl font-bold">{selectedProvider.name}</h2>
                    <div className="flex items-center gap-2">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span>{selectedProvider.rating}</span>
                      <span className="text-muted-foreground">({selectedProvider.reviews} reviews)</span>
                    </div>
                  </div>
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-2">Expertise Areas</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedProvider.expertise.map((skill: string, index: number) => (
                        <Badge key={index} variant="secondary">{skill}</Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Service Details</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Location:</span>
                        <span>{selectedProvider.location}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Jurisdiction:</span>
                        <span>{selectedProvider.jurisdiction}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Hourly Rate:</span>
                        <span>{selectedProvider.hourlyRate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Projects Completed:</span>
                        <span>{selectedProvider.completedProjects}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button className="flex-1">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Contact Provider
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <FileText className="mr-2 h-4 w-4" />
                    Request Proposal
                  </Button>
                  <Button variant="outline">
                    <Award className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}