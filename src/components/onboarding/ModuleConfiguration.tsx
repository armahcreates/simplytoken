import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  ArrowLeft, 
  ArrowRight, 
  Building2, 
  Users, 
  TrendingUp, 
  Shield,
  Info,
  CheckCircle,
  Settings
} from 'lucide-react';

interface ModuleConfigurationProps {
  data: {
    assetReadiness: boolean;
    communityManagement: boolean;
    capitalFormation: boolean;
    governanceTools: boolean;
  };
  role: 'asset-owner' | 'project-developer' | 'community-manager' | 'service-provider';
  onUpdate: (data: any) => void;
  onNext: () => void;
  onPrevious: () => void;
}

const modules = [
  {
    id: 'assetReadiness',
    name: 'Asset Readiness',
    description: 'Prepare your assets for tokenization with legal and compliance tools',
    icon: Building2,
    features: [
      'Compliance Documentation',
      'Legal Framework Templates',
      'Audit Trail & Reporting'
    ],
    settings: {
      assetType: ['Real Estate', 'Private Equity', 'Commodities', 'Art & Collectibles'],
      jurisdiction: ['United States', 'European Union', 'United Kingdom', 'Singapore'],
      complianceLevel: ['Basic', 'Standard', 'Advanced']
    }
  },
  {
    id: 'communityManagement',
    name: 'Community Management',
    description: 'Engage with stakeholders and manage your community',
    icon: Users,
    features: [
      'Messaging & Updates',
      'Discussion Forums',
      'Event Management'
    ],
    settings: {
      communitySize: ['Small (< 100 members)', 'Medium (100-1000 members)', 'Large (1000-10000 members)', 'Enterprise (10000+ members)'],
      accessControl: ['Public', 'Private', 'Invite Only'],
      features: ['Messaging', 'Forums', 'Events', 'Governance']
    }
  },
  {
    id: 'capitalFormation',
    name: 'Capital Formation',
    description: 'Manage investors and capital raising activities',
    icon: TrendingUp,
    features: [
      'Investor Management',
      'Capital Raising Tools',
      'Financial Reporting'
    ],
    settings: {
      investorType: ['Accredited Only', 'Retail Investors', 'Institutional', 'Mixed'],
      raisingMethod: ['Private Placement', 'Public Offering', 'Crowdfunding'],
      reportingFrequency: ['Monthly', 'Quarterly', 'Semi-Annual', 'Annual']
    }
  },
  {
    id: 'governanceTools',
    name: 'Governance Tools',
    description: 'Facilitate compliant investor governance',
    icon: Shield,
    features: [
      'Voting & Proposals',
      'Governance Analytics',
      'Compliance Tracking'
    ],
    settings: {
      votingType: ['Simple Majority', 'Supermajority', 'Weighted Voting'],
      proposalThreshold: ['1%', '5%', '10%', '15%'],
      votingPeriod: ['7 days', '14 days', '30 days']
    }
  }
];

const roleRecommendations = {
  'asset-owner': ['assetReadiness', 'communityManagement', 'capitalFormation'],
  'project-developer': ['assetReadiness', 'capitalFormation', 'governanceTools'],
  'community-manager': ['communityManagement', 'governanceTools'],
  'service-provider': ['assetReadiness', 'communityManagement']
};

