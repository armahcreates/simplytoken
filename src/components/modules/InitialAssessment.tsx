import { Link } from 'react-router-dom';
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
import { ArrowRight, Save } from 'lucide-react';

const steps = ["Initial Assessment", "Regulatory Compliance", "Documentation", "Readiness Dashboard"];

export function InitialAssessment() {
  return (
    <div className="space-y-6">
      <div className="flex items-center text-sm text-muted-foreground">
        <Link to="/" className="hover:text-primary">Dashboard</Link>
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
                <Input id="asset-name" placeholder="Enter asset name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="asset-type">Asset Type</Label>
                <Select>
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
                  <Input id="estimated-value" placeholder="0.00" className="pl-7" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="asset-location">Asset Location/Jurisdiction</Label>
                <Input id="asset-location" placeholder="Enter location" />
              </div>
              <div className="md:col-span-2 space-y-2">
                <Label htmlFor="asset-description">Asset Description</Label>
                <Textarea id="asset-description" placeholder="Provide a detailed description of your asset" rows={4} />
              </div>
            </div>
          </FormSection>

          <FormSection number={2} title="Ownership Structure">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="ownership-type">Current Ownership Type</Label>
                <Select>
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
                <Input id="owner-count" type="number" placeholder="Enter number" />
              </div>
              <div className="col-span-1 md:col-span-2 space-y-4">
                <Label>Are there any restrictions on ownership transfer?</Label>
                <RadioGroup defaultValue="no" className="flex items-center space-x-4">
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
                <Textarea id="transfer-restrictions" placeholder="Describe any restrictions" rows={3} />
              </div>
            </div>
          </FormSection>

          <FormSection number={3} title="Regulatory Considerations">
            <div className="space-y-6">
              <div className="space-y-4">
                <Label>Is the asset currently regulated?</Label>
                <RadioGroup defaultValue="no" className="flex items-center space-x-4">
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
                  <div className="flex items-center space-x-2"><Checkbox id="reg-sec" /><Label htmlFor="reg-sec">SEC</Label></div>
                  <div className="flex items-center space-x-2"><Checkbox id="reg-finra" /><Label htmlFor="reg-finra">FINRA</Label></div>
                  <div className="flex items-center space-x-2"><Checkbox id="reg-cftc" /><Label htmlFor="reg-cftc">CFTC</Label></div>
                  <div className="flex items-center space-x-2"><Checkbox id="reg-state" /><Label htmlFor="reg-state">State regulators</Label></div>
                  <div className="flex items-center space-x-2"><Checkbox id="reg-none" /><Label htmlFor="reg-none">None</Label></div>
                  <div className="flex items-center space-x-2"><Checkbox id="reg-other" /><Label htmlFor="reg-other">Other</Label></div>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="legal-restrictions">Are there any known legal restrictions that might impact tokenization?</Label>
                <Textarea id="legal-restrictions" placeholder="Describe any known legal restrictions" rows={3} />
              </div>
            </div>
          </FormSection>

          <FormSection number={4} title="Tokenization Goals">
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-x-6 gap-y-4">
                <div className="space-y-4">
                  <Label>Primary reason for tokenization (Select all that apply)</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2"><Checkbox id="goal-liquidity" /><Label htmlFor="goal-liquidity">Increase liquidity</Label></div>
                    <div className="flex items-center space-x-2"><Checkbox id="goal-fractional" /><Label htmlFor="goal-fractional">Fractional ownership</Label></div>
                    <div className="flex items-center space-x-2"><Checkbox id="goal-costs" /><Label htmlFor="goal-costs">Reduce costs</Label></div>
                  </div>
                </div>
                <div className="space-y-4 md:pt-7">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2"><Checkbox id="goal-access" /><Label htmlFor="goal-access">Access to new investors</Label></div>
                    <div className="flex items-center space-x-2"><Checkbox id="goal-efficiency" /><Label htmlFor="goal-efficiency">Operational efficiency</Label></div>
                    <div className="flex items-center space-x-2"><Checkbox id="goal-other" /><Label htmlFor="goal-other">Other</Label></div>
                  </div>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-x-6 gap-y-4">
                <div className="space-y-4">
                  <Label>Target investor profile (Select all that apply)</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2"><Checkbox id="profile-accredited" /><Label htmlFor="profile-accredited">Accredited investors</Label></div>
                    <div className="flex items-center space-x-2"><Checkbox id="profile-retail" /><Label htmlFor="profile-retail">Retail investors</Label></div>
                  </div>
                </div>
                <div className="space-y-4 md:pt-7">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2"><Checkbox id="profile-institutional" /><Label htmlFor="profile-institutional">Institutional investors</Label></div>
                    <div className="flex items-center space-x-2"><Checkbox id="profile-international" /><Label htmlFor="profile-international">International investors</Label></div>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="timeline">Expected timeline for tokenization</Label>
                <Select>
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
                <Textarea id="additional-goals" placeholder="Describe any additional goals or requirements" rows={3} />
              </div>
            </div>
          </FormSection>

          <FormSection number={5} title="Documentation & Records">
            <div className="space-y-6">
              <div className="space-y-4">
                <Label>Which of the following documents do you have available? (Select all that apply)</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="flex items-center space-x-2"><Checkbox id="doc-ownership" /><Label htmlFor="doc-ownership">Ownership certificates</Label></div>
                  <div className="flex items-center space-x-2"><Checkbox id="doc-valuation" /><Label htmlFor="doc-valuation">Valuation reports</Label></div>
                  <div className="flex items-center space-x-2"><Checkbox id="doc-financial" /><Label htmlFor="doc-financial">Financial statements</Label></div>
                  <div className="flex items-center space-x-2"><Checkbox id="doc-legal" /><Label htmlFor="doc-legal">Legal agreements</Label></div>
                  <div className="flex items-center space-x-2"><Checkbox id="doc-filings" /><Label htmlFor="doc-filings">Regulatory filings</Label></div>
                  <div className="flex items-center space-x-2"><Checkbox id="doc-bylaws" /><Label htmlFor="doc-bylaws">Corporate bylaws</Label></div>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="valuation-date">When was the last professional valuation of this asset?</Label>
                <Select>
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
            <Button variant="ghost" className="w-full sm:w-auto"><Save className="mr-2 h-4 w-4" /> Save Draft</Button>
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              <Button variant="outline" className="w-full sm:w-auto">Cancel</Button>
              <Button asChild className="w-full sm:w-auto">
                <Link to="/asset-readiness/regulatory-compliance">Continue <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
