import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { 
  Save, 
  RefreshCw, 
  Shield, 
  Bell, 
  DollarSign,
  Users,
  FileText,
  Info
} from 'lucide-react';
import * as React from 'react';

export function Settings() {
  const [autoApproval, setAutoApproval] = React.useState(false);
  const [emailNotifications, setEmailNotifications] = React.useState(true);
  const [smsNotifications, setSmsNotifications] = React.useState(false);
  const [publicListing, setPublicListing] = React.useState(true);
  const [kycRequired, setKycRequired] = React.useState(true);
  const [accreditedOnly, setAccreditedOnly] = React.useState(false);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-sm text-muted-foreground mb-1">
            Capital Formation &gt; Settings
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Capital Formation Settings</h1>
          <p className="text-muted-foreground mt-1">Configure your fundraising parameters and preferences</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="w-full sm:w-auto">
            <RefreshCw className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Reset</span>
          </Button>
          <Button size="sm" className="w-full sm:w-auto">
            <Save className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Save Changes</span>
          </Button>
        </div>
      </div>

      <Alert className="bg-blue-50 border-blue-200 text-blue-800 [&>svg]:text-blue-500">
        <Info className="h-4 w-4" />
        <AlertDescription>
          These settings control how your capital formation campaign operates. Changes may take up to 24 hours to take effect and may require regulatory approval.
        </AlertDescription>
      </Alert>

      {/* Campaign Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            Campaign Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="campaign-name">Campaign Name</Label>
              <Input id="campaign-name" defaultValue="Series A Token Offering" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="campaign-type">Campaign Type</Label>
              <Select defaultValue="reg-d">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="reg-d">Regulation D (506b)</SelectItem>
                  <SelectItem value="reg-cf">Regulation CF</SelectItem>
                  <SelectItem value="reg-a">Regulation A+</SelectItem>
                  <SelectItem value="private">Private Placement</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="target-amount">Target Amount ($)</Label>
              <Input id="target-amount" type="number" defaultValue="5000000" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="min-investment">Minimum Investment ($)</Label>
              <Input id="min-investment" type="number" defaultValue="10000" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="max-investment">Maximum Investment ($)</Label>
              <Input id="max-investment" type="number" defaultValue="500000" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="campaign-duration">Campaign Duration (days)</Label>
              <Input id="campaign-duration" type="number" defaultValue="90" />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="campaign-description">Campaign Description</Label>
            <Textarea 
              id="campaign-description" 
              placeholder="Describe your tokenized asset and investment opportunity..."
              className="min-h-[100px]"
              defaultValue="Revolutionary tokenized real estate investment opportunity in prime commercial properties."
            />
          </div>
        </CardContent>
      </Card>

      {/* Investor Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Investor Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Accredited Investors Only</Label>
              <p className="text-sm text-muted-foreground">
                Restrict investments to accredited investors only
              </p>
            </div>
            <Switch checked={accreditedOnly} onCheckedChange={setAccreditedOnly} />
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>KYC/AML Required</Label>
              <p className="text-sm text-muted-foreground">
                Require Know Your Customer verification for all investors
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary">Required</Badge>
              <Switch checked={kycRequired} onCheckedChange={setKycRequired} disabled />
            </div>
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Auto-Approval</Label>
              <p className="text-sm text-muted-foreground">
                Automatically approve investments that meet criteria
              </p>
            </div>
            <Switch checked={autoApproval} onCheckedChange={setAutoApproval} />
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Public Listing</Label>
              <p className="text-sm text-muted-foreground">
                Make campaign visible in public marketplace
              </p>
            </div>
            <Switch checked={publicListing} onCheckedChange={setPublicListing} />
          </div>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notification Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Email Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Receive email updates for new investments and milestones
              </p>
            </div>
            <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>SMS Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Receive SMS alerts for urgent updates
              </p>
            </div>
            <Switch checked={smsNotifications} onCheckedChange={setSmsNotifications} />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="notification-email">Notification Email</Label>
              <Input id="notification-email" type="email" defaultValue="admin@simplytoken.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="notification-phone">Phone Number</Label>
              <Input id="notification-phone" type="tel" defaultValue="+1 (555) 123-4567" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Compliance Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Compliance Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="jurisdiction">Primary Jurisdiction</Label>
              <Select defaultValue="us">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="us">United States</SelectItem>
                  <SelectItem value="eu">European Union</SelectItem>
                  <SelectItem value="uk">United Kingdom</SelectItem>
                  <SelectItem value="ca">Canada</SelectItem>
                  <SelectItem value="au">Australia</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="sec-filing">SEC Filing Status</Label>
              <Select defaultValue="pending">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="filed">Filed</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="exempt">Exempt</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="transfer-agent">Transfer Agent</Label>
              <Input id="transfer-agent" defaultValue="Digital Transfer Solutions LLC" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="custodian">Custodian</Label>
              <Input id="custodian" defaultValue="Institutional Custody Services" />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="legal-disclaimer">Legal Disclaimer</Label>
            <Textarea 
              id="legal-disclaimer" 
              placeholder="Enter legal disclaimer text..."
              className="min-h-[80px]"
              defaultValue="This offering has not been registered under the Securities Act of 1933. These securities may not be offered or sold without registration or an applicable exemption."
            />
          </div>
        </CardContent>
      </Card>

      {/* Document Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Document Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Required Documents</Label>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-2 border rounded">
                  <span className="text-sm">Private Placement Memorandum</span>
                  <Badge variant="default">Required</Badge>
                </div>
                <div className="flex items-center justify-between p-2 border rounded">
                  <span className="text-sm">Subscription Agreement</span>
                  <Badge variant="default">Required</Badge>
                </div>
                <div className="flex items-center justify-between p-2 border rounded">
                  <span className="text-sm">Operating Agreement</span>
                  <Badge variant="secondary">Optional</Badge>
                </div>
                <div className="flex items-center justify-between p-2 border rounded">
                  <span className="text-sm">Financial Statements</span>
                  <Badge variant="default">Required</Badge>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="document-retention">Document Retention (years)</Label>
              <Input id="document-retention" type="number" defaultValue="7" />
              <p className="text-xs text-muted-foreground">
                How long to retain investor documents for compliance
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
