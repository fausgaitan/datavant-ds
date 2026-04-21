import React from 'react'
import ReactDOM from 'react-dom/client'
import { MantineProvider } from '@mantine/core'
import '@mantine/core/styles.css'
import '@mantine/charts/styles.css'
import DataConnectivityDashboard from '../DataConnectivityDashboard.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <MantineProvider>
    <DataConnectivityDashboard />
  </MantineProvider>
)
