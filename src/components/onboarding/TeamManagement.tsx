import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  ArrowLeft, 
  Mail, 
  Trash2, 
  Users, 
  Shield, 
  Info,
  UserPlus,
  Check
} from 'lucide-react';

interface TeamManagementProps {
  data: Array<{
    email: string;
    role: string;
    permissions: string[];
  }>;
  onUpdate: (data: Array<{email: string; role: string; permissions: string[]}>) => void;
  onPrevious: () => void;
  onComplete: () => void;
}

const roles = [
  { id: 'admin', name: 'Administrator', description: 'Full access to all features' },
  { id: 'manager', name: 'Project Manager', description: 'Manage project settings and team' },
  { id: 'analyst', name: 'Financial Analyst', description: 'Access to financial data and reports' },
  { id: 'compliance', name: 'Compliance Officer', description: 'Manage regulatory and legal aspects' },
  { id: 'viewer', name: 'Viewer', description: 'Read-only access to project data' }
];

const modulePermissions = [
  { id: 'asset-readiness', name: 'Asset Readiness', description: 'Access to asset preparation tools' },
  { id: 'community-management', name: 'Community Management', description: 'Manage community and stakeholders' },
  { id: 'capital-formation', name: 'Capital Formation', description: 'Access to fundraising tools' },
  { id: 'governance-tools', name: 'Governance Tools', description: 'Voting and governance features' }
];

const administrativeRights = [
  { id: 'invite-members', name: 'Invite Team Members', description: 'Add new team members' },
  { id: 'manage-permissions', name: 'Manage Permissions', description: 'Edit user roles and access' },
  { id: 'billing-access', name: 'Billing Access', description: 'View and manage billing' },
  { id: 'project-creation', name: 'Project Creation', description: 'Create new projects' }
];

