import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  ArrowLeft, 
  ArrowRight, 
  DollarSign, 
  Calendar, 
  MapPin, 
  Building,
  Info,
  Upload,
  Image as ImageIcon
} from 'lucide-react';

interface ProjectSetupProps {
  data: {
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
  onUpdate: (data: {
    name: string;
    assetType: string;
    targetRaise: number;
    timeline: string;
    description: string;
    location: {
      country: string;
      city: string;
    };
  }) => void;
  onNext: () => void;
  onPrevious: () => void;
}

export function ProjectSetup({ data, onUpdate, onNext, onPrevious }: ProjectSetupProps) {
  const [formData, setFormData] = React.useState(data);
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  const handleInputChange = (field: string, value: string | number) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...(prev[parent as keyof typeof prev] as object),
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
    
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name) {
      newErrors.name = 'Project name is required';
    }

    if (!formData.assetType) {
      newErrors.assetType = 'Asset type is required';
    }

    if (!formData.targetRaise || formData.targetRaise <= 0) {
      newErrors.targetRaise = 'Target raise amount is required';
    }

    if (!formData.timeline) {
      newErrors.timeline = 'Project timeline is required';
    }

    if (!formData.description) {
      newErrors.description = 'Project description is required';
    }

    if (!formData.location.country) {
      newErrors['location.country'] = 'Country is required';
    }

    if (!formData.location.city) {
      newErrors['location.city'] = 'City is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onUpdate(formData);
      onNext();
    }
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
          <h1 className="text-3xl font-bold tracking-tight">Create Your Project</h1>
          <p className="text-muted-foreground mt-2">Set up your first tokenization project</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-muted-foreground">Step 3 of 5</p>
          <div className="w-32 bg-gray-200 rounded-full h-2 mt-1">
            <div className="bg-blue-600 h-2 rounded-full" style={{ width: '60%' }}></div>
          </div>
        </div>
      </div>

