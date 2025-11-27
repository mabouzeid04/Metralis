import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AppLayout from '@/components/layout/AppLayout'
import Dashboard from '@/pages/Dashboard'
import Login from '@/pages/Login'
import Signup from '@/pages/Signup'
import AwaitingApproval from '@/pages/AwaitingApproval'
import AccessManagement from '@/pages/access/AccessManagement'
import MachinesList from '@/pages/machines/MachinesList'
import MachineDetail from '@/pages/machines/MachineDetail'
import WorkOrdersList from '@/pages/work-orders/WorkOrdersList'
import CreateWorkOrder from '@/pages/work-orders/CreateWorkOrder'
import WorkOrderDetail from '@/pages/work-orders/WorkOrderDetail'
import PartsList from '@/pages/parts/PartsList'
import PartDetail from '@/pages/parts/PartDetail'
import DocumentsList from '@/pages/documents/DocumentsList'
import UserManagement from '@/pages/users/UserManagement'
import Settings from '@/pages/Settings'
import NotFound from '@/pages/NotFound'
import { ProtectedRoute, AdminRoute } from '@/components/auth/ProtectedRoute'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/awaiting-approval" element={<AwaitingApproval />} />
        
        {/* Protected Routes */}
        <Route element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/machines" element={<MachinesList />} />
          <Route path="/machines/:id" element={<MachineDetail />} />
          <Route path="/work-orders" element={<WorkOrdersList />} />
          <Route path="/work-orders/new" element={<CreateWorkOrder />} />
          <Route path="/work-orders/:id" element={<WorkOrderDetail />} />
          <Route path="/parts" element={<PartsList />} />
          <Route path="/parts/:id" element={<PartDetail />} />
          <Route path="/documents" element={<DocumentsList />} />
          <Route
            path="/users"
            element={
              <AdminRoute>
                <UserManagement />
              </AdminRoute>
            }
          />
          <Route
            path="/access"
            element={
              <AdminRoute>
                <AccessManagement />
              </AdminRoute>
            }
          />
          <Route path="/settings" element={<Settings />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}

export default App
