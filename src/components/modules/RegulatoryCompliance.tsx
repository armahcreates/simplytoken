'use client'

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Stepper } from '@/components/Stepper';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import {
  ArrowRight,
  ArrowLeft,
  Plus,
  X,
  AlertCircle,
  Info,
  Save,
  CheckCircle,
  XCircle,
  Clock,
  Loader2
} from 'lucide-react';

const steps = ["Initial Assessment", "Regulatory Compliance", "Documentation", "Readiness Dashboard"];

const requirements = [
  { requirement: 'Securities Registration', description: 'Regulation D / Regulation A+', authority: 'SEC', status: 'Pending Review' },
  { requirement: 'Investor Accreditation', description: 'Verification requirements', authority: 'SEC', status: 'Compliant' },
  { requirement: 'AML Program', description: 'Anti-Money Laundering policies', authority: 'FinCEN', status: 'Compliant' },
  { requirement: 'KYC Procedures', description: 'Know Your Customer verification', authority: 'FinCEN', status: 'Compliant' },
  { requirement: 'Form 1099 Reporting', description: 'Digital asset transaction reporting', authority: 'IRS', status: 'Non-Compliant' },
  { requirement: 'Custody Rules', description: 'Digital asset custody requirements', authority: 'SEC', status: 'Pending Review' },
];

const StatusBadge = ({ status }: { status: string }) => {
  const statusStyles: { [key: string]: string } = {
    'Compliant': 'bg-green-100 text-green-800 border-green-200',
    'Non-Compliant': 'bg-red-100 text-red-800 border-red-200',
    'Pending Review': 'bg-yellow-100 text-yellow-800 border-yellow-200',
    'Partial': 'bg-orange-100 text-orange-800 border-orange-200',
  };
  const IconComponent = {
    'Compliant': CheckCircle,
    'Non-Compliant': XCircle,
    'Pending Review': Clock,
    'Partial': AlertCircle,
  }[status] || AlertCircle;

  return (
    <Badge variant="outline" className={cn('font-medium text-xs flex items-center w-fit', statusStyles[status])}>
      <IconComponent className="h-3 w-3 mr-1" />
      {status}
    </Badge>
  );
};

