import { ErrorBoundary } from 'react-error-boundary'
import { HelmetProvider } from 'react-helmet-async'
import { BrowserRouter as Router } from 'react-router-dom'
import { I18nextProvider } from 'react-i18next'
import { QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

import { queryClient } from '@/lib/react-query'
import i18next from '@/lib/i18n'
import { AuthProvider } from '@/providers/authProvider'

const ErrorFallback = () => {
  return 'Ooops, something went wrong :('
}

export const AppProvider = ({ children }) => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <HelmetProvider>
        <Router>
          <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools />
            <AuthProvider>
              <I18nextProvider i18n={i18next}>{children}</I18nextProvider>
            </AuthProvider>
          </QueryClientProvider>
        </Router>
      </HelmetProvider>
    </ErrorBoundary>
  )
}
