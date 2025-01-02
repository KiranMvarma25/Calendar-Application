import { createRoot } from 'react-dom/client'                         // To render the React application
import './index.css'                                                  // Importing CSS file for styling
import App from './App.jsx'
import { createBrowserRouter, RouterProvider} from "react-router-dom" // For setting up routing in the application

import { Provider } from "react-redux";                               // To integrate Redux store with the React app
import appStore from "./redux/store.js";                              // Importing the Redux store

import { lazy, Suspense } from 'react';                               // For lazy loading components 
import NotFound from './NotFound.jsx';                                // Component to show when a route is not found

import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Company = lazy(() => import('./admin/Company.jsx'));            // Lazy load components to optimize performance by splitting the code
const User = lazy(() => import('./user/User.jsx'));
const CalendarView = lazy(() => import('./user/Calender.jsx'));
const Analytics = lazy(() => import('./analytics/Analytics.jsx'));
const Dashboard = lazy(() => import('./user/Dashboard.jsx'));

const appRouter = createBrowserRouter([
  {
    path : "/",                                     // Root path
    element : <App />,
    errorElement : <NotFound />
  },
  {
    path : "/admin",
    element : <Suspense fallback={<div>Loading Admin Panel...</div>}><Company /></Suspense>,  // Lazy load Company component with fallback loading text
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
  <Provider store={appStore}>                                       {/* Wrapping the application with the Redux provider */}
    <RouterProvider router={appRouter}></RouterProvider>            {/* Setting up routing using the RouterProvider */}
    <ToastContainer />
  </Provider>
)