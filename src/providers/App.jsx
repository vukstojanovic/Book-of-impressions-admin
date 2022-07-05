import { ErrorBoundary } from 'react-error-boundary'
import { HelmetProvider } from 'react-helmet-async'
import { BrowserRouter as Router } from 'react-router-dom'

const ErrorFallback = () => {
  return 'Ooops, something went wrong :('
}

const AppProvider = ({ children }) => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <HelmetProvider>
        <Router>{children}</Router>
      </HelmetProvider>
    </ErrorBoundary>
  )
}

export default AppProvider
