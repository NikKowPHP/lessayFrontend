import { useRouteError, isRouteErrorResponse, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/Button'

export function ErrorBoundary() {
  const error = useRouteError()
  const navigate = useNavigate()

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      return (
        <div className="min-h-screen flex items-center justify-center px-4 bg-gray-50">
          <div className="text-center">
            <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Page Not Found
            </h2>
            <p className="text-gray-600 mb-8">
              Sorry, we couldn't find the page you're looking for.
            </p>
            <div className="space-x-4">
              <Button
                onClick={() => navigate(-1)}
                variant="secondary"
              >
                Go Back
              </Button>
              <Button
                onClick={() => navigate('/')}
                variant="primary"
              >
                Go Home
              </Button>
            </div>
          </div>
        </div>
      )
    }

    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-gray-50">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-red-500 mb-4">
            {error.status}
          </h1>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            {error.statusText}
          </h2>
          <p className="text-gray-600 mb-8">
            {error.data?.message || 'Something went wrong'}
          </p>
          <div className="space-x-4">
            <Button
              onClick={() => navigate(-1)}
              variant="secondary"
            >
              Go Back
            </Button>
            <Button
              onClick={() => navigate('/')}
              variant="primary"
            >
              Go Home
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gray-50">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-red-500 mb-4">Oops!</h1>
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          Something went wrong
        </h2>
        <p className="text-gray-600 mb-8">
          {error instanceof Error ? error.message : 'An unexpected error occurred'}
        </p>
        <div className="space-x-4">
          <Button
            onClick={() => navigate(-1)}
            variant="secondary"
          >
            Go Back
          </Button>
          <Button
            onClick={() => navigate('/')}
            variant="primary"
          >
            Go Home
          </Button>
        </div>
      </div>
    </div>
  )
}
