import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Communication } from "@/components/modules/community/Communication"
import { Stakeholders } from "@/components/modules/community/Stakeholders"
import { Events } from "@/components/modules/community/Events"
import { Analytics } from "@/components/modules/community/Analytics"
import { Dashboard } from "@/components/modules/community/Dashboard"

export function CommunityManagement() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight">Community Management</h1>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            Harmony Residences
          </div>
        </div>
      </div>
      <Tabs defaultValue="dashboard" className="w-full">
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-5">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="stakeholders">Stakeholders</TabsTrigger>
          <TabsTrigger value="communication">Communication</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>
        <TabsContent value="dashboard">
          <Dashboard />
        </TabsContent>
        <TabsContent value="stakeholders">
          <Stakeholders />
        </TabsContent>
        <TabsContent value="communication">
          <Communication />
        </TabsContent>
        <TabsContent value="events">
          <Events />
        </TabsContent>
        <TabsContent value="analytics">
          <Analytics />
        </TabsContent>
      </Tabs>
    </div>
  )
}
