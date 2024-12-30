import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider} from "react-router-dom"
import Company from './admin/Company.jsx'
import User from './user/User.jsx'

import { Provider } from "react-redux";
import appStore from "./redux/store.js";
import CalendarView from './user/Calender.jsx'
import Analytics from './analytics/Analytics.jsx'
import Dashboard from './user/Dashboard.jsx'

const appRouter = createBrowserRouter([
  {
    path : "/",
    element : <App />
  },
  {
    path : "/admin",
    element : <Company />
  },
  {
    path : "/user",
    element : <User />,
    children : [
      {
        index : true,
        element : <Dashboard />
      },
      {
        path : "calender",
        element : <CalendarView />
      },
      {
        path : "analytics",
        element : <Analytics />
      },
    ]
  },
])

createRoot(document.getElementById('root')).render(
  <Provider store={appStore}>
    <RouterProvider router={appRouter}></RouterProvider>
  </Provider>
)