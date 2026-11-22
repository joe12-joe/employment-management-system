import { Navigate, Route, Routes } from 'react-router-dom'
import { AppLayout } from '@/components/layout/AppLayout'
import { ProtectedRoute } from '@/components/auth/ProtectedRoute'
import { DashboardPage } from '@/features/dashboard/DashboardPage'
import { EmployeesPage } from '@/features/employees/EmployeesPage'
import { EmployeeDetailPage } from '@/features/employees/EmployeeDetailPage'
import { DepartmentsPage } from '@/features/org/DepartmentsPage'
import { OrgChartPage } from '@/features/org/OrgChartPage'
import { UsersRolesPage } from '@/features/users-roles/UsersRolesPage'
import { AuditLogPage } from '@/features/audit/AuditLogPage'
import { SettingsPage } from '@/features/settings/SettingsPage'
import { LoginPage } from '@/features/auth/LoginPage'
import { RegisterPage } from '@/features/auth/RegisterPage'
import { ApprovalsPage } from '@/features/approvals/ApprovalsPage'
import { ReportsPage } from '@/features/reports/ReportsPage'
import { LeavePage } from '@/features/leave/LeavePage'
import { PayrollPage } from '@/features/payroll/PayrollPage'
import { RecruitingPage } from '@/features/recruiting/RecruitingPage'
import { OnboardingPage } from '@/features/onboarding/OnboardingPage'
import { PerformancePage } from '@/features/performance/PerformancePage'
import { TasksPage } from '@/features/tasks/TasksPage'
import { CalendarPage } from '@/features/calendar/CalendarPage'
import { ImportExportPage } from '@/features/import-export/ImportExportPage'
import { ActivityFeedPage } from '@/features/activity/ActivityFeedPage'

export function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="activity" element={<ActivityFeedPage />} />
          <Route path="employees" element={<EmployeesPage />} />
          <Route path="employees/:id" element={<EmployeeDetailPage />} />
          <Route path="org/departments" element={<DepartmentsPage />} />
          <Route path="org/chart" element={<OrgChartPage />} />
          <Route path="approvals" element={<ApprovalsPage />} />
          <Route path="tasks" element={<TasksPage />} />
          <Route path="calendar" element={<CalendarPage />} />
          <Route path="leave" element={<LeavePage />} />
          <Route path="payroll" element={<PayrollPage />} />
          <Route path="recruiting" element={<RecruitingPage />} />
          <Route path="onboarding" element={<OnboardingPage />} />
          <Route path="performance" element={<PerformancePage />} />
          <Route path="reports" element={<ReportsPage />} />
          <Route path="admin/users-roles" element={<UsersRolesPage />} />
          <Route path="admin/audit" element={<AuditLogPage />} />
          <Route path="admin/import-export" element={<ImportExportPage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Route>
    </Routes>
  )
}
