import React from 'react'

const Weather = React.lazy(() => import('./features/auth/WeatherList'))
const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const UploadExcel = React.lazy(() => import('./components/synergycomponent/UploadExcel'))

const routes = [
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/Weather', name: 'Weather' , element:Weather },
  { path: '/Upload', name: 'UploadExcel' , element:UploadExcel },


]

export default routes
