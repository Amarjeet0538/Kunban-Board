import {createBrowserRouter} from 'react-router-dom'
import App from './Pages/App'
import LoginPage from './Pages/LoginPage'
import Dashboard from './Pages/Dashboard'


const appRouter = createBrowserRouter(
  [
    {
      path: "/",
      element: <App/>
    },
    {
      path: "/login",
      element: <LoginPage/>
    },
    {
      path:"/profile",
      element: <Dashboard/>
    }

  ]
)

export default appRouter