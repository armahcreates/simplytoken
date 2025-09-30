'use client'

import { useState, useRef } from 'react';
import Link from 'next/link';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Stepper } from '@/components/Stepper';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  ArrowLeft,
  ArrowRight,
  Search,
  FileText,
  Download,
  Eye,
  Upload,
  Filter,
  Loader2
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const documentTemplates = [
  {
    id: '1',
    title: 'Private Placement Memorandum Template',
    category: 'Legal Documents',
    description: 'Comprehensive PPM template for private securities offerings',
    assetTypes: ['Real Estate', 'Private Equity'],
    lastUpdated: '2024-01-15',
    status: 'Current'
  },
  {
    id: '2',
    title: 'Subscription Agreement',
    category: 'Legal Documents',
    description: 'Standard subscription agreement for token purchases',
    assetTypes: ['All Asset Types'],
    lastUpdated: '2024-01-10',
    status: 'Current'
  },
  {
    id: '3',
    title: 'Investor Questionnaire (Accredited)',
    category: 'Compliance Forms',
    description: 'Accredited investor verification questionnaire',
    assetTypes: ['All Asset Types'],
    lastUpdated: '2024-01-08',
    status: 'Current'
  },
  {
    id: '4',
    title: 'Operating Agreement Template',
    category: 'Legal Documents',
    description: 'LLC operating agreement template for tokenized assets',
    assetTypes: ['Real Estate', 'Infrastructure'],
    lastUpdated: '2024-01-05',
    status: 'Current'
  },
  {
    id: '5',
    title: 'Risk Disclosure Statement',
    category: 'Disclosure Documents',
    description: 'Comprehensive risk disclosure for token investments',
    assetTypes: ['All Asset Types'],
    lastUpdated: '2024-01-03',
    status: 'Current'
  },
  {
    id: '6',
    title: 'Anti-Money Laundering (AML) Policy',
    category: 'Compliance Forms',
    description: 'AML compliance policy template',
    assetTypes: ['All Asset Types'],
    lastUpdated: '2023-12-28',
    status: 'Current'
  }
];

export function Documentation() {
  const steps = ["Initial Assessment", "Regulatory Compliance", "Documentation", "Readiness Dashboard"];
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isUploading, setIsUploading] = useState(false);
  const [previewDocument, setPreviewDocument] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const filteredTemplates = documentTemplates.filter(template => {
    const matchesSearch = template.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    try {
      const file = files[0];
      // Simulate file upload
      await new Promise(resolve => setTimeout(resolve, 1500));

      // In a real app, this would upload to a server
      toast.success(`${file.name} uploaded successfully`);

      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      toast.error('Failed to upload document');
      console.error('Upload error:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const handlePreview = (template: any) => {
    setPreviewDocument(template);
    toast.info(`Opening preview for: ${template.title}`);
  };

  const handleDownload = (template: any) => {
    toast.success(`Downloading: ${template.title}`);
    // In a real app, this would trigger a file download
    console.log('Downloading template:', template.id);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center text-sm text-muted-foreground">
        <Link href="/" className="hover:text-primary">Dashboard</Link>
        <ArrowRight className="mx-2 h-4 w-4" />
        <Link href="/asset-readiness" className="hover:text-primary">Asset Readiness</Link>
        <ArrowRight className="mx-2 h-4 w-4" />
        <span className="text-foreground">Documentation</span>
      </div>

      <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Asset Readiness Assessment</h1>
      <Stepper steps={steps} currentStep={3} />

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <CardTitle className="text-xl">Document Templates Library</CardTitle>
              <p className="text-muted-foreground mt-1">
                Access legal documents, compliance forms, and templates for your tokenization project
              </p>
            </div>
            <div>
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx"
              />
              <Button
                className="w-full sm:w-auto"
                onClick={handleUploadClick}
                disabled={isUploading}
              >
                {isUploading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Document
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search documents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="Legal Documents">Legal Documents</SelectItem>
                  <SelectItem value="Compliance Forms">Compliance Forms</SelectItem>
                  <SelectItem value="Disclosure Documents">Disclosure Documents</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Document Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTemplates.map((template) => (
              <Card key={template.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <FileText className="h-8 w-8 text-blue-600 mb-2" />
                    <Badge variant="secondary" className="text-xs">
                      {template.status}
                    </Badge>
                  </div>
                  <CardTitle className="text-base leading-tight">
                    {template.title}
                  </CardTitle>
                  <Badge variant="outline" className="text-xs w-fit">
                    {template.category}
                  </Badge>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                    {template.description}
                  </p>
                  <div className="space-y-2 mb-4">
                    <div className="text-xs text-muted-foreground">
                      Asset Types: {template.assetTypes.join(', ')}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Updated: {new Date(template.lastUpdated).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => handlePreview(template)}
                    >
                      <Eye className="mr-2 h-3 w-3" />
                      Preview
                    </Button>
                    <Button
                      size="sm"
                      className="flex-1"
                      onClick={() => handleDownload(template)}
                    >
                      <Download className="mr-2 h-3 w-3" />
                      Download
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredTemplates.length === 0 && (
            <div className="text-center py-8">
              <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <p className="text-muted-foreground">No documents found matching your criteria</p>
            </div>
          )}

          {/* Navigation */}
          <div className="flex flex-col sm:flex-row justify-between gap-4 pt-6 border-t">
            <Button variant="outline" asChild className="w-full sm:w-auto">
              <Link href="/asset-readiness/regulatory-compliance">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous: Regulatory Compliance
              </Link>
            </Button>
            <Button asChild className="w-full sm:w-auto">
              <Link href="/asset-readiness/dashboard">
                Continue to Dashboard
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Preview Dialog */}
      <Dialog open={!!previewDocument} onOpenChange={() => setPreviewDocument(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh]">
          {previewDocument && (
            <>
              <DialogHeader>
                <DialogTitle>{previewDocument.title}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Badge variant="outline">{previewDocument.category}</Badge>
                  <span className="text-sm text-muted-foreground">
                    Last updated: {new Date(previewDocument.lastUpdated).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{previewDocument.description}</p>
                <div className="border rounded-lg p-8 bg-muted/50 min-h-[400px] flex items-center justify-center">
                  <div className="text-center">
                    <FileText className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">Document preview would be displayed here</p>
                    <p className="text-sm text-muted-foreground mt-2">
                      In a production environment, this would show the actual document content
                    </p>
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setPreviewDocument(null)}>
                    Close
                  </Button>
                  <Button onClick={() => handleDownload(previewDocument)}>
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
