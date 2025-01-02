import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider} from "react-router-dom"
// import Company from './admin/Company.jsx'
// import User from './user/User.jsx'

import { Provider } from "react-redux";
import appStore from "./redux/store.js";
// import CalendarView from './user/Calender.jsx'
// import Analytics from './analytics/Analytics.jsx'
// import Dashboard from './user/Dashboard.jsx'

import { lazy, Suspense } from 'react';
import NotFound from './NotFound.jsx';

import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Company = lazy(() => import('./admin/Company.jsx'));
const User = lazy(() => import('./user/User.jsx'));
const CalendarView = lazy(() => import('./user/Calender.jsx'));
const Analytics = lazy(() => import('./analytics/Analytics.jsx'));
const Dashboard = lazy(() => import('./user/Dashboard.jsx'));

const appRouter = createBrowserRouter([
  {
    path : "/",
    element : <App />,
    errorElement : <NotFound />
  },
  {
    path : "/admin",
    element : <Suspense fallback={<div>Loading Admin Panel...</div>}><Company /></Suspense>,
    errorElement : <NotFound />
  },
  {
    path : "/user",
    element : <Suspense fallback={<div>Loading User Area...</div>}><User /></Suspense>,
    children : [
      {
        index : true,
        element : <Suspense fallback={<div>Loading Dashboard...</div>}><Dashboard /></Suspense>
      },
      {
        path : "calender",
        element : <Suspense fallback={<div>Loading Calendar...</div>}><CalendarView /></Suspense>
      },
      {
        path : "analytics",
        element : <Suspense fallback={<div>Loading Analytics...</div>}><Analytics /></Suspense>
      },
      {
        path: "*",
        element: <NotFound />, // Catches all the routes for unmatched nested paths under /user
      },
    ],
    errorElement : <NotFound /> 
  },
])

createRoot(document.getElementById('root')).render(
  <Provider store={appStore}>
    <RouterProvider router={appRouter}></RouterProvider>
    <ToastContainer />
  </Provider>
)