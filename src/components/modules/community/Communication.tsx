import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { faker } from '@faker-js/faker';
import { 
  Search, 
  Filter, 
  Plus, 
  Mail, 
  Newspaper, 
  MessageSquare, 
  Bold, 
  Italic, 
  Underline, 
  List, 
  Link2, 
  Image as ImageIcon,
  Eye,
  Trash2,
  X,
  Calendar,
  Clock,
  ArrowUp
} from 'lucide-react';

const messageTemplates = [
  { title: 'Quarterly Update', type: 'Email', description: 'A template for quarterly updates about project progress, milestones, and financial performance.' },
  { title: 'Governance Announcement', type: 'Newsletter', description: 'Announcement template for upcoming governance votes, proposals, and decision-making.' },
  { title: 'Event Invitation', type: 'SMS', description: 'Template for inviting stakeholders to upcoming community events, webinars, and meetings.' },
  { title: 'Welcome Message', type: 'Email', description: 'Onboarding template for new token holders with essential information and next steps.' },
];

const savedDrafts = [
  { title: 'July Construction Update', edited: 'Edited 2 hours ago', recipients: 'All Stakeholders' },
  { title: 'Upcoming Governance Vote', edited: 'Edited yesterday', recipients: 'Token Holders' },
];

const scheduledMessages = {
  thisWeek: [
    { title: 'Construction Update', time: 'Today, 10:00 AM', type: 'Email', recipients: 234, color: 'border-green-500' },
    { title: 'Quarterly Dividend Notice', time: 'Jul 12, 9:00 AM', type: 'Email', recipients: 156, color: 'border-blue-500' },
    { title: 'Town Hall Reminder', time: 'Jul 14, 3:00 PM', type: 'SMS', recipients: 78, color: 'border-purple-500' },
  ],
  upcoming: [
    { title: 'Monthly Newsletter', time: 'Jul 25, 8:00 AM', type: 'Newsletter', recipients: 350 },
  ]
};

