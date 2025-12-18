import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
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
import { useDashboardStats, useMachines, getMachineStatusChartData } from '@/lib/hooks/useDashboard'

export default function Dashboard() {
  const { t } = useTranslation(['dashboard', 'common'])

  // React Query - data cached, instant on back navigation
  const { data: stats, isLoading: statsLoading } = useDashboardStats()
  const { data: machines, isLoading: machinesLoading } = useMachines()

  const loading = statsLoading || machinesLoading

  // Transform machines to chart data
  const machineStatusData = useMemo(() => {
    if (!machines) return []
    return getMachineStatusChartData(machines, t)
  }, [machines, t])

  const statsCards = [
    {
      title: t('stats.activeWorkOrders'),
      value: stats?.openWorkOrders ?? 0,
      change: t('stats.activeSubtitle'),
      icon: Clock,
      color: "text-blue-500"
    },
    {
      title: t('stats.machinesDown'),
      value: stats?.machinesDown ?? 0,
      change: stats?.machinesDown ? t('stats.machinesDownAlert') : t('stats.machinesDownOk'),
      icon: AlertCircle,
      color: "text-red-500"
    },
    {
      title: t('stats.completedToday'),
      value: stats?.completedToday ?? 0,
      change: t('stats.completedSubtitle'),
      icon: CheckCircle2,
      color: "text-green-500"
    },
    {
      title: t('stats.systemStatus'),
      value: loading ? "..." : t('stats.online'),
      change: t('stats.allOperational'),
      icon: Activity,
      color: "text-orange-500"
    }
  ]

  // Placeholder chart data (real weekly data would require additional API endpoint)
  const workOrderData = [
    { name: t('charts.weekdays.mon'), completed: 0, created: 0 },
    { name: t('charts.weekdays.tue'), completed: 0, created: 0 },
    { name: t('charts.weekdays.wed'), completed: 0, created: 0 },
    { name: t('charts.weekdays.thu'), completed: 0, created: 0 },
    { name: t('charts.weekdays.fri'), completed: 0, created: 0 },
    { name: t('charts.weekdays.sat'), completed: 0, created: 0 },
    { name: t('charts.weekdays.sun'), completed: 0, created: 0 },
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
        <h2 className="text-3xl font-bold tracking-tight">{t('title')}</h2>
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
            <CardTitle>{t('charts.weeklyOverview')}</CardTitle>
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
                  <Bar dataKey="created" name={t('charts.created')} fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="completed" name={t('charts.completed')} fill="hsl(var(--accent))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Machine Status Chart */}
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>{t('charts.machineStatus')}</CardTitle>
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
                  {t('charts.noMachines')}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
