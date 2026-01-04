import {createBrowserRouter} from 'react-router-dom'
import App from './Pages/App'
import LoginPage from './Pages/LoginPage'


const appRouter = createBrowserRouter(
  [
    {
      path: "/",
      element: <App/>
    },
    {
      path: "/login",
      element: <LoginPage/>
    }

  ]
)

export default appRouter