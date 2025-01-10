import { FC, ReactNode } from 'react'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import { store } from '@/store'
import { router } from '@/router'
import { ErrorProvider } from '@/lib/providers/ErrorProvider'

const AppProvider: FC = () => {
  return (
    <ErrorProvider>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </ErrorProvider>
  )
}

export default AppProvider