      <Alert className="bg-blue-50 border-blue-200 text-blue-800">
        <Info className="h-4 w-4" />
        <AlertDescription>
          Creating a well-defined project is crucial for successful tokenization. Here are some tips:
          Be specific about your asset type and compliance needs, provide a clear description of your tokenization goals, and upload a high-quality image to increase engagement.
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Project Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="projectName">Project Name *</Label>
                <Input
                  id="projectName"
                  placeholder="Enter project name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className={errors.name ? 'border-red-500' : ''}
                />
                {errors.name && (
                  <p className="text-sm text-red-600">{errors.name}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="assetType">Asset Type *</Label>
                  <Select onValueChange={(value) => handleInputChange('assetType', value)}>
                    <SelectTrigger className={errors.assetType ? 'border-red-500' : ''}>
                      <SelectValue placeholder="Select asset type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="real-estate">Real Estate</SelectItem>
                      <SelectItem value="private-equity">Private Equity Fund</SelectItem>
                      <SelectItem value="commodities">Commodities</SelectItem>
                      <SelectItem value="art-collectibles">Art & Collectibles</SelectItem>
                      <SelectItem value="infrastructure">Infrastructure</SelectItem>
                      <SelectItem value="renewable-energy">Renewable Energy</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.assetType && (
                    <p className="text-sm text-red-600">{errors.assetType}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="timeline">Project Timeline *</Label>
                  <Select onValueChange={(value) => handleInputChange('timeline', value)}>
                    <SelectTrigger className={errors.timeline ? 'border-red-500' : ''}>
                      <SelectValue placeholder="Select timeline" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="3-months">3 months</SelectItem>
                      <SelectItem value="6-months">6 months</SelectItem>
                      <SelectItem value="12-months">12 months</SelectItem>
                      <SelectItem value="18-months">18 months</SelectItem>
                      <SelectItem value="24-months">24 months</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.timeline && (
                    <p className="text-sm text-red-600">{errors.timeline}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="targetRaise">Target Raise (USD) *</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="targetRaise"
                    type="number"
                    placeholder="1,000,000"
                    value={formData.targetRaise || ''}
                    onChange={(e) => handleInputChange('targetRaise', Number(e.target.value))}
                    className={`pl-10 ${errors.targetRaise ? 'border-red-500' : ''}`}
                  />
                </div>
                {formData.targetRaise > 0 && (
                  <p className="text-sm text-muted-foreground">
                    Target: {formatCurrency(formData.targetRaise)}
                  </p>
                )}
                {errors.targetRaise && (
                  <p className="text-sm text-red-600">{errors.targetRaise}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Project Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your project and its tokenization goals"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  className={`min-h-[120px] ${errors.description ? 'border-red-500' : ''}`}
                />
                {errors.description && (
                  <p className="text-sm text-red-600">{errors.description}</p>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Project Location</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="country">Country *</Label>
                  <Select onValueChange={(value) => handleInputChange('location.country', value)}>
                    <SelectTrigger className={errors['location.country'] ? 'border-red-500' : ''}>
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="us">United States</SelectItem>
                      <SelectItem value="uk">United Kingdom</SelectItem>
                      <SelectItem value="ca">Canada</SelectItem>
                      <SelectItem value="au">Australia</SelectItem>
                      <SelectItem value="de">Germany</SelectItem>
                      <SelectItem value="fr">France</SelectItem>
                      <SelectItem value="sg">Singapore</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors['location.country'] && (
                    <p className="text-sm text-red-600">{errors['location.country']}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="city">City *</Label>
                  <Input
                    id="city"
                    placeholder="Enter city"
                    value={formData.location.city}
                    onChange={(e) => handleInputChange('location.city', e.target.value)}
                    className={errors['location.city'] ? 'border-red-500' : ''}
                  />
                  {errors['location.city'] && (
                    <p className="text-sm text-red-600">{errors['location.city']}</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Project Image</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <ImageIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <p className="text-sm text-muted-foreground mb-4">
                  Upload a high-quality image that represents your project. This will be displayed on your project profile and marketing materials.
                </p>
                <Button variant="outline">
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Image
                </Button>
                <p className="text-xs text-muted-foreground mt-2">
                  Recommended: 1200x600px, JPG or PNG, max 5MB
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-between">
            <Button variant="outline" onClick={onPrevious}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Previous
            </Button>
            <Button onClick={handleSubmit}>
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
                Project Setup Tips
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-medium text-sm flex items-center gap-2">
                  <Building className="h-4 w-4" />
                  Be specific about your asset type and compliance needs
                </h4>
                <p className="text-sm text-muted-foreground">
                  Different asset types have different regulatory requirements. Choose the most specific category that applies to your project.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium text-sm flex items-center gap-2">
                  <DollarSign className="h-4 w-4" />
                  Provide a clear description of your tokenization goals
                </h4>
                <p className="text-sm text-muted-foreground">
                  Explain what you're tokenizing, why, and what benefits it will provide to token holders.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium text-sm flex items-center gap-2">
                  <ImageIcon className="h-4 w-4" />
                  Upload a high-quality image to increase engagement
                </h4>
                <p className="text-sm text-muted-foreground">
                  Professional images help build trust and make your project more appealing to potential investors.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Project Setup Progress</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span>Basic Information</span>
                <span className={formData.name && formData.assetType ? 'text-green-600' : 'text-gray-400'}>
                  {formData.name && formData.assetType ? '✓' : '○'}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>Financial Details</span>
                <span className={formData.targetRaise > 0 ? 'text-green-600' : 'text-gray-400'}>
                  {formData.targetRaise > 0 ? '✓' : '○'}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>Project Description</span>
                <span className={formData.description ? 'text-green-600' : 'text-gray-400'}>
                  {formData.description ? '✓' : '○'}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>Location</span>
                <span className={formData.location.country && formData.location.city ? 'text-green-600' : 'text-gray-400'}>
                  {formData.location.country && formData.location.city ? '✓' : '○'}
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Need Help?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                📚 Documentation
              </Button>
              <Button variant="outline" className="w-full justify-start">
                💬 Live Chat
              </Button>
              <p className="text-xs text-muted-foreground">
                Contact support at support@simplytoken.com
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
