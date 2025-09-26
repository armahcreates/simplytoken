'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import Link from 'next/link';
import { 
  Download, 
  Edit, 
  BookOpenCheck,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { Stepper } from '@/components/Stepper';

const trendData = [
  { month: 'Jan', score: 45 },
  { month: 'Feb', score: 52 },
  { month: 'Mar', score: 58 },
  { month: 'Apr', score: 65 },
  { month: 'May', score: 69 },
  { month: 'Jun', score: 72 },
];

const readinessBreakdown = [
  { category: 'Legal Structure', score: 85, color: 'bg-green-500' },
  { category: 'Technical Readiness', score: 50, color: 'bg-yellow-500' },
  { category: 'Regulatory Compliance', score: 65, color: 'bg-blue-500' },
  { category: 'Market Readiness', score: 75, color: 'bg-green-500' },
  { category: 'Documentation', score: 90, color: 'bg-green-500' },
  { category: 'Operational Readiness', score: 60, color: 'bg-yellow-500' },
];

const steps = ["Initial Assessment", "Regulatory Compliance", "Documentation", "Readiness Dashboard"];

export function AssetReadinessDashboard() {
  return (
    <div className="space-y-6">
       <div className="flex items-center text-sm text-muted-foreground">
        <Link href="/" className="hover:text-primary">Dashboard</Link>
        <ArrowRight className="mx-2 h-4 w-4" />
        <Link href="/asset-readiness" className="hover:text-primary">Asset Readiness</Link>
        <ArrowRight className="mx-2 h-4 w-4" />
        <span className="text-foreground">Readiness Dashboard</span>
      </div>

      <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Asset Readiness Assessment</h1>
      <Stepper steps={steps} currentStep={4} />

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-6 gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-semibold tracking-tight">Readiness Dashboard</h2>
          <div className="flex items-center gap-4 mt-1">
            <Badge variant="secondary">Assessment Completed</Badge>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <Button variant="outline" className="w-full sm:w-auto">
            <Download className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Export Report</span>
            <span className="sm:hidden">Export</span>
          </Button>
          <Button className="w-full sm:w-auto">
            <Edit className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Launch Compliance Review</span>
            <span className="sm:hidden">Review</span>
          </Button>
        </div>
      </div>
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-3 pt-4">
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Riverfront Plaza</CardTitle>
              <p className="text-sm text-muted-foreground">Commercial Real Estate | New York, USA</p>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center">
                <div className="relative w-32 h-32">
                  <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="45" stroke="#e5e7eb" strokeWidth="8" fill="none" />
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      stroke="#3b82f6"
                      strokeWidth="8"
                      fill="none"
                      strokeDasharray={`${72 * 2.83} ${100 * 2.83}`}
                      className="transition-all duration-500"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-600">72%</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-4 text-center">
                <p className="font-semibold">Overall Readiness</p>
                <p className="text-sm text-muted-foreground">Last updated: Jan 16, 2025</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Readiness Score Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={trendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis domain={[0, 100]} />
                    <Line type="monotone" dataKey="score" stroke="#3b82f6" strokeWidth={3} dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Readiness Score Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                {readinessBreakdown.map((item, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">{item.category}</span>
                      <span className="text-sm font-bold">{item.score}%</span>
                    </div>
                    <Progress value={item.score} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpenCheck className="h-5 w-5 text-indigo-600" />
                Document Templates
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Access legal agreements, disclosures, and other standardized documents for your tokenization process.
              </p>
              <Button className="w-full" asChild>
                <Link href="/asset-readiness/document-templates">
                  Go to Library <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="flex justify-start">
        <Button variant="outline" asChild>
          <Link href="/asset-readiness/documentation">
            <ArrowLeft className="mr-2 h-4 w-4" /> Previous
          </Link>
        </Button>
      </div>
    </div>
  );
}
