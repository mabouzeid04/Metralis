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
  Clock 
} from 'lucide-react'

// Mock Data
const stats = [
  {
    title: "Active Work Orders",
    value: "12",
    change: "+2 from yesterday",
    icon: Clock,
    color: "text-blue-500"
  },
  {
    title: "Machines Down",
    value: "1",
    change: "Critical Alert",
    icon: AlertCircle,
    color: "text-red-500"
  },
  {
    title: "Completed Today",
    value: "4",
    change: "On track",
    icon: CheckCircle2,
    color: "text-green-500"
  },
  {
    title: "Avg Response Time",
    value: "2.4h",
    change: "-30m improvement",
    icon: Activity,
    color: "text-orange-500"
  }
]

const workOrderData = [
  { name: 'Mon', completed: 4, created: 6 },
  { name: 'Tue', completed: 3, created: 5 },
  { name: 'Wed', completed: 7, created: 4 },
  { name: 'Thu', completed: 5, created: 8 },
  { name: 'Fri', completed: 6, created: 5 },
  { name: 'Sat', completed: 2, created: 2 },
  { name: 'Sun', completed: 1, created: 1 },
]

const machineStatusData = [
  { name: 'Running', value: 45, color: '#10B981' }, // Emerald-500
  { name: 'Maintenance', value: 3, color: '#F59E0B' }, // Amber-500
  { name: 'Down', value: 2, color: '#EF4444' }, // Red-500
  { name: 'Retired', value: 1, color: '#94A3B8' }, // Slate-400
]

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
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
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
