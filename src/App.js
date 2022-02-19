import React, { lazy, useState } from 'react'
import { BrowserRouter as Router, Navigate, useRoutes } from 'react-router-dom'
// import Products from './Products/Products'
// import Admin from './Admin/Admin'
// import ProtectedRoute from './Common/ProtectedRoute'
import { css } from '@emotion/css'
import Loadable from './Common/Loadable'
import Nav from './Common/Nav'
import ScrollToTop from './Common/ScrollToTop'

const Products = Loadable(lazy(() => import('./Products/Products')))
const Admin = Loadable(lazy(() => import('./Admin/Admin')))

const AppStyles = css`
  margin: 50px auto;
  width: 380px;
  .Container {
    background: #1d1e26;
    border: 4px solid #9580ff;
    border-radius: 6px;
    padding: 25px;
  }
`

const App = () => {
  const [authenticated] = useState(true)

  const routes = useRoutes([
    {
      path: '/*',
      element: <Products />,
    },
    {
      path: '/admin',
      element: authenticated ? <Admin /> : <Navigate to="/" />,
    },
    {
      path: '*',
      element: <Navigate to="/" />,
    },
  ])

  return routes
  // <Routes>
  //           <Route path="/*" element={<Products />} />

  //           <ProtectedRoute
  //             path="/admin*"
  //             element={<Admin />}
  //             authenticated={authenticated}
  //             redirectTo="/"
  //           />
  //           <Route path="*" element={<Navigate to="/" />} />
  //           {/*     ^ put at bottom (* = everything else) ^ Navigate = redirect to different url */}
  //         </Routes>
}

const AppWrapper = () => (
  <div className={AppStyles}>
    <Router>
      <ScrollToTop />
      <div className="Container">
        <Nav />
        <App />
      </div>
    </Router>
  </div>
)

export default AppWrapper