export function Communication() {
  return (
    <div className="space-y-6 pt-4">
      <div className="flex items-center justify-between">
        <div>
            <h2 className="text-xl font-semibold">Communication Center</h2>
            <p className="text-muted-foreground">Manage and schedule communications with your community</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline"><Filter className="mr-2" />Filter</Button>
          <Button><Plus className="mr-2" />New Message</Button>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-5 gap-6">
        {/* Left Column */}
        <div className="xl:col-span-2 space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Message Templates</CardTitle>
              <Button variant="link" className="p-0 h-auto">View All</Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search templates..." className="pl-10" />
              </div>
              <div className="space-y-3">
                {messageTemplates.map(template => (
                  <div key={template.title} className="p-3 border rounded-lg hover:border-primary cursor-pointer">
                    <div className="flex justify-between items-start">
                      <p className="font-medium">{template.title}</p>
                      <Badge variant={template.type === 'SMS' ? 'destructive' : template.type === 'Newsletter' ? 'secondary' : 'default'} className="text-xs">{template.type}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{template.description}</p>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full"><Plus className="mr-2" /> Create New Template</Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Saved Drafts</CardTitle>
              <Button variant="link" className="p-0 h-auto">View All</Button>
            </CardHeader>
            <CardContent className="space-y-3">
              {savedDrafts.map(draft => (
                <div key={draft.title} className="p-3 border rounded-lg hover:border-primary cursor-pointer">
                  <div className="flex justify-between items-center">
                    <p className="font-medium">{draft.title}</p>
                    <p className="text-xs text-muted-foreground">{draft.edited}</p>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                    <Mail className="h-4 w-4" />
                    <span>{draft.recipients}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Center Column */}
        <div className="lg:col-span-2 xl:col-span-3 grid grid-cols-1 xl:grid-cols-3 gap-6">
          <Card className="xl:col-span-2">
            <CardHeader className="flex-row items-center justify-between">
              <div className="flex items-center gap-2">
                <CardTitle>New Message</CardTitle>
                <Badge variant="outline">Draft</Badge>
              </div>
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="icon"><Eye className="h-5 w-5" /></Button>
                <Button variant="ghost" size="icon"><Trash2 className="h-5 w-5" /></Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-sm font-medium">Message Type</Label>
                <ToggleGroup type="single" defaultValue="email" className="mt-2">
                  <ToggleGroupItem value="email" aria-label="Email"><Mail className="mr-2" />Email</ToggleGroupItem>
                  <ToggleGroupItem value="newsletter" aria-label="Newsletter"><Newspaper className="mr-2" />Newsletter</ToggleGroupItem>
                  <ToggleGroupItem value="sms" aria-label="SMS"><MessageSquare className="mr-2" />SMS</ToggleGroupItem>
                </ToggleGroup>
              </div>
              <div>
                <Label htmlFor="subject" className="text-sm font-medium">Subject</Label>
                <Input id="subject" defaultValue="Important Update: Q2 Project Progress Report" className="mt-1" />
              </div>
              <div>
                <Label htmlFor="recipients" className="text-sm font-medium">Recipients</Label>
                <div className="p-2 border rounded-lg mt-1 flex flex-wrap items-center gap-2">
                  <Badge>All Token Holders <X className="ml-1 h-3 w-3 cursor-pointer" /></Badge>
                  <Badge>Investors <X className="ml-1 h-3 w-3 cursor-pointer" /></Badge>
                  <Input placeholder="Add more recipients..." className="border-none h-auto p-0 flex-1 focus-visible:ring-0 shadow-none min-w-[120px]" />
                </div>
              </div>
              <div>
                <div className="border rounded-t-lg p-2 flex items-center gap-1">
                  <Button variant="ghost" size="icon" className="h-8 w-8"><Bold /></Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8"><Italic /></Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8"><Underline /></Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8"><List /></Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8"><Link2 /></Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8"><ImageIcon /></Button>
                </div>
                <Textarea 
                  className="rounded-t-none min-h-[200px] focus-visible:ring-1"
                  defaultValue={`Dear Token Holders,

We are pleased to share the Q2 progress report for Harmony Residences. The project has reached several key milestones:
- Construction Phase 2 completed ahead of schedule
- All regulatory approvals secured for Phase 3`}
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline">Save as Draft</Button>
                <Button variant="outline">Preview</Button>
                <Button>Schedule Message</Button>
              </div>
            </CardContent>
          </Card>

          {/* Right Column (inside center column grid) */}
          <div className="xl:col-span-1 space-y-6">
            <Card>
              <CardHeader className="flex-row items-center justify-between">
                <CardTitle>Scheduled Messages</CardTitle>
                <Button variant="link" className="p-0 h-auto text-sm flex items-center gap-1"><Calendar className="h-4 w-4"/>View Calendar</Button>
              </CardHeader>
              <CardContent>
                <div className="relative space-y-4">
                  <h4 className="text-sm font-semibold">This Week</h4>
                  {scheduledMessages.thisWeek.map((msg, index) => (
                    <div key={index} className="flex gap-3 relative">
                      <div className={`absolute left-1.5 top-5 -bottom-5 w-0.5 ${msg.color.replace('border-', 'bg-')}`}></div>
                      <div className={`h-4 w-4 rounded-full z-10 mt-1 flex-shrink-0 border-2 ${msg.color}`}></div>
                      <div className="flex-1">
                        <p className="font-medium text-sm">{msg.title}</p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          <span>{msg.time}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          {msg.type === 'Email' ? <Mail className="h-3 w-3" /> : <MessageSquare className="h-3 w-3" />}
                          <span>{msg.recipients} recipients</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 space-y-4">
                  <h4 className="text-sm font-semibold">Upcoming</h4>
                   {scheduledMessages.upcoming.map((msg, index) => (
                    <div key={index} className="flex gap-3">
                      <div className="h-4 w-4 rounded-full bg-gray-300 mt-1 flex-shrink-0"></div>
                      <div className="flex-1">
                        <p className="font-medium text-sm">{msg.title}</p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          <span>{msg.time}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Newspaper className="h-3 w-3" />
                          <span>{msg.recipients} recipients</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Communication Analytics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium mb-2">Engagement Overview</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <p className="text-xs text-muted-foreground">Open Rate</p>
                      <p className="text-2xl font-bold">68.4%</p>
                      <p className="text-xs text-green-600 flex items-center justify-center gap-1"><ArrowUp className="h-3 w-3" /> 4.2% from last month</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-muted-foreground">Click Rate</p>
                      <p className="text-2xl font-bold">42.1%</p>
                      <p className="text-xs text-green-600 flex items-center justify-center gap-1"><ArrowUp className="h-3 w-3" /> 1.8% from last month</p>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-1">Response Time</h4>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Average</span>
                    <span>4.2 hours</span>
                  </div>
                  <Progress value={(4.2/6)*100} className="h-2 mt-1" />
                  <p className="text-xs text-muted-foreground text-right mt-1">Target: 6 hours</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-2">Top Performing Messages</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between"><span>Quarterly Update (Jun)</span><span className="font-medium">76% open</span></div>
                    <div className="flex justify-between"><span>Governance Poll</span><span className="font-medium">72% open</span></div>
                    <div className="flex justify-between"><span>Town Hall Invitation</span><span className="font-medium">68% open</span></div>
                  </div>
                </div>
                <Button variant="outline" className="w-full">View Detailed Analytics</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
