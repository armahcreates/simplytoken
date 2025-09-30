'use client'

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Stepper } from '@/components/Stepper';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { FormSection } from '@/components/FormSection';
import { ArrowRight, Save, Loader2 } from 'lucide-react';
import { HelpTooltip } from '@/components/OnboardingOverlay';

const steps = ["Initial Assessment", "Regulatory Compliance", "Documentation", "Readiness Dashboard"];

interface AssessmentFormData {
  assetName: string;
  assetType: string;
  estimatedValue: string;
  assetLocation: string;
  assetDescription: string;
  ownershipType: string;
  ownerCount: string;
  transferRestrictions: string;
  transferRestrictionsDescription: string;
  isRegulated: string;
  regulatoryBodies: string[];
  legalRestrictions: string;
  tokenizationGoals: string[];
  investorProfile: string[];
  timeline: string;
  additionalGoals: string;
  availableDocuments: string[];
  valuationDate: string;
}

export function InitialAssessment() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<AssessmentFormData>({
    assetName: '',
    assetType: '',
    estimatedValue: '',
    assetLocation: '',
    assetDescription: '',
    ownershipType: '',
    ownerCount: '',
    transferRestrictions: 'no',
    transferRestrictionsDescription: '',
    isRegulated: 'no',
    regulatoryBodies: [],
    legalRestrictions: '',
    tokenizationGoals: [],
    investorProfile: [],
    timeline: '',
    additionalGoals: '',
    availableDocuments: [],
    valuationDate: '',
  });

  // Load saved data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem('initialAssessment');
    if (savedData) {
      try {
        setFormData(JSON.parse(savedData));
        toast.success('Draft loaded successfully');
      } catch (error) {
        console.error('Error loading saved data:', error);
      }
    }
  }, []);

  const handleInputChange = (field: keyof AssessmentFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCheckboxChange = (field: keyof AssessmentFormData, value: string, checked: boolean) => {
    setFormData(prev => {
      const currentArray = prev[field] as string[];
      if (checked) {
        return { ...prev, [field]: [...currentArray, value] };
      } else {
        return { ...prev, [field]: currentArray.filter(item => item !== value) };
      }
    });
  };

  const handleSaveDraft = () => {
    try {
      localStorage.setItem('initialAssessment', JSON.stringify(formData));
      toast.success('Draft saved successfully');
    } catch (error) {
      toast.error('Failed to save draft');
      console.error('Error saving draft:', error);
    }
  };

  const validateForm = (): boolean => {
    if (!formData.assetName.trim()) {
      toast.error('Please enter an asset name');
      return false;
    }
    if (!formData.assetType) {
      toast.error('Please select an asset type');
      return false;
    }
    if (!formData.estimatedValue.trim()) {
      toast.error('Please enter an estimated value');
      return false;
    }
    if (!formData.assetLocation.trim()) {
      toast.error('Please enter an asset location');
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      // Save to localStorage
      localStorage.setItem('initialAssessment', JSON.stringify(formData));

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      toast.success('Assessment saved successfully');
      router.push('/asset-readiness/regulatory-compliance');
    } catch (error) {
      toast.error('Failed to save assessment');
      console.error('Error submitting form:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    if (confirm('Are you sure you want to cancel? Unsaved changes will be lost.')) {
      router.push('/');
    }
  };
  return (
    <div className="space-y-6">
      <div className="flex items-center text-sm text-muted-foreground">
        <Link href="/" className="hover:text-primary">Dashboard</Link>
        <ArrowRight className="mx-2 h-4 w-4" />
        <span className="text-foreground">Asset Readiness</span>
      </div>

      <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mt-4">Asset Readiness Assessment</h1>
      <div className="pt-8">
        <Stepper steps={steps} currentStep={1} />
      </div>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Initial Asset Assessment Questionnaire</CardTitle>
          <p className="text-muted-foreground pt-2">
            Please provide detailed information about your asset to help us evaluate its tokenization readiness. This assessment will help identify potential challenges and opportunities.
          </p>
        </CardHeader>
        <CardContent>
          <FormSection number={1} title="Asset Information">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="asset-name">Asset Name</Label>
                <Input
                  id="asset-name"
                  placeholder="Enter asset name"
                  value={formData.assetName}
                  onChange={(e) => handleInputChange('assetName', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="asset-type">Asset Type</Label>
                <Select value={formData.assetType} onValueChange={(value) => handleInputChange('assetType', value)}>
                  <SelectTrigger id="asset-type">
                    <SelectValue placeholder="Select asset type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="real-estate">Real Estate</SelectItem>
                    <SelectItem value="private-equity">Private Equity</SelectItem>
                    <SelectItem value="art">Art & Collectibles</SelectItem>
                    <SelectItem value="fund">Investment Fund</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="estimated-value">Estimated Value (USD)</Label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">$</span>
                  <Input
                    id="estimated-value"
                    placeholder="0.00"
                    className="pl-7"
                    value={formData.estimatedValue}
                    onChange={(e) => handleInputChange('estimatedValue', e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="asset-location">Asset Location/Jurisdiction</Label>
                <Input
                  id="asset-location"
                  placeholder="Enter location"
                  value={formData.assetLocation}
                  onChange={(e) => handleInputChange('assetLocation', e.target.value)}
                />
              </div>
              <div className="md:col-span-2 space-y-2">
                <Label htmlFor="asset-description">Asset Description</Label>
                <Textarea
                  id="asset-description"
                  placeholder="Provide a detailed description of your asset"
                  rows={4}
                  value={formData.assetDescription}
                  onChange={(e) => handleInputChange('assetDescription', e.target.value)}
                />
              </div>
            </div>
          </FormSection>

          <FormSection number={2} title="Ownership Structure">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="ownership-type">Current Ownership Type</Label>
                <Select value={formData.ownershipType} onValueChange={(value) => handleInputChange('ownershipType', value)}>
                  <SelectTrigger id="ownership-type">
                    <SelectValue placeholder="Select ownership type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="llc">LLC</SelectItem>
                    <SelectItem value="spv">SPV</SelectItem>
                    <SelectItem value="individual">Individual</SelectItem>
                    <SelectItem value="trust">Trust</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="owner-count">Number of Current Owners/Shareholders</Label>
                <Input
                  id="owner-count"
                  type="number"
                  placeholder="Enter number"
                  value={formData.ownerCount}
                  onChange={(e) => handleInputChange('ownerCount', e.target.value)}
                />
              </div>
              <div className="col-span-1 md:col-span-2 space-y-4">
                <Label>Are there any restrictions on ownership transfer?</Label>
                <RadioGroup
                  value={formData.transferRestrictions}
                  onValueChange={(value) => handleInputChange('transferRestrictions', value)}
                  className="flex items-center space-x-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="transfer-yes" />
                    <Label htmlFor="transfer-yes">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="transfer-no" />
                    <Label htmlFor="transfer-no">No</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="unsure" id="transfer-unsure" />
                    <Label htmlFor="transfer-unsure">Unsure</Label>
                  </div>
                </RadioGroup>
              </div>
              <div className="col-span-1 md:col-span-2 space-y-2">
                <Label htmlFor="transfer-restrictions">Please describe any existing ownership transfer restrictions</Label>
                <Textarea
                  id="transfer-restrictions"
                  placeholder="Describe any restrictions"
                  rows={3}
                  value={formData.transferRestrictionsDescription}
                  onChange={(e) => handleInputChange('transferRestrictionsDescription', e.target.value)}
                />
              </div>
            </div>
          </FormSection>

          <FormSection number={3} title="Regulatory Considerations">
            <div className="space-y-6">
              <div className="space-y-4">
                <Label>Is the asset currently regulated?</Label>
                <RadioGroup
                  value={formData.isRegulated}
                  onValueChange={(value) => handleInputChange('isRegulated', value)}
                  className="flex items-center space-x-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="regulated-yes" />
                    <Label htmlFor="regulated-yes">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="regulated-no" />
                    <Label htmlFor="regulated-no">No</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="unsure" id="regulated-unsure" />
                    <Label htmlFor="regulated-unsure">Unsure</Label>
                  </div>
                </RadioGroup>
              </div>
              <div className="space-y-4">
                <Label>Which regulatory bodies currently oversee this asset? (Select all that apply)</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="reg-sec"
                      checked={formData.regulatoryBodies.includes('SEC')}
                      onCheckedChange={(checked) => handleCheckboxChange('regulatoryBodies', 'SEC', checked as boolean)}
                    />
                    <Label htmlFor="reg-sec">SEC</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="reg-finra"
                      checked={formData.regulatoryBodies.includes('FINRA')}
                      onCheckedChange={(checked) => handleCheckboxChange('regulatoryBodies', 'FINRA', checked as boolean)}
                    />
                    <Label htmlFor="reg-finra">FINRA</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="reg-cftc"
                      checked={formData.regulatoryBodies.includes('CFTC')}
                      onCheckedChange={(checked) => handleCheckboxChange('regulatoryBodies', 'CFTC', checked as boolean)}
                    />
                    <Label htmlFor="reg-cftc">CFTC</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="reg-state"
                      checked={formData.regulatoryBodies.includes('State regulators')}
                      onCheckedChange={(checked) => handleCheckboxChange('regulatoryBodies', 'State regulators', checked as boolean)}
                    />
                    <Label htmlFor="reg-state">State regulators</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="reg-none"
                      checked={formData.regulatoryBodies.includes('None')}
                      onCheckedChange={(checked) => handleCheckboxChange('regulatoryBodies', 'None', checked as boolean)}
                    />
                    <Label htmlFor="reg-none">None</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="reg-other"
                      checked={formData.regulatoryBodies.includes('Other')}
                      onCheckedChange={(checked) => handleCheckboxChange('regulatoryBodies', 'Other', checked as boolean)}
                    />
                    <Label htmlFor="reg-other">Other</Label>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="legal-restrictions">Are there any known legal restrictions that might impact tokenization?</Label>
                <Textarea
                  id="legal-restrictions"
                  placeholder="Describe any known legal restrictions"
                  rows={3}
                  value={formData.legalRestrictions}
                  onChange={(e) => handleInputChange('legalRestrictions', e.target.value)}
                />
              </div>
            </div>
          </FormSection>

          <FormSection number={4} title="Tokenization Goals">
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-x-6 gap-y-4">
                <div className="space-y-4">
                  <Label>Primary reason for tokenization (Select all that apply)</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="goal-liquidity"
                        checked={formData.tokenizationGoals.includes('Increase liquidity')}
                        onCheckedChange={(checked) => handleCheckboxChange('tokenizationGoals', 'Increase liquidity', checked as boolean)}
                      />
                      <Label htmlFor="goal-liquidity">Increase liquidity</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="goal-fractional"
                        checked={formData.tokenizationGoals.includes('Fractional ownership')}
                        onCheckedChange={(checked) => handleCheckboxChange('tokenizationGoals', 'Fractional ownership', checked as boolean)}
                      />
                      <Label htmlFor="goal-fractional">Fractional ownership</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="goal-costs"
                        checked={formData.tokenizationGoals.includes('Reduce costs')}
                        onCheckedChange={(checked) => handleCheckboxChange('tokenizationGoals', 'Reduce costs', checked as boolean)}
                      />
                      <Label htmlFor="goal-costs">Reduce costs</Label>
                    </div>
                  </div>
                </div>
                <div className="space-y-4 md:pt-7">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="goal-access"
                        checked={formData.tokenizationGoals.includes('Access to new investors')}
                        onCheckedChange={(checked) => handleCheckboxChange('tokenizationGoals', 'Access to new investors', checked as boolean)}
                      />
                      <Label htmlFor="goal-access">Access to new investors</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="goal-efficiency"
                        checked={formData.tokenizationGoals.includes('Operational efficiency')}
                        onCheckedChange={(checked) => handleCheckboxChange('tokenizationGoals', 'Operational efficiency', checked as boolean)}
                      />
                      <Label htmlFor="goal-efficiency">Operational efficiency</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="goal-other"
                        checked={formData.tokenizationGoals.includes('Other')}
                        onCheckedChange={(checked) => handleCheckboxChange('tokenizationGoals', 'Other', checked as boolean)}
                      />
                      <Label htmlFor="goal-other">Other</Label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-x-6 gap-y-4">
                <div className="space-y-4">
                  <HelpTooltip content="This threshold ensures only accredited investors proceed through your tokenization process">
                    <Label>Target investor profile (Select all that apply)</Label>
                  </HelpTooltip>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="profile-accredited"
                        checked={formData.investorProfile.includes('Accredited investors')}
                        onCheckedChange={(checked) => handleCheckboxChange('investorProfile', 'Accredited investors', checked as boolean)}
                      />
                      <Label htmlFor="profile-accredited">Accredited investors</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="profile-retail"
                        checked={formData.investorProfile.includes('Retail investors')}
                        onCheckedChange={(checked) => handleCheckboxChange('investorProfile', 'Retail investors', checked as boolean)}
                      />
                      <Label htmlFor="profile-retail">Retail investors</Label>
                    </div>
                  </div>
                </div>
                <div className="space-y-4 md:pt-7">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="profile-institutional"
                        checked={formData.investorProfile.includes('Institutional investors')}
                        onCheckedChange={(checked) => handleCheckboxChange('investorProfile', 'Institutional investors', checked as boolean)}
                      />
                      <Label htmlFor="profile-institutional">Institutional investors</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="profile-international"
                        checked={formData.investorProfile.includes('International investors')}
                        onCheckedChange={(checked) => handleCheckboxChange('investorProfile', 'International investors', checked as boolean)}
                      />
                      <Label htmlFor="profile-international">International investors</Label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="timeline">Expected timeline for tokenization</Label>
                <Select value={formData.timeline} onValueChange={(value) => handleInputChange('timeline', value)}>
                  <SelectTrigger id="timeline">
                    <SelectValue placeholder="Select timeline" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="3m">Within 3 months</SelectItem>
                    <SelectItem value="6m">3-6 months</SelectItem>
                    <SelectItem value="12m">6-12 months</SelectItem>
                    <SelectItem value="12p">More than 12 months</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="additional-goals">Additional goals or requirements</Label>
                <Textarea
                  id="additional-goals"
                  placeholder="Describe any additional goals or requirements"
                  rows={3}
                  value={formData.additionalGoals}
                  onChange={(e) => handleInputChange('additionalGoals', e.target.value)}
                />
              </div>
            </div>
          </FormSection>

          <FormSection number={5} title="Documentation & Records">
            <div className="space-y-6">
              <div className="space-y-4">
                <Label>Which of the following documents do you have available? (Select all that apply)</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="doc-ownership"
                      checked={formData.availableDocuments.includes('Ownership certificates')}
                      onCheckedChange={(checked) => handleCheckboxChange('availableDocuments', 'Ownership certificates', checked as boolean)}
                    />
                    <Label htmlFor="doc-ownership">Ownership certificates</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="doc-valuation"
                      checked={formData.availableDocuments.includes('Valuation reports')}
                      onCheckedChange={(checked) => handleCheckboxChange('availableDocuments', 'Valuation reports', checked as boolean)}
                    />
                    <Label htmlFor="doc-valuation">Valuation reports</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="doc-financial"
                      checked={formData.availableDocuments.includes('Financial statements')}
                      onCheckedChange={(checked) => handleCheckboxChange('availableDocuments', 'Financial statements', checked as boolean)}
                    />
                    <Label htmlFor="doc-financial">Financial statements</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="doc-legal"
                      checked={formData.availableDocuments.includes('Legal agreements')}
                      onCheckedChange={(checked) => handleCheckboxChange('availableDocuments', 'Legal agreements', checked as boolean)}
                    />
                    <Label htmlFor="doc-legal">Legal agreements</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="doc-filings"
                      checked={formData.availableDocuments.includes('Regulatory filings')}
                      onCheckedChange={(checked) => handleCheckboxChange('availableDocuments', 'Regulatory filings', checked as boolean)}
                    />
                    <Label htmlFor="doc-filings">Regulatory filings</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="doc-bylaws"
                      checked={formData.availableDocuments.includes('Corporate bylaws')}
                      onCheckedChange={(checked) => handleCheckboxChange('availableDocuments', 'Corporate bylaws', checked as boolean)}
                    />
                    <Label htmlFor="doc-bylaws">Corporate bylaws</Label>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="valuation-date">When was the last professional valuation of this asset?</Label>
                <Select value={formData.valuationDate} onValueChange={(value) => handleInputChange('valuationDate', value)}>
                  <SelectTrigger id="valuation-date">
                    <SelectValue placeholder="Select timeframe" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="6m">Within last 6 months</SelectItem>
                    <SelectItem value="12m">6-12 months ago</SelectItem>
                    <SelectItem value="24m">1-2 years ago</SelectItem>
                    <SelectItem value="24p">More than 2 years ago</SelectItem>
                    <SelectItem value="never">Never</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </FormSection>

          <div className="flex flex-col sm:flex-row justify-between items-center pt-10 gap-4">
            <Button variant="ghost" className="w-full sm:w-auto" onClick={handleSaveDraft}>
              <Save className="mr-2 h-4 w-4" /> Save Draft
            </Button>
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              <Button variant="outline" className="w-full sm:w-auto" onClick={handleCancel}>Cancel</Button>
              <Button className="w-full sm:w-auto" onClick={handleSubmit} disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    Continue <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
