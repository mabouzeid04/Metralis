import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts'
import { 
  Activity, 
  AlertCircle, 
  CheckCircle2, 
  Clock,
  Loader2
} from 'lucide-react'
import { api } from '@/lib/api'

interface DashboardStats {
  openWorkOrders: number
  machinesDown: number
  completedToday: number
}

interface MachineStatusChartData {
  name: string
  value: number
  color: string
}

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [machineStatusData, setMachineStatusData] = useState<MachineStatusChartData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetch dashboard stats
        const statsResponse = await api.get('/dashboard/stats')
        setStats(statsResponse.data.data)

        // Fetch machine status counts
        try {
          const machinesResponse = await api.get('/machines')
          const machines = machinesResponse.data.data || []
          
          // Count machines by status
          const statusCounts: Record<string, number> = {}
          machines.forEach((machine: { status: string }) => {
            const status = machine.status || 'UNKNOWN'
            statusCounts[status] = (statusCounts[status] || 0) + 1
          })
          
          // Convert to chart data format
          const statusColors: Record<string, string> = {
            'RUNNING': '#10B981',
            'MAINTENANCE': '#F59E0B',
            'DOWN': '#EF4444',
            'RETIRED': '#94A3B8',
          }
          
          const chartData = Object.entries(statusCounts).map(([status, count]) => ({
            name: status.charAt(0) + status.slice(1).toLowerCase(),
            value: count,
            color: statusColors[status] || '#94A3B8'
          }))
          
          setMachineStatusData(chartData)
        } catch {
          // Ignore machine fetch errors, keep empty chart
        }
      } catch (error) {
        console.error('Failed to fetch dashboard stats:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

  const statsCards = [
    {
      title: "Active Work Orders",
      value: stats?.openWorkOrders ?? 0,
      change: "Open tasks",
      icon: Clock,
      color: "text-blue-500"
    },
    {
      title: "Machines Down",
      value: stats?.machinesDown ?? 0,
      change: stats?.machinesDown ? "Critical Alert" : "All operational",
      icon: AlertCircle,
      color: "text-red-500"
    },
    {
      title: "Completed Today",
      value: stats?.completedToday ?? 0,
      change: "Closed work orders",
      icon: CheckCircle2,
      color: "text-green-500"
    },
    {
      title: "System Status",
      value: loading ? "..." : "Online",
      change: "All systems operational",
      icon: Activity,
      color: "text-orange-500"
    }
  ]

  // Placeholder chart data (real weekly data would require additional API endpoint)
  const workOrderData = [
    { name: 'Mon', completed: 0, created: 0 },
    { name: 'Tue', completed: 0, created: 0 },
    { name: 'Wed', completed: 0, created: 0 },
    { name: 'Thu', completed: 0, created: 0 },
    { name: 'Fri', completed: 0, created: 0 },
    { name: 'Sat', completed: 0, created: 0 },
    { name: 'Sun', completed: 0, created: 0 },
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statsCards.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat.change}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Main Chart */}
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Weekly Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={workOrderData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis 
                    dataKey="name" 
                    stroke="#888888" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false} 
                  />
                  <YAxis 
                    stroke="#888888" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false} 
                    tickFormatter={(value) => `${value}`} 
                  />
                  <Tooltip 
                    cursor={{ fill: 'transparent' }}
                    contentStyle={{ borderRadius: '8px' }}
                  />
                  <Bar dataKey="created" name="Created" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="completed" name="Completed" fill="hsl(var(--accent))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Machine Status Chart */}
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Machine Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[350px]">
              {machineStatusData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={machineStatusData} layout="vertical" margin={{ left: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                    <XAxis type="number" hide />
                    <YAxis 
                      dataKey="name" 
                      type="category" 
                      stroke="#888888" 
                      fontSize={12} 
                      tickLine={false} 
                      axisLine={false}
                      width={100}
                    />
                    <Tooltip cursor={{ fill: 'transparent' }} />
                    <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={30}>
                      {machineStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  No machines registered yet
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
