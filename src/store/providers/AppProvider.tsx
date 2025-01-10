import { FC, ReactNode } from 'react'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import { store } from '@/store'
import { router } from '@/router'

const AppProvider: FC = () => {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  )
}

export default AppProvider