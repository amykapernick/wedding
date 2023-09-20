import './styles/app.postcss'
import { ClerkProvider } from "@clerk/clerk-react";
import {Route, Routes} from 'react-router-dom'
import Home from './pages'


if(!import.meta.env.VITE_CLERK_PUBLISHABLE_KEY) {
  throw new Error('Clerk publishable key not set')
}

const routes = [
  {
    path: '/',
    PageComponent: Home
  }
]

const App = () => {
  return (
    <main>
      <ClerkProvider publishableKey={import.meta.env.VITE_CLERK_PUBLISHABLE_KEY}>
      <header>
        <h1>Dan and Amy are getting married!</h1>
      </header>
      <Routes>
        {routes.map(({ path, PageComponent }) => (
          <Route key={path} path={path} element={<PageComponent />} />
        ))}
      </Routes>
      </ClerkProvider>
    </main>
  )
}

export default App
