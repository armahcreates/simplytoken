import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  Building, 
  Code, 
  Users, 
  Briefcase, 
  ArrowLeft, 
  ArrowRight,
  CheckCircle,
  Info
} from 'lucide-react';

interface RoleSelectionProps {
  data: {
    type: 'asset-owner' | 'project-developer' | 'community-manager' | 'service-provider';
    details: Record<string, any>;
  };
  onUpdate: (data: any) => void;
  onNext: () => void;
  onPrevious: () => void;
}

const roles = [
  {
    id: 'asset-owner',
    name: 'Asset Owner',
    description: 'You own or represent an organization with assets to tokenize',
    icon: Building,
    recommended: 'Recommended for property owners and fund managers',
    features: ['Asset preparation', 'Investor management', 'Compliance tools']
  },
  {
    id: 'project-developer',
    name: 'Project Developer',
    description: 'You manage tokenization projects and implementation',
    icon: Code,
    recommended: 'Ideal for technical teams and consultants',
    features: ['Project workflows', 'Technical tools', 'Implementation guides']
  },
  {
    id: 'community-manager',
    name: 'Community Manager',
    description: 'You oversee community engagement and governance',
    icon: Users,
    recommended: 'Perfect for engagement specialists',
    features: ['Community tools', 'Governance features', 'Communication platforms']
  },
  {
    id: 'service-provider',
    name: 'Service Provider',
    description: 'You offer professional services to tokenization projects',
    icon: Briefcase,
    recommended: 'For legal, compliance and advisory firms',
    features: ['Client management', 'Service delivery', 'Compliance tracking']
  }
];

