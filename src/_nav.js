import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilAudioSpectrum,
  cilBell,
  cilCalculator,
  cilChartPie,
  cilCloud,
  cilCloudUpload,
  cilCursor,
  cilDescription,
  cilDrop,
  cilLibrary,
  cilList,
  cilNotes,
  cilPencil,
  cilPuzzle,
  cilReportSlash,
  cilSettings,
  cilSpeedometer,
  cilStar,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'
import { DocsLink } from './components'

const _nav = [
  {
    component: CNavItem,
    name: 'Upload',
    to: '/upload',
    icon: <CIcon icon={cilCloudUpload} customClassName="nav-icon" />,
  },
  {
    component: CNavGroup,
    name: 'Reports',
    to: '/reports',
    icon: <CIcon icon={cilLibrary} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Statement of Account',
        to: '/reports/soa',
      },
      {
        component: CNavItem,
        name: 'Journals',
        to: '/reports/journals',
      },
      // ,
      // {
      //   component: CNavItem,
      //   name: 'Annex',
      //   to: '/reports/button-groups',
      // },
    ],
  },
  {
    component: CNavGroup,
    name: 'Maintenance',
    to: '/maintenance',
    icon: <CIcon icon={cilSettings} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Account Set-up',
        to: '/maintenance/setupaccount',
      },
      {
        component: CNavItem,
        name: 'Annex Set-up',
        to: '/maintenance/annexsetup',
      },
    ],
  },
  // {
  //   component: CNavItem,
  //   name: 'Weather',
  //   to: '/Weather',
  //   icon: <CIcon icon={cilList} customClassName="nav-icon" />,
  // },
]

export default _nav
