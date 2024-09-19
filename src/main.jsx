import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import LineChart from './charts/LineChart/LineChart.jsx'
import Bar_Chart from './charts/BarChart/BarChart.jsx'
// import TecnoCamon30 from './modelMapping/tecnoCamon30/TecnoCamon30.jsx'
import { BrowserRouter as Router, createBrowserRouter, RouterProvider } from 'react-router-dom';
import HorizontalBarChart from './charts/HorizonatlBarChart/HorizontalBarChart.jsx'
import Home from './pages/Home/Home.jsx'
import App from './App.jsx'
import FileUpload from './pages/FileUpload/FileUpload.jsx'

const routes = [
  {
    path:'/',
    element: <App />,
    children: [
      {
        path:'/',
        element: <Home />
      },
      {
        path:'/fileupload',
        element: <FileUpload />
      }
    ]
  }
]


const router = createBrowserRouter(routes)

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <RouterProvider router={router} />
  </StrictMode>,
)