import React from 'react';
import {
  Search,
  Upload,
  LayoutGrid,
  List,
  FileText,
  ArrowRight,
  Info,
  Eye,
  Download,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { faker } from '@faker-js/faker';

type Template = {
  id: string;
  title: string;
  category: string;
  description: string;
  lastUpdated: string;
  assetTypes: string[];
  docType: string;
  jurisdiction: string;
  version: string;
};

const docTypes = ['Legal Agreement', 'Disclosure', 'Offering Memorandum', 'Compliance Form', 'Investor Questionnaire'];
const assetTypes = ['Real Estate', 'Private Equity', 'Venture Capital', 'Investment Fund', 'Infrastructure'];

const templates: Template[] = [
    {
        id: faker.string.uuid(),
        title: 'Private Placement Memorandum',
        category: 'Legal',
        description: 'A comprehensive legal document for private securities offerings, outlining terms and risks for investors.',
        lastUpdated: 'May 12, 2023',
        assetTypes: ['All'],
        docType: 'Legal Agreement',
        jurisdiction: 'United States',
        version: '2.1',
    },
];

for (let i = 0; i < 8; i++) {
    templates.push({
        id: faker.string.uuid(),
        title: faker.commerce.productName() + ' Agreement',
        category: faker.helpers.arrayElement(['Legal', 'Financial', 'Compliance']),
        description: faker.lorem.sentence(15),
        lastUpdated: faker.date.past({ years: 1 }).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
        assetTypes: faker.helpers.arrayElements(assetTypes, { min: 1, max: 3 }),
        docType: faker.helpers.arrayElement(docTypes),
        jurisdiction: faker.location.country(),
        version: `${faker.number.int({ min: 1, max: 5 })}.${faker.number.int({ min: 0, max: 9 })}`,
    });
}

export function DocumentTemplatesLibrary() {
  const [selectedTemplate, setSelectedTemplate] = React.useState<Template | null>(null);

  return (
    <div className="space-y-6">
      <div className="flex items-center text-sm text-muted-foreground">
        <Link to="/" className="hover:text-primary">Dashboard</Link>
        <ArrowRight className="mx-2 h-4 w-4" />
        <Link to="/asset-readiness" className="hover:text-primary">Asset Readiness</Link>
        <ArrowRight className="mx-2 h-4 w-4" />
        <span className="text-foreground">Document Templates</span>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Document Templates Library</h1>
        <Button className="w-full sm:w-auto">
          <Upload className="mr-2 h-4 w-4" />
          <span className="hidden sm:inline">Upload New Template</span>
          <span className="sm:hidden">Upload</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
        <aside className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Filters</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search templates" className="pl-10" />
              </div>

              <div>
                <h3 className="mb-3 text-sm font-medium">Asset Type</h3>
                <div className="space-y-2">
                  {assetTypes.map((type) => (
                    <div key={type} className="flex items-center space-x-2">
                      <Checkbox id={`asset-${type}`} />
                      <label htmlFor={`asset-${type}`} className="text-sm font-normal">
                        {type}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="mb-3 text-sm font-medium">Document Type</h3>
                <div className="space-y-2">
                  {docTypes.map((type) => (
                    <div key={type} className="flex items-center space-x-2">
                      <Checkbox id={`doc-${type}`} />
                      <label htmlFor={`doc-${type}`} className="text-sm font-normal">
                        {type}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="mb-3 text-sm font-medium">Jurisdiction</h3>
                <Button variant="outline" className="w-full justify-start font-normal">All Jurisdictions</Button>
              </div>

              <div>
                <h3 className="mb-3 text-sm font-medium">Date Added</h3>
                <Button variant="outline" className="w-full justify-start font-normal">Any Time</Button>
              </div>

              <Button variant="ghost" className="w-full">Reset Filters</Button>
            </CardContent>
          </Card>
        </aside>

        <main className="lg:col-span-3">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">View:</span>
              <Button variant="outline" size="icon" className="h-8 w-8">
                <LayoutGrid className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <List className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <label className="text-sm text-muted-foreground">Sort by:</label>
              <Select defaultValue="recently-added">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recently-added">Recently Added</SelectItem>
                  <SelectItem value="alphabetical">Alphabetical</SelectItem>
                  <SelectItem value="popular">Popular</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {templates.map((template) => (
              <Card
                key={template.id}
                className="flex flex-col cursor-pointer hover:border-primary transition-colors"
                onClick={() => setSelectedTemplate(template)}
              >
                <CardHeader className="flex-row items-start gap-4 space-y-0">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <FileText className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-base">{template.title}</CardTitle>
                    <Badge variant="outline" className="mt-1 font-normal">{template.category}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-sm text-muted-foreground line-clamp-3">{template.description}</p>
                </CardContent>
                <div className="p-6 pt-0 flex items-center justify-between text-sm text-muted-foreground">
                  <span>{template.lastUpdated}</span>
                  <ArrowRight className="h-4 w-4" />
                </div>
              </Card>
            ))}
          </div>
        </main>
      </div>

      <Dialog open={!!selectedTemplate} onOpenChange={(isOpen) => !isOpen && setSelectedTemplate(null)}>
        <DialogContent className="max-w-4xl p-0">
          {selectedTemplate && (
            <>
              <DialogHeader className="p-6 pb-0">
                <DialogTitle className="text-2xl">{selectedTemplate.title}</DialogTitle>
              </DialogHeader>
              <div className="p-6 space-y-6">
                <div className="p-6 bg-gray-50 rounded-lg">
                  <h2 className="text-center font-semibold text-lg">PRIVATE PLACEMENT MEMORANDUM</h2>
                  <h3 className="text-center font-semibold text-lg text-muted-foreground">[ASSET NAME] TOKENIZED SECURITIES</h3>
                  <p className="text-xs text-muted-foreground mt-4 text-justify">
                    This Private Placement Memorandum ("Memorandum") relates to the offering of tokenized securities representing ownership interests in [ASSET NAME] (the "Tokens"). This offering is being made in reliance upon an exemption from registration under the Securities Act of 1933, as amended (the "Securities Act"). The Tokens have not been approved or disapproved by the Securities and Exchange Commission, any state securities commission or other regulatory authority, nor have any of the foregoing authorities passed upon or endorsed the merits of this offering or the accuracy or adequacy of this Memorandum. Any representation to the contrary is unlawful.
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3">TEMPLATE DETAILS</h4>
                    <div className="text-sm space-y-2">
                      <div className="flex justify-between"><span>Document Type:</span> <span className="font-medium text-foreground">{selectedTemplate.docType}</span></div>
                      <div className="flex justify-between"><span>Applicable Asset Types:</span> <span className="font-medium text-foreground">{selectedTemplate.assetTypes.join(', ')}</span></div>
                      <div className="flex justify-between"><span>Jurisdiction:</span> <span className="font-medium text-foreground">{selectedTemplate.jurisdiction}</span></div>
                      <div className="flex justify-between"><span>Last Updated:</span> <span className="font-medium text-foreground">{selectedTemplate.lastUpdated}</span></div>
                      <div className="flex justify-between"><span>Version:</span> <span className="font-medium text-foreground">{selectedTemplate.version}</span></div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">USAGE INFORMATION</h4>
                    <p className="text-sm text-muted-foreground mb-4">This template includes provisions specifically designed for tokenized securities offerings. It should be customized with the assistance of legal counsel to ensure compliance with applicable securities laws.</p>
                    <div className="space-y-2">
                      <div className="flex items-start gap-2 text-sm text-blue-600">
                        <Info className="h-4 w-4 mt-0.5 flex-shrink-0" />
                        <span>Requires legal review before finalization</span>
                      </div>
                      <div className="flex items-start gap-2 text-sm text-blue-600">
                        <Info className="h-4 w-4 mt-0.5 flex-shrink-0" />
                        <span>Contains variable fields that need completion</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <DialogFooter className="bg-gray-50 p-4 flex flex-col sm:flex-row justify-between w-full gap-2">
                <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                  <Button variant="ghost" className="w-full sm:w-auto"><Eye className="mr-2 h-4 w-4" /> Preview</Button>
                  <Button variant="ghost" className="w-full sm:w-auto"><Download className="mr-2 h-4 w-4" /> Download</Button>
                </div>
                <Button onClick={() => setSelectedTemplate(null)} className="w-full sm:w-auto">Use Template</Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