export function RoleSelection({ data, onUpdate, onNext, onPrevious }: RoleSelectionProps) {
  const [selectedRole, setSelectedRole] = React.useState(data.type);
  const [roleDetails, setRoleDetails] = React.useState(data.details);
  const [showDetails, setShowDetails] = React.useState(false);

  const handleRoleSelect = (roleId: string) => {
    setSelectedRole(roleId as any);
    setShowDetails(true);
    setRoleDetails({});
  };

  const handleDetailsChange = (field: string, value: string) => {
    setRoleDetails(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    onUpdate({ type: selectedRole, details: roleDetails });
    onNext();
  };

  const selectedRoleData = roles.find(role => role.id === selectedRole);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Choose Your Role</h1>
          <p className="text-muted-foreground mt-2">Select the role that best describes your position</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-muted-foreground">Step 2 of 5</p>
          <div className="w-32 bg-gray-200 rounded-full h-2 mt-1">
            <div className="bg-blue-600 h-2 rounded-full" style={{ width: '40%' }}></div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Role Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {roles.map((role) => {
              const RoleIcon = role.icon;
              const isSelected = selectedRole === role.id;
              
              return (
                <Card 
                  key={role.id}
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    isSelected ? 'ring-2 ring-blue-500 bg-blue-50' : ''
                  }`}
                  onClick={() => handleRoleSelect(role.id)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-lg ${
                        isSelected ? 'bg-blue-100' : 'bg-gray-100'
                      }`}>
                        <RoleIcon className={`h-6 w-6 ${
                          isSelected ? 'text-blue-600' : 'text-gray-600'
                        }`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold">{role.name}</h3>
                          {isSelected && <CheckCircle className="h-4 w-4 text-blue-600" />}
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">
                          {role.description}
                        </p>
                        <Badge variant="secondary" className="text-xs mb-3">
                          {role.recommended}
                        </Badge>
                        <ul className="space-y-1">
                          {role.features.map((feature, index) => (
                            <li key={index} className="text-xs text-muted-foreground flex items-center gap-1">
                              <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Role Details Form */}
          {showDetails && selectedRoleData && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <selectedRoleData.icon className="h-5 w-5" />
                  {selectedRoleData.name} Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {selectedRole === 'asset-owner' && (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="assetType">Asset Type</Label>
                        <Select onValueChange={(value) => handleDetailsChange('assetType', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select asset type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="real-estate">Real Estate</SelectItem>
                            <SelectItem value="private-equity">Private Equity</SelectItem>
                            <SelectItem value="commodities">Commodities</SelectItem>
                            <SelectItem value="art-collectibles">Art & Collectibles</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="assetValue">Asset Value Range</Label>
                        <Select onValueChange={(value) => handleDetailsChange('assetValue', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select value range" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="under-1m">Under $1M</SelectItem>
                            <SelectItem value="1m-10m">$1M - $10M</SelectItem>
                            <SelectItem value="10m-100m">$10M - $100M</SelectItem>
                            <SelectItem value="over-100m">Over $100M</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="timeline">Tokenization Timeline</Label>
                        <Select onValueChange={(value) => handleDetailsChange('timeline', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select timeline" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="immediate">Immediate (1-3 months)</SelectItem>
                            <SelectItem value="short-term">Short-term (3-6 months)</SelectItem>
                            <SelectItem value="medium-term">Medium-term (6-12 months)</SelectItem>
                            <SelectItem value="long-term">Long-term (12+ months)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="jurisdiction">Regulatory Jurisdiction</Label>
                        <Select onValueChange={(value) => handleDetailsChange('jurisdiction', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select jurisdiction" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="us">United States</SelectItem>
                            <SelectItem value="eu">European Union</SelectItem>
                            <SelectItem value="uk">United Kingdom</SelectItem>
                            <SelectItem value="singapore">Singapore</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </>
                )}

                {selectedRole === 'project-developer' && (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="experience">Experience Level</Label>
                        <Select onValueChange={(value) => handleDetailsChange('experience', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select experience level" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="beginner">Beginner (0-1 years)</SelectItem>
                            <SelectItem value="intermediate">Intermediate (1-3 years)</SelectItem>
                            <SelectItem value="advanced">Advanced (3-5 years)</SelectItem>
                            <SelectItem value="expert">Expert (5+ years)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="focus">Primary Focus</Label>
                        <Select onValueChange={(value) => handleDetailsChange('focus', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select focus area" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="technical">Technical Implementation</SelectItem>
                            <SelectItem value="compliance">Compliance & Legal</SelectItem>
                            <SelectItem value="business">Business Development</SelectItem>
                            <SelectItem value="consulting">Consulting Services</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </>
                )}

                {selectedRole === 'community-manager' && (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="communitySize">Expected Community Size</Label>
                        <Select onValueChange={(value) => handleDetailsChange('communitySize', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select community size" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="small">Small (&lt; 100 members)</SelectItem>
                            <SelectItem value="medium">Medium (100-1000 members)</SelectItem>
                            <SelectItem value="large">Large (1000-10000 members)</SelectItem>
                            <SelectItem value="enterprise">Enterprise (10000+ members)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="engagement">Engagement Focus</Label>
                        <Select onValueChange={(value) => handleDetailsChange('engagement', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select engagement type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="governance">Governance & Voting</SelectItem>
                            <SelectItem value="education">Education & Onboarding</SelectItem>
                            <SelectItem value="support">Support & Help</SelectItem>
                            <SelectItem value="marketing">Marketing & Growth</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </>
                )}

                {selectedRole === 'service-provider' && (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="serviceType">Service Type</Label>
                        <Select onValueChange={(value) => handleDetailsChange('serviceType', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select service type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="legal">Legal Services</SelectItem>
                            <SelectItem value="compliance">Compliance & Regulatory</SelectItem>
                            <SelectItem value="financial">Financial Advisory</SelectItem>
                            <SelectItem value="technical">Technical Consulting</SelectItem>
                            <SelectItem value="marketing">Marketing & PR</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="clientSize">Typical Client Size</Label>
                        <Select onValueChange={(value) => handleDetailsChange('clientSize', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select client size" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="startup">Startup/SME</SelectItem>
                            <SelectItem value="mid-market">Mid-market</SelectItem>
                            <SelectItem value="enterprise">Enterprise</SelectItem>
                            <SelectItem value="institutional">Institutional</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </>
                )}

                <div className="space-y-2">
                  <Label htmlFor="goals">Tokenization Goals</Label>
                  <Textarea
                    id="goals"
                    placeholder="Describe your tokenization objectives and expected outcomes..."
                    value={roleDetails.goals || ''}
                    onChange={(e) => handleDetailsChange('goals', e.target.value)}
                    className="min-h-[100px]"
                  />
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
            <Button onClick={handleSubmit} disabled={!selectedRole}>
              Continue
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="h-4 w-4" />
                Role Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Your role determines which platform features are highlighted and how your dashboard is configured. You can always change this later in settings.
              </p>
              
              <div className="space-y-3">
                <div>
                  <h4 className="font-medium text-sm">Asset Owners get tools for:</h4>
                  <ul className="text-sm text-muted-foreground mt-1 space-y-1">
                    <li>• Asset preparation and investor management</li>
                    <li>• Compliance and regulatory tools</li>
                    <li>• Capital formation workflows</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium text-sm">Project Developers access:</h4>
                  <ul className="text-sm text-muted-foreground mt-1 space-y-1">
                    <li>• Implementation workflows and technical tools</li>
                    <li>• Project management features</li>
                    <li>• Integration capabilities</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium text-sm">Community Managers focus on:</h4>
                  <ul className="text-sm text-muted-foreground mt-1 space-y-1">
                    <li>• Engagement and governance features</li>
                    <li>• Communication platforms</li>
                    <li>• Community analytics</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {selectedRoleData && (
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-lg">Recommended for You</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  Based on your role as an {selectedRoleData.name}, we recommend these modules:
                </p>
                <div className="space-y-2">
                  <Badge variant="default" className="w-full justify-start">
                    Asset Readiness
                  </Badge>
                  <Badge variant="default" className="w-full justify-start">
                    Community Management
                  </Badge>
                  <Badge variant="default" className="w-full justify-start">
                    Capital Formation
                  </Badge>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
