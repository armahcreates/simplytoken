import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Building2, 
  Users, 
  Vote, 
  TrendingUp, 
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Clock
} from 'lucide-react';

export function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome to Simply Token - Your tokenization platform
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Assets</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              +3 from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Community Members</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,847</div>
            <p className="text-xs text-muted-foreground">
              +12% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Votes</CardTitle>
            <Vote className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7</div>
            <p className="text-xs text-muted-foreground">
              3 ending this week
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Capital Raised</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$12.4M</div>
            <p className="text-xs text-muted-foreground">
              +20% from last quarter
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5 text-blue-600" />
              Asset Readiness
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Assess your assets for tokenization readiness with compliance checks and documentation.
            </p>
            <Button className="w-full" asChild>
              <a href="/asset-readiness">
                <span className="flex items-center justify-center">
                  Start Assessment <ArrowRight className="ml-2 h-4 w-4" />
                </span>
              </a>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-green-600" />
              Community Hub
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Manage investor communications, engagement analytics, and stakeholder relationships.
            </p>
            <Button className="w-full" variant="outline" asChild>
              <a href="/community-management">
                <span className="flex items-center justify-center">
                  Manage Community <ArrowRight className="ml-2 h-4 w-4" />
                </span>
              </a>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Vote className="h-5 w-5 text-purple-600" />
              Governance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Create proposals, manage voting systems, and track governance decisions.
            </p>
            <Button className="w-full" variant="outline" asChild>
              <a href="/governance-tools">
                <span className="flex items-center justify-center">
                  View Proposals <ArrowRight className="ml-2 h-4 w-4" />
                </span>
              </a>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-5 w-5 text-green-600" />
              <div className="flex-1">
                <p className="text-sm font-medium">Riverfront Plaza assessment completed</p>
                <p className="text-xs text-muted-foreground">2 hours ago</p>
              </div>
              <Badge variant="secondary">Asset Readiness</Badge>
            </div>
            <div className="flex items-center gap-3">
              <AlertCircle className="h-5 w-5 text-orange-600" />
              <div className="flex-1">
                <p className="text-sm font-medium">New compliance requirement identified</p>
                <p className="text-xs text-muted-foreground">5 hours ago</p>
              </div>
              <Badge variant="outline">Compliance</Badge>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5 text-blue-600" />
              <div className="flex-1">
                <p className="text-sm font-medium">Community vote scheduled for tomorrow</p>
                <p className="text-xs text-muted-foreground">1 day ago</p>
              </div>
              <Badge variant="secondary">Governance</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
