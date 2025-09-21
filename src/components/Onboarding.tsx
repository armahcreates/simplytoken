import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  CheckCircle, 
  Circle, 
  User, 
  Building2, 
  Settings, 
  Users
} from 'lucide-react';
import { AccountCreation } from './onboarding/AccountCreation';
import { RoleSelection } from './onboarding/RoleSelection';
import { ProjectSetup } from './onboarding/ProjectSetup';
import { ModuleConfiguration } from './onboarding/ModuleConfiguration';
import { TeamManagement } from './onboarding/TeamManagement';

const steps = [
  { id: 1, name: 'Account Creation', icon: User, completed: false },
  { id: 2, name: 'Role Selection', icon: User, completed: false },
  { id: 3, name: 'Project Setup', icon: Building2, completed: false },
  { id: 4, name: 'Module Configuration', icon: Settings, completed: false },
  { id: 5, name: 'Team Management', icon: Users, completed: false },
];

interface OnboardingData {
  accountInfo: {
    email: string;
    firstName: string;
    lastName: string;
    company: string;
  };
  role: {
    type: 'asset-owner' | 'project-developer' | 'community-manager' | 'service-provider';
    details: Record<string, any>;
  };
  project: {
    name: string;
    assetType: string;
    targetRaise: number;
    timeline: string;
    description: string;
    location: {
      country: string;
      city: string;
    };
  };
  modules: {
    assetReadiness: boolean;
    communityManagement: boolean;
    capitalFormation: boolean;
    governanceTools: boolean;
  };
  team: Array<{
    email: string;
    role: string;
    permissions: string[];
  }>;
}

export function Onboarding() {
  const [currentStep, setCurrentStep] = React.useState(1);
  const [completedSteps, setCompletedSteps] = React.useState<number[]>([]);
  const [onboardingData, setOnboardingData] = React.useState<OnboardingData>({
    accountInfo: { email: '', firstName: '', lastName: '', company: '' },
    role: { type: 'asset-owner', details: {} },
    project: { 
      name: '', 
      assetType: '', 
      targetRaise: 0, 
      timeline: '', 
      description: '', 
      location: { country: '', city: '' } 
    },
    modules: { 
      assetReadiness: true, 
      communityManagement: true, 
      capitalFormation: true, 
      governanceTools: false 
    },
    team: []
  });

  const updateOnboardingData = (stepData: Partial<OnboardingData>) => {
    setOnboardingData(prev => ({ ...prev, ...stepData }));
  };


  const handleNext = () => {
    if (currentStep < steps.length) {
      setCompletedSteps(prev => [...prev, currentStep]);
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleStepClick = (stepId: number) => {
    if (stepId <= currentStep || completedSteps.includes(stepId)) {
      setCurrentStep(stepId);
    }
  };

  const isStepCompleted = (stepId: number) => completedSteps.includes(stepId);
  const isStepCurrent = (stepId: number) => stepId === currentStep;
  const isStepAccessible = (stepId: number) => stepId <= currentStep || completedSteps.includes(stepId);

  const progressPercentage = (completedSteps.length / steps.length) * 100;

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <AccountCreation 
            data={onboardingData.accountInfo}
            onUpdate={(data) => updateOnboardingData({ accountInfo: data })}
            onNext={handleNext}
          />
        );
      case 2:
        return (
          <RoleSelection 
            data={onboardingData.role}
            onUpdate={(data) => updateOnboardingData({ role: data })}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        );
      case 3:
        return (
          <ProjectSetup 
            data={onboardingData.project}
            onUpdate={(data) => updateOnboardingData({ project: data })}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        );
      case 4:
        return (
          <ModuleConfiguration 
            data={onboardingData.modules}
            role={onboardingData.role.type}
            onUpdate={(data) => updateOnboardingData({ modules: data })}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        );
      case 5:
        return (
          <TeamManagement 
            data={onboardingData.team}
            onUpdate={(data: Array<{email: string; role: string; permissions: string[]}>) => updateOnboardingData({ team: data })}
            onPrevious={handlePrevious}
            onComplete={() => {
              setCompletedSteps(prev => [...prev, currentStep]);
              // Handle completion - redirect to dashboard
              window.location.href = '/';
            }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Welcome to Simply Token</h1>
          <p className="text-base sm:text-lg text-gray-600">Let's get your tokenization project set up</p>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Setup Progress</CardTitle>
                <Progress value={progressPercentage} className="mt-2" />
              </CardHeader>
              <CardContent className="space-y-4">
                {steps.map((step) => {
                  const StepIcon = step.icon;
                  return (
                    <div
                      key={step.id}
                      className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                        isStepCurrent(step.id) 
                          ? 'bg-blue-50 border border-blue-200' 
                          : isStepCompleted(step.id)
                          ? 'bg-green-50 border border-green-200'
                          : isStepAccessible(step.id)
                          ? 'hover:bg-gray-50'
                          : 'opacity-50 cursor-not-allowed'
                      }`}
                      onClick={() => handleStepClick(step.id)}
                    >
                      <div className="flex-shrink-0">
                        {isStepCompleted(step.id) ? (
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        ) : isStepCurrent(step.id) ? (
                          <Circle className="h-5 w-5 text-blue-600 fill-current" />
                        ) : (
                          <Circle className="h-5 w-5 text-gray-400" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">{step.id}</span>
                          <StepIcon className="h-4 w-4" />
                        </div>
                        <p className="text-sm text-muted-foreground">{step.name}</p>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            {/* Platform Modules */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-sm">Platform Modules</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Asset Readiness</span>
                  <Badge variant="default" className="text-xs">Enabled</Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Community Management</span>
                  <Badge variant="default" className="text-xs">Enabled</Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Capital Formation</span>
                  <Badge variant="default" className="text-xs">Enabled</Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {renderStepContent()}
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}
