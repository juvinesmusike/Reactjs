import React from 'react'

const Weather = React.lazy(() => import('./features/auth/WeatherList'))
const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const UploadExcel = React.lazy(() => import('./components/synergycomponent/UploadExcel'))
const ReportSoa = React.lazy(() => import('./components/synergycomponent/ReportSoa'))
const SetupAccount = React.lazy(() => import('./components/synergycomponent/SetupAccount'))
const AnnnexSetup = React.lazy(() => import('./components/synergycomponent/AnnnexSetup'))
const JournalReport = React.lazy(() => import('./components/synergycomponent/JournalReport'))
const routes = [
  // { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/Weather', name: 'Weather', element: Weather },
  { path: '/upload', name: 'UploadExcel', element: UploadExcel },
  { path: '/reports/soa', name: 'Statement of Account', element: ReportSoa },
  { path: '/reports/journals', name: 'Journals', element: JournalReport },
  { path: '/maintenance/setupaccount', name: 'Account Set-up', element: SetupAccount },
  { path: '/maintenance/annexsetup', name: 'Annex Set-up', element: AnnnexSetup },
]

export default routes
