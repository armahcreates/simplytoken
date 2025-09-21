import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle, Mail, User, Building } from 'lucide-react';

interface AccountCreationProps {
  data: {
    email: string;
    firstName: string;
    lastName: string;
    company: string;
  };
  onUpdate: (data: any) => void;
  onNext: () => void;
}

export function AccountCreation({ data, onUpdate, onNext }: AccountCreationProps) {
  const [formData, setFormData] = React.useState(data);
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.firstName) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData.lastName) {
      newErrors.lastName = 'Last name is required';
    }

    if (!formData.company) {
      newErrors.company = 'Company name is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onUpdate(formData);
      onNext();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Create Your Account</h1>
          <p className="text-muted-foreground mt-2">Set up your first tokenization project</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-muted-foreground">Step 1 of 5</p>
          <div className="w-32 bg-gray-200 rounded-full h-2 mt-1">
            <div className="bg-blue-600 h-2 rounded-full" style={{ width: '20%' }}></div>
          </div>
        </div>
      </div>

      <Alert className="bg-blue-50 border-blue-200 text-blue-800">
        <CheckCircle className="h-4 w-4" />
        <AlertDescription>
          Welcome to Simply Token! Let's get started by creating your account and setting up your first tokenization project.
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name *</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="firstName"
                        placeholder="Enter your first name"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        className={`pl-10 ${errors.firstName ? 'border-red-500' : ''}`}
                      />
                    </div>
                    {errors.firstName && (
                      <p className="text-sm text-red-600">{errors.firstName}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name *</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="lastName"
                        placeholder="Enter your last name"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        className={`pl-10 ${errors.lastName ? 'border-red-500' : ''}`}
                      />
                    </div>
                    {errors.lastName && (
                      <p className="text-sm text-red-600">{errors.lastName}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email address"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className={`pl-10 ${errors.email ? 'border-red-500' : ''}`}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-sm text-red-600">{errors.email}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company">Company Name *</Label>
                  <div className="relative">
                    <Building className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="company"
                      placeholder="Enter your company name"
                      value={formData.company}
                      onChange={(e) => handleInputChange('company', e.target.value)}
                      className={`pl-10 ${errors.company ? 'border-red-500' : ''}`}
                    />
                  </div>
                  {errors.company && (
                    <p className="text-sm text-red-600">{errors.company}</p>
                  )}
                </div>

                <div className="flex justify-end">
                  <Button type="submit" size="lg" className="px-8">
                    Continue
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Getting Started Tips</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-medium text-sm">Account Setup</h4>
                <p className="text-sm text-muted-foreground">
                  Your account information will be used for compliance and legal documentation throughout the tokenization process.
                </p>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-medium text-sm">What's Next?</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Choose your role in the project</li>
                  <li>• Set up your tokenization project</li>
                  <li>• Configure platform modules</li>
                  <li>• Invite your team members</li>
                </ul>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium text-sm">Security</h4>
                <p className="text-sm text-muted-foreground">
                  All information is encrypted and stored securely in compliance with financial regulations.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-lg">Need Help?</CardTitle>
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