export function TeamManagement({ data, onUpdate, onPrevious, onComplete }: TeamManagementProps) {
  const [teamMembers, setTeamMembers] = React.useState(data);
  const [showInviteForm, setShowInviteForm] = React.useState(false);
  const [inviteForm, setInviteForm] = React.useState({
    email: '',
    role: '',
    permissions: [] as string[],
    adminRights: [] as string[],
    message: ''
  });

  const handleInviteFormChange = (field: string, value: string | string[]) => {
    setInviteForm(prev => ({ ...prev, [field]: value }));
  };

  const handlePermissionToggle = (permission: string, checked: boolean) => {
    setInviteForm(prev => ({
      ...prev,
      permissions: checked 
        ? [...prev.permissions, permission]
        : prev.permissions.filter(p => p !== permission)
    }));
  };

  const handleAdminRightToggle = (right: string, checked: boolean) => {
    setInviteForm(prev => ({
      ...prev,
      adminRights: checked 
        ? [...prev.adminRights, right]
        : prev.adminRights.filter(r => r !== right)
    }));
  };

  const handleSendInvite = () => {
    if (inviteForm.email && inviteForm.role) {
      const newMember = {
        email: inviteForm.email,
        role: inviteForm.role,
        permissions: [...inviteForm.permissions, ...inviteForm.adminRights]
      };
      
      setTeamMembers(prev => [...prev, newMember]);
      setInviteForm({
        email: '',
        role: '',
        permissions: [],
        adminRights: [],
        message: ''
      });
      setShowInviteForm(false);
    }
  };

  const handleRemoveMember = (index: number) => {
    setTeamMembers(prev => prev.filter((_, i) => i !== index));
  };

  const handleComplete = () => {
    onUpdate(teamMembers);
    onComplete();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Team Management</h1>
          <p className="text-muted-foreground mt-2">Invite team members and set their permissions</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-muted-foreground">Step 5 of 5</p>
          <div className="w-32 bg-gray-200 rounded-full h-2 mt-1">
            <div className="bg-blue-600 h-2 rounded-full" style={{ width: '100%' }}></div>
          </div>
        </div>
      </div>

      <Alert className="bg-green-50 border-green-200 text-green-800">
        <Check className="h-4 w-4" />
        <AlertDescription>
          You're almost done! Invite team members to collaborate on your tokenization project. Each role has predefined permissions that you can customize.
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Current Team Members */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Current Team Members</CardTitle>
              <Button onClick={() => setShowInviteForm(true)}>
                <UserPlus className="mr-2 h-4 w-4" />
                Invite Team Member
              </Button>
            </CardHeader>
            <CardContent>
              {teamMembers.length > 0 ? (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="w-[50px]"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback>SJ</AvatarFallback>
                            </Avatar>
                            <span className="font-medium">Sarah Johnson</span>
                          </div>
                        </TableCell>
                        <TableCell>sarah.johnson@example.com</TableCell>
                        <TableCell>
                          <Badge variant="default">Asset Owner</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="default">Active</Badge>
                        </TableCell>
                        <TableCell></TableCell>
                      </TableRow>
                      {teamMembers.map((member, index) => (
                        <TableRow key={index}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar className="h-8 w-8">
                                <AvatarFallback>
                                  {member.email.substring(0, 2).toUpperCase()}
                                </AvatarFallback>
                              </Avatar>
                              <span className="font-medium">{member.email.split('@')[0]}</span>
                            </div>
                          </TableCell>
                          <TableCell>{member.email}</TableCell>
                          <TableCell>
                            <Badge variant="secondary">
                              {roles.find(r => r.id === member.role)?.name || member.role}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">Pending</Badge>
                          </TableCell>
                          <TableCell>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleRemoveMember(index)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <div className="text-center py-8">
                  <Users className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <p className="text-muted-foreground mb-4">No team members invited yet</p>
                  <Button onClick={() => setShowInviteForm(true)}>
                    <UserPlus className="mr-2 h-4 w-4" />
                    Invite Your First Team Member
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Invite Team Member Form */}
          {showInviteForm && (
            <Card>
              <CardHeader>
                <CardTitle>Invite Team Member</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter email address"
                      value={inviteForm.email}
                      onChange={(e) => handleInviteFormChange('email', e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="role">Role</Label>
                    <Select onValueChange={(value) => handleInviteFormChange('role', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        {roles.map((role) => (
                          <SelectItem key={role.id} value={role.id}>
                            {role.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="permission-level">Permission Level</Label>
                    <Select onValueChange={(value) => handleInviteFormChange('permissionLevel', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select permission level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="full">Full Access</SelectItem>
                        <SelectItem value="limited">Limited Access</SelectItem>
                        <SelectItem value="read-only">Read Only</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-4">
                  <Label>Module Access</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {modulePermissions.map((permission) => (
                      <div key={permission.id} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id={permission.id}
                          checked={inviteForm.permissions.includes(permission.id)}
                          onChange={(e) => handlePermissionToggle(permission.id, e.target.checked)}
                          className="rounded border-gray-300"
                        />
                        <div className="flex-1">
                          <Label htmlFor={permission.id} className="text-sm font-medium">
                            {permission.name}
                          </Label>
                          <p className="text-xs text-muted-foreground">{permission.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <Label>Administrative Rights</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {administrativeRights.map((right) => (
                      <div key={right.id} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id={right.id}
                          checked={inviteForm.adminRights.includes(right.id)}
                          onChange={(e) => handleAdminRightToggle(right.id, e.target.checked)}
                          className="rounded border-gray-300"
                        />
                        <div className="flex-1">
                          <Label htmlFor={right.id} className="text-sm font-medium">
                            {right.name}
                          </Label>
                          <p className="text-xs text-muted-foreground">{right.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Personalized Message (Optional)</Label>
                  <Textarea
                    id="message"
                    placeholder="Add a personal note to your invitation"
                    value={inviteForm.message}
                    onChange={(e) => handleInviteFormChange('message', e.target.value)}
                    className="min-h-[80px]"
                  />
                </div>

                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setShowInviteForm(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleSendInvite}>
                    Send Invitation
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Navigation */}
          <div className="flex justify-between">
            <Button variant="outline" onClick={onPrevious}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Previous
            </Button>
            <Button onClick={handleComplete} size="lg" className="px-8">
              Complete Setup
            </Button>
          </div>
        </div>

        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="h-4 w-4" />
                Team Management Tips
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-medium text-sm">Invite team members to collaborate on your tokenization project</h4>
                <p className="text-sm text-muted-foreground">
                  Each role has predefined permissions that you can customize.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium text-sm">Assign appropriate roles based on responsibilities</h4>
                <p className="text-sm text-muted-foreground">
                  Different roles have access to different features and data.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium text-sm">Customize permissions for specific access needs</h4>
                <p className="text-sm text-muted-foreground">
                  Fine-tune what each team member can see and do.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium text-sm">Review pending invitations regularly</h4>
                <p className="text-sm text-muted-foreground">
                  Follow up with team members who haven't accepted invitations.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Security Note
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Team members with administrative access can invite other users and modify platform settings. Review permissions carefully before granting access.
              </p>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Default Permissions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">
                These are the default permissions for common roles:
              </p>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="font-medium">Administrator:</span>
                  <span className="text-muted-foreground ml-1">Full access to all features</span>
                </div>
                <div>
                  <span className="font-medium">Project Manager:</span>
                  <span className="text-muted-foreground ml-1">Project and team management</span>
                </div>
                <div>
                  <span className="font-medium">Analyst:</span>
                  <span className="text-muted-foreground ml-1">Financial data and reporting</span>
                </div>
                <div>
                  <span className="font-medium">Compliance:</span>
                  <span className="text-muted-foreground ml-1">Regulatory and legal tools</span>
                </div>
                <div>
                  <span className="font-medium">Viewer:</span>
                  <span className="text-muted-foreground ml-1">Read-only access</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