export function RegulatoryCompliance() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showAddJurisdiction, setShowAddJurisdiction] = useState(false);
  const [newJurisdiction, setNewJurisdiction] = useState('');
  const [jurisdictions, setJurisdictions] = useState<string[]>([
    'United States (Federal)',
    'New York (State)',
    'European Union'
  ]);

  // Load saved jurisdictions from localStorage
  useEffect(() => {
    const savedData = localStorage.getItem('regulatoryCompliance');
    if (savedData) {
      try {
        const data = JSON.parse(savedData);
        if (data.jurisdictions) {
          setJurisdictions(data.jurisdictions);
        }
      } catch (error) {
        console.error('Error loading saved data:', error);
      }
    }
  }, []);

  const handleRemoveJurisdiction = (jurisdiction: string) => {
    setJurisdictions(prev => prev.filter(j => j !== jurisdiction));
    toast.success(`${jurisdiction} removed`);
  };

  const handleAddJurisdiction = () => {
    if (!newJurisdiction.trim()) {
      toast.error('Please enter a jurisdiction name');
      return;
    }
    if (jurisdictions.includes(newJurisdiction.trim())) {
      toast.error('This jurisdiction is already added');
      return;
    }
    setJurisdictions(prev => [...prev, newJurisdiction.trim()]);
    toast.success(`${newJurisdiction} added successfully`);
    setNewJurisdiction('');
    setShowAddJurisdiction(false);
  };

  const handleFixIssue = (requirementName: string) => {
    toast.info(`Opening compliance wizard for: ${requirementName}`);
    // In a real app, this would navigate to a specific compliance workflow
  };

  const handleReview = (requirementName: string) => {
    toast.info(`Reviewing requirement: ${requirementName}`);
    // In a real app, this would open detailed compliance information
  };

  const handleSaveProgress = async () => {
    setIsLoading(true);
    try {
      const data = {
        jurisdictions,
        lastUpdated: new Date().toISOString()
      };
      localStorage.setItem('regulatoryCompliance', JSON.stringify(data));

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));

      toast.success('Progress saved successfully');
    } catch (error) {
      toast.error('Failed to save progress');
      console.error('Error saving progress:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center text-sm text-muted-foreground">
        <Link href="/" className="hover:text-primary">Dashboard</Link>
        <ArrowRight className="mx-2 h-4 w-4" />
        <Link href="/asset-readiness" className="hover:text-primary">Asset Readiness</Link>
        <ArrowRight className="mx-2 h-4 w-4" />
        <span className="text-foreground">Regulatory Compliance</span>
      </div>
      
      <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mt-4">Asset Readiness Assessment</h1>
      <div className="pt-8">
        <Stepper steps={steps} currentStep={2} />
      </div>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Regulatory Compliance Checker</CardTitle>
          <p className="text-muted-foreground pt-2">
            Based on your initial assessment, we've identified the following jurisdictions that may apply to your asset. Review the compliance requirements for each jurisdiction to ensure your tokenization process meets all legal standards.
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="text-sm font-medium mb-2">Selected Jurisdictions</h3>
            <div className="flex flex-wrap gap-2">
              {jurisdictions.map((jurisdiction) => (
                <Badge
                  key={jurisdiction}
                  className="py-1 px-3 text-sm bg-blue-100 text-blue-800 hover:bg-blue-200 font-normal"
                >
                  {jurisdiction}
                  <X
                    className="ml-2 h-4 w-4 cursor-pointer"
                    onClick={() => handleRemoveJurisdiction(jurisdiction)}
                  />
                </Badge>
              ))}
              <Dialog open={showAddJurisdiction} onOpenChange={setShowAddJurisdiction}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" className="font-normal">
                    <Plus className="mr-1 h-4 w-4" /> Add Jurisdiction
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add Jurisdiction</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="jurisdiction">Jurisdiction Name</Label>
                      <Input
                        id="jurisdiction"
                        placeholder="e.g., California (State)"
                        value={newJurisdiction}
                        onChange={(e) => setNewJurisdiction(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            handleAddJurisdiction();
                          }
                        }}
                      />
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" onClick={() => setShowAddJurisdiction(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleAddJurisdiction}>Add</Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          <Tabs defaultValue="us-federal">
            <TabsList>
              <TabsTrigger value="us-federal">United States (Federal)</TabsTrigger>
              <TabsTrigger value="ny-state">New York (State)</TabsTrigger>
              <TabsTrigger value="eu">European Union</TabsTrigger>
            </TabsList>
            <TabsContent value="us-federal" className="space-y-6 pt-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">United States Federal Requirements</h2>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-muted-foreground">Compliance Status:</span>
                  <Badge variant="outline" className="font-medium text-orange-600 bg-orange-50 border-orange-200"><AlertCircle className="h-3 w-3 mr-1" />Partial Compliance</Badge>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Securities Regulations</CardTitle>
                    <p className="text-sm text-muted-foreground">SEC regulations for tokenized assets</p>
                  </CardHeader>
                  <CardContent>
                    <StatusBadge status="Partial" />
                    <Button variant="link" className="p-0 h-auto mt-2 text-sm">View details</Button>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">AML/KYC Requirements</CardTitle>
                    <p className="text-sm text-muted-foreground">Anti-Money Laundering standards</p>
                  </CardHeader>
                  <CardContent>
                    <StatusBadge status="Compliant" />
                    <Button variant="link" className="p-0 h-auto mt-2 text-sm">View details</Button>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Tax Reporting</CardTitle>
                    <p className="text-sm text-muted-foreground">IRS requirements for digital assets</p>
                  </CardHeader>
                  <CardContent>
                    <StatusBadge status="Non-Compliant" />
                    <Button variant="link" className="p-0 h-auto mt-2 text-sm">View details</Button>
                  </CardContent>
                </Card>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-2/5">REQUIREMENT</TableHead>
                    <TableHead>REGULATORY AUTHORITY</TableHead>
                    <TableHead>STATUS</TableHead>
                    <TableHead>ACTIONS</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {requirements.map(req => (
                    <TableRow key={req.requirement}>
                      <TableCell>
                        <p className="font-medium">{req.requirement}</p>
                        <p className="text-xs text-muted-foreground">{req.description}</p>
                      </TableCell>
                      <TableCell>{req.authority}</TableCell>
                      <TableCell><StatusBadge status={req.status} /></TableCell>
                      <TableCell>
                        <Button
                          variant="link"
                          className="p-0 h-auto text-sm font-semibold"
                          onClick={() => req.status === 'Non-Compliant' ? handleFixIssue(req.requirement) : handleReview(req.requirement)}
                        >
                          {req.status === 'Non-Compliant' ? 'Fix Issue' : 'Review'}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
            <TabsContent value="ny-state">
              <p className="text-muted-foreground p-8 text-center">New York (State) requirements will be displayed here.</p>
            </TabsContent>
            <TabsContent value="eu">
              <p className="text-muted-foreground p-8 text-center">European Union requirements will be displayed here.</p>
            </TabsContent>
          </Tabs>

          <Card>
            <CardHeader>
              <CardTitle>Compliance Summary</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
              <div>
                <label className="text-sm font-medium">Overall Compliance</label>
                <div className="flex items-center gap-3 mt-1">
                  <Progress value={65} className="h-2 bg-orange-100 [&>div]:bg-orange-400" />
                  <span className="font-bold text-base">65%</span>
                </div>
              </div>
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Critical Issues</p>
                <p className="text-3xl font-bold text-red-600">1</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Pending Reviews</p>
                <p className="text-3xl font-bold text-yellow-600">2</p>
              </div>
            </CardContent>
          </Card>

          <div>
            <h3 className="text-lg font-semibold mb-3">Recommendations</h3>
            <div className="space-y-4">
              <Alert variant="destructive" className="bg-red-50 border-red-200 text-red-800 [&>svg]:text-red-500">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle className="font-semibold">Implement Tax Reporting System</AlertTitle>
                <AlertDescription>
                  Your asset requires IRS Form 1099 reporting capabilities. We recommend implementing a compliant tax reporting system before proceeding with tokenization.
                  <Button variant="link" className="p-0 h-auto text-red-600 font-semibold ml-1">View Solutions</Button>
                </AlertDescription>
              </Alert>
              <Alert className="bg-orange-50 border-orange-200 text-orange-800 [&>svg]:text-orange-500">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle className="font-semibold">Complete SEC Registration Review</AlertTitle>
                <AlertDescription>
                  Your asset may qualify for Regulation D exemption. Complete the securities registration review to determine the appropriate filing requirements.
                  <Button variant="link" className="p-0 h-auto text-orange-600 font-semibold ml-1">Continue Review</Button>
                </AlertDescription>
              </Alert>
              <Alert className="bg-blue-50 border-blue-200 text-blue-800 [&>svg]:text-blue-500">
                <Info className="h-4 w-4" />
                <AlertTitle className="font-semibold">Consider Legal Consultation</AlertTitle>
                <AlertDescription>
                  Given the complexity of your asset and multi-jurisdictional requirements, we recommend consulting with a specialized legal advisor.
                  <Button variant="link" className="p-0 h-auto text-blue-600 font-semibold ml-1">Browse Partner Network</Button>
                </AlertDescription>
              </Alert>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-col sm:flex-row justify-between items-center pt-4 gap-4">
        <Button
          variant="ghost"
          className="w-full sm:w-auto"
          onClick={handleSaveProgress}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" /> Save Progress
            </>
          )}
        </Button>
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <Button variant="outline" asChild className="w-full sm:w-auto">
            <Link href="/asset-readiness"><ArrowLeft className="mr-2 h-4 w-4" /> Previous</Link>
          </Button>
          <Button asChild className="w-full sm:w-auto">
            <Link href="/asset-readiness/documentation">Continue <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