export function ModuleConfiguration({ data, role, onUpdate, onNext, onPrevious }: ModuleConfigurationProps) {
  const [moduleConfig, setModuleConfig] = React.useState(data);
  const [moduleSettings, setModuleSettings] = React.useState<Record<string, Record<string, string>>>({});

  const handleModuleToggle = (moduleId: string, enabled: boolean) => {
    setModuleConfig(prev => ({ ...prev, [moduleId]: enabled }));
  };

  const handleSettingChange = (moduleId: string, setting: string, value: string) => {
    setModuleSettings(prev => ({
      ...prev,
      [moduleId]: {
        ...prev[moduleId],
        [setting]: value
      }
    }));
  };

  const handleSubmit = () => {
    onUpdate({ ...moduleConfig, settings: moduleSettings });
    onNext();
  };

  const recommendedModules = roleRecommendations[role] || [];
  const enabledModulesCount = Object.values(moduleConfig).filter(Boolean).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Module Configuration</h1>
          <p className="text-muted-foreground mt-2">Select and configure the modules you need for your project</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-muted-foreground">Step 4 of 5</p>
          <div className="w-32 bg-gray-200 rounded-full h-2 mt-1">
            <div className="bg-blue-600 h-2 rounded-full" style={{ width: '80%' }}></div>
          </div>
        </div>
      </div>

      <Alert className="bg-blue-50 border-blue-200 text-blue-800">
        <Info className="h-4 w-4" />
        <AlertDescription>
          Select the modules that best fit your project needs. Each module can be configured independently and integrated with others. You can enable or disable modules at any time. Based on your role, we've pre-selected recommended modules.
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {modules.map((module) => {
            const ModuleIcon = module.icon;
            const isEnabled = moduleConfig[module.id as keyof typeof moduleConfig];
            const isRecommended = recommendedModules.includes(module.id);
            
            return (
              <Card key={module.id} className={`transition-all ${isEnabled ? 'ring-2 ring-blue-500 bg-blue-50' : ''}`}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-lg ${isEnabled ? 'bg-blue-100' : 'bg-gray-100'}`}>
                        <ModuleIcon className={`h-6 w-6 ${isEnabled ? 'text-blue-600' : 'text-gray-600'}`} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <CardTitle className="text-lg">{module.name}</CardTitle>
                          {isRecommended && (
                            <Badge variant="secondary" className="text-xs">Recommended</Badge>
                          )}
                          {isEnabled && <CheckCircle className="h-4 w-4 text-blue-600" />}
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{module.description}</p>
                      </div>
                    </div>
                    <Switch
                      checked={isEnabled}
                      onCheckedChange={(checked) => handleModuleToggle(module.id, checked)}
                    />
                  </div>
                </CardHeader>
                
                {isEnabled && (
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-medium text-sm mb-2">Key Features:</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                        {module.features.map((feature, index) => (
                          <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                            <CheckCircle className="h-3 w-3 text-green-600" />
                            {feature}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="border-t pt-4">
                      <h4 className="font-medium text-sm mb-3">Module Settings:</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {Object.entries(module.settings).map(([settingKey, options]) => (
                          <div key={settingKey} className="space-y-2">
                            <Label className="text-xs capitalize">
                              {settingKey.replace(/([A-Z])/g, ' $1').toLowerCase()}
                            </Label>
                            <Select onValueChange={(value) => handleSettingChange(module.id, settingKey, value)}>
                              <SelectTrigger className="h-8 text-sm">
                                <SelectValue placeholder={`Select ${settingKey.replace(/([A-Z])/g, ' $1').toLowerCase()}`} />
                              </SelectTrigger>
                              <SelectContent>
                                {options.map((option) => (
                                  <SelectItem key={option} value={option.toLowerCase().replace(/\s+/g, '-')}>
                                    {option}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                )}
              </Card>
            );
          })}

          {/* Navigation */}
          <div className="flex justify-between">
            <Button variant="outline" onClick={onPrevious}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Previous
            </Button>
            <Button onClick={handleSubmit} disabled={enabledModulesCount === 0}>
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
                Module Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Select the modules that best fit your project needs. Each module can be configured independently and integrated with others.
              </p>
              
              <div className="space-y-2">
                <h4 className="font-medium text-sm">You can enable or disable modules at any time</h4>
                <p className="text-sm text-muted-foreground">
                  Module configuration can be changed later in your project settings.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium text-sm">Each module has its own set of configurable features</h4>
                <p className="text-sm text-muted-foreground">
                  Customize permissions for specific access needs and review pending invitations regularly.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium text-sm">Based on your role, we've pre-selected recommended modules</h4>
                <p className="text-sm text-muted-foreground">
                  These recommendations are based on common use cases for your role type.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                Recommended for You
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">
                Based on your role as an {role.replace('-', ' ')}, we recommend these modules:
              </p>
              <div className="space-y-2">
                {recommendedModules.map((moduleId) => {
                  const module = modules.find(m => m.id === moduleId);
                  return module ? (
                    <div key={moduleId} className="flex items-center justify-between">
                      <Badge variant="default" className="flex-1 justify-start">
                        {module.name}
                      </Badge>
                      {moduleConfig[moduleId as keyof typeof moduleConfig] && (
                        <CheckCircle className="h-4 w-4 text-green-600 ml-2" />
                      )}
                    </div>
                  ) : null;
                })}
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Configuration Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span>Enabled Modules</span>
                <Badge variant="outline">{enabledModulesCount}</Badge>
              </div>
              <div className="space-y-2">
                {Object.entries(moduleConfig).map(([moduleId, enabled]) => {
                  const module = modules.find(m => m.id === moduleId);
                  return module ? (
                    <div key={moduleId} className="flex items-center justify-between text-sm">
                      <span>{module.name}</span>
                      <span className={enabled ? 'text-green-600' : 'text-gray-400'}>
                        {enabled ? '✓' : '○'}
                      </span>
                    </div>
                  ) : null;
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
